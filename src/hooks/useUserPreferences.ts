import { useEffect, useState } from 'react';
import { DEFAULT_PREFERENCES, USER_PREFS_KEY, type UserPreferences } from '../types/UserPreferences';

export function useUserPreferences(): [UserPreferences, (partial: Partial<UserPreferences>) => void] {
  const [preferences, setPreferences] = useState<UserPreferences>(() => {
    const saved = localStorage.getItem(USER_PREFS_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (_e) {
        return DEFAULT_PREFERENCES;
      }
    }
    return DEFAULT_PREFERENCES;
  });

  useEffect(() => {
    localStorage.setItem(USER_PREFS_KEY, JSON.stringify(preferences));
  }, [preferences]);

  const updatePreferences = (partial: Partial<UserPreferences>) => {
    setPreferences((prev) => ({ ...prev, ...partial }));
  };

  return [preferences, updatePreferences];
}
