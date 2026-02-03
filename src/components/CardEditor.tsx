import { Avatar, Button, Checkbox, Collapse, Group, Paper, Title } from '@mantine/core';
import { memo, useMemo, useState } from 'react';
import type { InsertInputs } from '../types/Insert';
import type { UserPreferences } from '../types/UserPreferences';
import { exportCardToJSON } from '../utils/cardIO';
import { calculateInsertValues } from '../utils/insertCalculations';
import { InsertCard } from './InsertCard';
import { InsertForm } from './InsertForm';

interface CardEditorProps {
  insertInput: InsertInputs;
  index: number;
  onUpdate: <K extends keyof InsertInputs>(field: K, value: InsertInputs[K]) => void;
  onRemove: () => void;
  preferences: UserPreferences;
}

export const CardEditor = memo(function CardEditor({
  insertInput,
  index,
  onUpdate,
  onRemove,
  preferences,
}: CardEditorProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  // Calculate Insert values from inputs - only recalculates when insertInput changes
  const insert = useMemo(() => calculateInsertValues(insertInput), [insertInput]);

  const handleExport = async () => {
    await exportCardToJSON(insertInput);
  };

  return (
    <Paper
      className="card-editor"
      shadow="sm"
      p="md"
      withBorder
      pos="relative"
      style={{
        flex: '0 0 auto',
        width: 900,
        minWidth: 0,
      }}
    >
      <Group mb="md" mt={0} style={{ paddingRight: 80 }}>
        <Checkbox
          label="Print"
          checked={insert.selected}
          onChange={(e) => onUpdate('selected', e.currentTarget.checked)}
        />
        <Avatar src={insert.image} alt={insert.name} size="md" radius="sm" />
        <Title order={3} style={{ margin: 0 }}>
          {insert.name || 'Unnamed Card'}
        </Title>
        <Button onClick={() => setIsExpanded(!isExpanded)} variant="subtle" size="xs" style={{ marginLeft: 'auto' }}>
          {isExpanded ? 'Collapse' : 'Expand'}
        </Button>
        <Button onClick={handleExport} variant="light" size="xs">
          Export
        </Button>
        <Button onClick={onRemove} color="red" size="xs" pos="absolute" style={{ marginLeft: 'auto', right: 10 }}>
          Remove
        </Button>
      </Group>

      <Collapse in={isExpanded}>
        <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
          {/* Input Form */}
          <div style={{ flex: '1 1 300px' }}>
            <InsertForm insert={insert} onUpdate={onUpdate} preferences={preferences} />
          </div>

          {/* Live Preview */}
          <div style={{ flex: '0 0 auto' }}>
            <Title order={4} mb="xs">
              Preview
            </Title>
            <InsertCard insertInput={insert} index={index} preferences={preferences} />
          </div>
        </div>
      </Collapse>
    </Paper>
  );
});
