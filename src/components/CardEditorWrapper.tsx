import { memo, useCallback } from 'react';
import type { InsertInputs } from '../types/Insert';
import type { UserPreferences } from '../types/UserPreferences';
import { CardEditor } from './CardEditor';

interface CardEditorWrapperProps {
  insertInput: InsertInputs;
  index: number;
  onUpdate: (id: string, field: keyof InsertInputs, value: string | string[] | number | null | any) => void;
  onUpdateBoolean: (id: string, field: keyof InsertInputs, value: boolean) => void;
  onRemove: (id: string) => void;
  preferences: UserPreferences;
}

export const CardEditorWrapper = memo(function CardEditorWrapper({
  insertInput,
  index,
  onUpdate,
  onUpdateBoolean,
  onRemove,
  preferences,
}: CardEditorWrapperProps) {
  // Memoize callbacks with insertInput.id baked in
  const handleUpdate = useCallback(
    (field: keyof InsertInputs, value: string | string[] | number | null | any) => {
      onUpdate(insertInput.id, field, value);
    },
    [insertInput.id, onUpdate]
  );

  const handleUpdateBoolean = useCallback(
    (field: keyof InsertInputs, value: boolean) => {
      onUpdateBoolean(insertInput.id, field, value);
    },
    [insertInput.id, onUpdateBoolean]
  );

  const handleRemove = useCallback(() => {
    onRemove(insertInput.id);
  }, [insertInput.id, onRemove]);

  return (
    <CardEditor
      insertInput={insertInput}
      index={index}
      onUpdate={handleUpdate}
      onUpdateBoolean={handleUpdateBoolean}
      onRemove={handleRemove}
      preferences={preferences}
    />
  );
});
