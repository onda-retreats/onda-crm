/**
 * Instagram API client — frontend side
 *
 * This module calls YOUR backend server, which in turn calls Meta.
 * Direct Instagram API calls from the browser are NOT possible —
 * Meta requires server-side auth tokens and webhook verification.
 *
 * Required backend endpoints (to implement in your server):
 *   POST /api/instagram/send      — proxy to Meta Send API
 *   POST /api/instagram/webhook   — Meta webhook receiver (public URL needed)
 *   GET  /api/instagram/status    — check connection status
 *
 * Meta webhook setup:
 *   1. Create a Meta App at developers.facebook.com
 *   2. Add "Instagram" product, enable "instagram_manage_messages" permission
 *   3. Set webhook URL to https://yourserver.com/api/instagram/webhook
 *   4. Verify token: set INSTAGRAM_WEBHOOK_VERIFY_TOKEN in your backend env
 *   5. Subscribe to: messages, messaging_postbacks, message_deliveries, message_reads
 */

import type { SendMessageResponse } from './types';

export const INSTAGRAM_API_BASE = '/api/instagram'; // your backend proxy

/**
 * Send a message to an Instagram user via your backend.
 *
 * In production, your backend receives this, attaches the Page Access Token
 * (from env), and proxies to: POST https://graph.facebook.com/v19.0/me/messages
 */
export async function sendInstagramMessage(params: {
  recipientId: string;    // Instagram PSID (page-scoped user ID)
  text: string;
  pageAccessToken?: string; // handled by backend — do NOT pass from frontend in production
}): Promise<{ messageId: string } | { error: string }> {
  // ── Production path ──────────────────────────────────────────────────────
  // const res = await fetch(`${INSTAGRAM_API_BASE}/send`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ recipientId: params.recipientId, text: params.text }),
  // });
  // if (!res.ok) {
  //   const err = await res.json();
  //   return { error: err.message ?? 'Send failed' };
  // }
  // const data: SendMessageResponse = await res.json();
  // return { messageId: data.message_id };

  // ── Mock path (no backend yet) ───────────────────────────────────────────
  console.warn(
    '[Instagram API] Backend required for real sends. Backend endpoint: POST /api/instagram/send. Simulating success.'
  );
  const mockResponse: SendMessageResponse = {
    message_id: `mid.${Date.now()}`,
    recipient_id: params.recipientId,
  };
  return { messageId: mockResponse.message_id };
}

/**
 * Check whether the Instagram integration is connected.
 * In production: GET /api/instagram/status
 */
export async function getConnectionStatus(): Promise<{
  connected: boolean;
  accountName?: string;
  lastSyncAt?: string;
}> {
  // ── Production path ──────────────────────────────────────────────────────
  // const res = await fetch(`${INSTAGRAM_API_BASE}/status`);
  // return res.json();

  // ── Mock path ────────────────────────────────────────────────────────────
  return {
    connected: true,
    accountName: '@ondaRetreats',
    lastSyncAt: new Date().toISOString(),
  };
}

/**
 * Fetch the Instagram user profile for a given PSID.
 * In production: GET /api/instagram/profile/:psid
 * Backend calls: GET https://graph.facebook.com/v19.0/{psid}?fields=name,profile_pic
 */
export async function getUserProfile(psid: string): Promise<{
  id: string;
  name: string;
  profilePic?: string;
} | null> {
  // ── Production path ──────────────────────────────────────────────────────
  // const res = await fetch(`${INSTAGRAM_API_BASE}/profile/${psid}`);
  // if (!res.ok) return null;
  // return res.json();

  console.warn(`[Instagram API] getUserProfile(${psid}) — backend required. Returning null.`);
  return null;
}
