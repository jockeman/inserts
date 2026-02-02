import { memo, useCallback } from 'react';
import type { InsertInputs } from '../types/Insert';
import type { UserPreferences } from '../types/UserPreferences';
import { CardEditor } from './CardEditor';

interface CardEditorWrapperProps {
  insertInput: InsertInputs;
  index: number;
  onUpdate: <K extends keyof InsertInputs>(id: string, field: K, value: InsertInputs[K]) => void;
  onRemove: (id: string) => void;
  preferences: UserPreferences;
}

export const CardEditorWrapper = memo(function CardEditorWrapper({
  insertInput,
  index,
  onUpdate,
  onRemove,
  preferences,
}: CardEditorWrapperProps) {
  // Memoize callbacks with insertInput.id baked in
  const handleUpdate = useCallback(
    <K extends keyof InsertInputs>(field: K, value: InsertInputs[K]) => {
      onUpdate(insertInput.id, field, value);
    },
    [insertInput.id, onUpdate]
  );

  const handleRemove = useCallback(() => {
    onRemove(insertInput.id);
  }, [insertInput.id, onRemove]);

  return (
    <CardEditor
      insertInput={insertInput}
      index={index}
      onUpdate={handleUpdate}
      onRemove={handleRemove}
      preferences={preferences}
    />
  );
});
