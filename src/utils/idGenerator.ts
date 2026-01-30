/**
 * Generates a unique ID for inserts
 * Uses timestamp + random string for uniqueness
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}
