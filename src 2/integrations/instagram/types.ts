/**
 * Instagram Messaging API — official Meta types
 *
 * Reference: https://developers.facebook.com/docs/messenger-platform/
 * Instagram Messaging uses the same Messenger Platform API v19+.
 *
 * IMPORTANT LIMITATIONS:
 * - Incoming messages: delivered via webhook (real-time, no polling needed)
 * - Outgoing messages sent FROM this API: tracked here ✅
 * - Outgoing messages sent DIRECTLY from Instagram app: NOT available via API ❌
 *   Meta does not expose natively-sent DMs through any webhook or pull endpoint.
 *   This means if your team replies from Instagram instead of the CRM, those
 *   messages will NOT appear in the CRM conversation thread.
 *   Mitigation: always reply from CRM, or accept the gap.
 */

// ─── Webhook Events ────────────────────────────────────────────────────────────

export interface InstagramWebhookEvent {
  object: 'instagram';
  entry: WebhookEntry[];
}

export interface WebhookEntry {
  id: string;           // Page ID
  time: number;         // Unix timestamp
  messaging: MessagingEvent[];
}

export type MessagingEvent =
  | IncomingMessageEvent
  | DeliveryEvent
  | ReadEvent
  | PostbackEvent;

export interface IncomingMessageEvent {
  sender: { id: string };     // PSID of the sender
  recipient: { id: string };  // Page ID
  timestamp: number;
  message: IncomingMessage;
}

export interface IncomingMessage {
  mid: string;           // Message ID
  text?: string;         // Text content (absent for media-only messages)
  attachments?: MessageAttachment[];
  reply_to?: { mid: string };
}

export interface MessageAttachment {
  type: 'image' | 'video' | 'audio' | 'file' | 'location' | 'fallback';
  payload: {
    url?: string;
    title?: string;
    sticker_id?: number;
  };
}

export interface DeliveryEvent {
  sender: { id: string };
  recipient: { id: string };
  timestamp: number;
  delivery: {
    mids: string[];
    watermark: number;
  };
}

export interface ReadEvent {
  sender: { id: string };
  recipient: { id: string };
  timestamp: number;
  read: {
    watermark: number;
  };
}

export interface PostbackEvent {
  sender: { id: string };
  recipient: { id: string };
  timestamp: number;
  postback: {
    payload: string;
    title: string;
  };
}

// ─── Send API ─────────────────────────────────────────────────────────────────

export interface SendMessageRequest {
  recipient: {
    id: string; // Instagram PSID (page-scoped user ID)
  };
  message: {
    text: string;
  };
  messaging_type?: 'RESPONSE' | 'UPDATE' | 'MESSAGE_TAG';
  // Only needed for MESSAGE_TAG
  tag?: string;
}

export interface SendMessageResponse {
  message_id: string;
  recipient_id: string;
}

// ─── Graph API — User Profile ─────────────────────────────────────────────────

export interface InstagramUserProfile {
  id: string;
  name: string;
  profile_pic?: string;
  // Additional fields available with instagram_manage_messages permission
  follower_count?: number;
  is_verified_user?: boolean;
}

// ─── Error Response ───────────────────────────────────────────────────────────

export interface MetaApiError {
  error: {
    message: string;
    type: string;
    code: number;
    fbtrace_id: string;
  };
}
