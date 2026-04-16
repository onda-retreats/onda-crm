/**
 * Instagram Webhook Handler — backend stub
 *
 * This file defines the types and parsing logic for Instagram webhook events.
 * The actual HTTP endpoint must live in your backend server (Node.js/Express, etc.)
 * because:
 *   1. Meta requires a public HTTPS URL for webhooks (not localhost)
 *   2. Webhook verification uses a secret token stored in backend env
 *   3. Access tokens must never be exposed to the browser
 *
 * ─── WEBHOOK FLOW ────────────────────────────────────────────────────────────
 *
 *   User sends Instagram DM
 *         │
 *         ▼
 *   Meta sends POST to https://yourserver.com/api/instagram/webhook
 *         │
 *         ▼
 *   Your backend:
 *     1. Verifies X-Hub-Signature-256 header against INSTAGRAM_APP_SECRET
 *     2. Parses the event (see parseWebhookEvent below)
 *     3. Finds or creates the Contact + Conversation in the DB
 *     4. Stores the Message in the DB
 *     5. Emits a real-time event to the frontend (WebSocket or SSE)
 *         │
 *         ▼
 *   CRM frontend receives new message and appends it to the thread
 *
 * ─── OUTBOUND MESSAGE GAP ────────────────────────────────────────────────────
 *
 *   If your team replies directly from the Instagram mobile/web app:
 *   Meta does NOT send a webhook for outbound messages sent natively.
 *   Those messages will NOT sync into the CRM.
 *   This is a hard limitation of the Meta Messaging API — not configurable.
 *
 *   Workaround options:
 *   a) Always reply from CRM (recommended, full tracking)
 *   b) Accept the gap — CRM shows inbound + API-sent messages only
 *   c) Manually add "note" type messages in CRM to record IG-app replies
 *
 * ─── SETUP CHECKLIST ─────────────────────────────────────────────────────────
 *   [ ] Create Meta App → developers.facebook.com
 *   [ ] Enable Instagram Graph API product
 *   [ ] Request permission: instagram_manage_messages
 *   [ ] Set webhook callback URL (must be public HTTPS)
 *   [ ] Configure INSTAGRAM_WEBHOOK_VERIFY_TOKEN in backend .env
 *   [ ] Configure INSTAGRAM_APP_SECRET in backend .env
 *   [ ] Configure INSTAGRAM_PAGE_ACCESS_TOKEN in backend .env
 *   [ ] Subscribe to webhook fields: messages, message_deliveries, message_reads
 */

import type {
  InstagramWebhookEvent,
  IncomingMessageEvent,
  DeliveryEvent,
  ReadEvent,
} from './types';

// ─── Parsed Event Types ────────────────────────────────────────────────────────

export interface WebhookTextMessage {
  type: 'text';
  messageId: string;
  senderId: string;      // Instagram PSID
  pageId: string;        // Your page ID
  text: string;
  timestamp: Date;
}

export interface WebhookDeliveryReceipt {
  type: 'delivery';
  messageIds: string[];
  senderId: string;
  pageId: string;
  timestamp: Date;
}

export interface WebhookReadReceipt {
  type: 'read';
  senderId: string;
  pageId: string;
  watermark: Date;
}

export interface WebhookUnknownEvent {
  type: 'unknown';
  raw: unknown;
}

export type ParsedWebhookEvent =
  | WebhookTextMessage
  | WebhookDeliveryReceipt
  | WebhookReadReceipt
  | WebhookUnknownEvent;

// ─── Parser ────────────────────────────────────────────────────────────────────

/**
 * Parse a raw Meta webhook POST body into a structured event.
 *
 * Usage in your Express backend:
 * ```ts
 * app.post('/api/instagram/webhook', (req, res) => {
 *   // 1. Verify signature first (see verifyWebhookSignature below)
 *   const event = parseWebhookEvent(req.body);
 *   if (event?.type === 'text') {
 *     // store message, emit to frontend via WebSocket/SSE
 *   }
 *   res.sendStatus(200); // always ACK quickly
 * });
 * ```
 */
export function parseWebhookEvent(body: unknown): ParsedWebhookEvent | null {
  if (!body || typeof body !== 'object') return null;

  const payload = body as InstagramWebhookEvent;

  if (payload.object !== 'instagram') return null;
  if (!Array.isArray(payload.entry) || payload.entry.length === 0) return null;

  const entry = payload.entry[0]!;
  const pageId = entry.id;

  if (!Array.isArray(entry.messaging) || entry.messaging.length === 0) return null;

  const event = entry.messaging[0]!;

  // Incoming text message
  if ('message' in event) {
    const msgEvent = event as IncomingMessageEvent;
    if (msgEvent.message.text) {
      return {
        type: 'text',
        messageId: msgEvent.message.mid,
        senderId: msgEvent.sender.id,
        pageId,
        text: msgEvent.message.text,
        timestamp: new Date(msgEvent.timestamp),
      };
    }
  }

  // Delivery receipt
  if ('delivery' in event) {
    const deliveryEvent = event as DeliveryEvent;
    return {
      type: 'delivery',
      messageIds: deliveryEvent.delivery.mids,
      senderId: deliveryEvent.sender.id,
      pageId,
      timestamp: new Date(deliveryEvent.timestamp),
    };
  }

  // Read receipt
  if ('read' in event) {
    const readEvent = event as ReadEvent;
    return {
      type: 'read',
      senderId: readEvent.sender.id,
      pageId,
      watermark: new Date(readEvent.read.watermark),
    };
  }

  return { type: 'unknown', raw: body };
}

// ─── Signature Verification (backend only) ────────────────────────────────────

/**
 * Verify the X-Hub-Signature-256 header sent by Meta.
 *
 * This MUST run on the backend where INSTAGRAM_APP_SECRET is available.
 * Never implement this on the frontend.
 *
 * Node.js example:
 * ```ts
 * import crypto from 'crypto';
 *
 * function verifyWebhookSignature(rawBody: Buffer, signature: string): boolean {
 *   const expected = 'sha256=' + crypto
 *     .createHmac('sha256', process.env.INSTAGRAM_APP_SECRET!)
 *     .update(rawBody)
 *     .digest('hex');
 *   return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
 * }
 * ```
 *
 * See: https://developers.facebook.com/docs/messenger-platform/webhooks#validate-payloads
 */
export declare function verifyWebhookSignature(rawBody: Buffer, signature: string): boolean;

// ─── Webhook Verification Handshake (backend only) ────────────────────────────

/**
 * Handle the GET request Meta sends to verify your webhook endpoint.
 *
 * Express example:
 * ```ts
 * app.get('/api/instagram/webhook', (req, res) => {
 *   const mode = req.query['hub.mode'];
 *   const token = req.query['hub.verify_token'];
 *   const challenge = req.query['hub.challenge'];
 *
 *   if (mode === 'subscribe' && token === process.env.INSTAGRAM_WEBHOOK_VERIFY_TOKEN) {
 *     res.status(200).send(challenge);
 *   } else {
 *     res.sendStatus(403);
 *   }
 * });
 * ```
 */
export const WEBHOOK_SETUP_NOTES = {
  verifyTokenEnvKey: 'INSTAGRAM_WEBHOOK_VERIFY_TOKEN',
  appSecretEnvKey: 'INSTAGRAM_APP_SECRET',
  pageAccessTokenEnvKey: 'INSTAGRAM_PAGE_ACCESS_TOKEN',
  requiredSubscriptions: ['messages', 'message_deliveries', 'message_reads', 'messaging_postbacks'],
} as const;
