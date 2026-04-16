/**
 * Conversation store — manages messages state in the frontend.
 *
 * In production this would sync with your backend via:
 *   - Initial fetch: GET /api/conversations/:id/messages
 *   - New message (optimistic): POST /api/messages → append to local state
 *   - Incoming webhook message: received via WebSocket/SSE → append to local state
 *
 * For now: initialises from mockMessages and manages local state.
 */

import React, { createContext, useContext, useState, useCallback } from 'react';
import {
  mockMessages,
  mockConversations,
  type Message,
  type Conversation,
} from '@/data/crm';
import { sendInstagramMessage } from '@/integrations/instagram/api';

// ─── Types ────────────────────────────────────────────────────────────────────

interface ConversationsContextValue {
  /** Get all messages for a given conversation ID, sorted by timestamp ascending. */
  getMessages: (conversationId: string) => Message[];
  /**
   * Optimistically add a message from the CRM user.
   * Sets status='sending', then resolves to 'sent' after the API call.
   */
  sendMessage: (conversationId: string, text: string) => Promise<void>;
  /** Look up the conversation linked to a contact. */
  getConversationByContactId: (contactId: string) => Conversation | undefined;
}

// ─── Context ─────────────────────────────────────────────────────────────────

const ConversationsContext = createContext<ConversationsContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function ConversationsProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<Message[]>(() =>
    [...mockMessages].sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())
  );

  const getMessages = useCallback(
    (conversationId: string): Message[] =>
      messages.filter((m) => m.conversationId === conversationId),
    [messages]
  );

  const getConversationByContactId = useCallback(
    (contactId: string): Conversation | undefined =>
      mockConversations.find((c) => c.contactId === contactId),
    []
  );

  const sendMessage = useCallback(
    async (conversationId: string, text: string): Promise<void> => {
      const conversation = mockConversations.find((c) => c.id === conversationId);
      if (!conversation) return;

      const tempId = `msg-temp-${Date.now()}`;
      const optimisticMsg: Message = {
        id: tempId,
        conversationId,
        content: text,
        direction: 'outbound',
        channel: conversation.channel,
        timestamp: new Date(),
        status: 'sending',
        syncedFromPlatform: false,
        senderRef: 'crm',
      };

      // Optimistically add to local state
      setMessages((prev) => [...prev, optimisticMsg]);

      try {
        // For Instagram, call the (mock) API. Other channels would have their own path.
        let externalId: string | undefined;
        if (conversation.channel === 'instagram') {
          const result = await sendInstagramMessage({
            recipientId: 'mock-psid',
            text,
          });
          if ('messageId' in result) {
            externalId = result.messageId;
          }
        } else {
          // Simulate network latency for other channels
          await new Promise((resolve) => setTimeout(resolve, 500));
        }

        // Update status to 'sent'
        setMessages((prev) =>
          prev.map((m) =>
            m.id === tempId
              ? { ...m, status: 'sent', externalId }
              : m
          )
        );
      } catch {
        // Mark as failed
        setMessages((prev) =>
          prev.map((m) =>
            m.id === tempId ? { ...m, status: 'failed' } : m
          )
        );
      }
    },
    []
  );

  const value: ConversationsContextValue = {
    getMessages,
    sendMessage,
    getConversationByContactId,
  };

  return React.createElement(ConversationsContext.Provider, { value }, children);
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useConversations(): ConversationsContextValue {
  const ctx = useContext(ConversationsContext);
  if (!ctx) {
    throw new Error('useConversations must be used inside <ConversationsProvider>');
  }
  return ctx;
}
