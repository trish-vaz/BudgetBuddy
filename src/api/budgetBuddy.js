const WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL || 'https://trisha5523.app.n8n.cloud/webhook/budgetbuddy';
const USER_ID = 'demo_user';

/**
 * Calls the BudgetBuddy n8n webhook.
 * @param {'log_expense'|'set_budget'|'get_summary'} action
 * @param {string} message  Natural-language message for the AI to parse
 * @returns {Promise<object>} Parsed JSON response
 * @throws {Error} On network failure or non-OK HTTP status
 */
export async function callBudgetBuddy(action, message) {
  const response = await fetch(WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id: USER_ID, action, message }),
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return await response.json();
}
