'use client';

import { AskLoopChat } from './AskLoopChat';

/**
 * The AI Assistant feature entry point.
 *
 * Keep AI chat behaviour in AskLoopChat so the team can replace its mock
 * response handler with a real API client without changing the /ask page.
 */
export function AIAssistant() {
  return <AskLoopChat />;
}
