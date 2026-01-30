import { Avatar, Button, Checkbox, Collapse, Group, Paper, Title } from '@mantine/core';
import { useState } from 'react';
import type { Insert } from '../types/Insert';
import type { UserPreferences } from '../types/UserPreferences';
import InsertCard from './InsertCard';
import InsertForm from './InsertForm';

interface CardEditorProps {
  insert: Insert;
  index: number;
  onUpdate: (field: keyof Insert, value: string) => void;
  onUpdateBoolean: (field: keyof Insert, value: boolean) => void;
  onRemove: () => void;
  preferences: UserPreferences;
}

export default function CardEditor({
  insert,
  index,
  onUpdate,
  onUpdateBoolean,
  onRemove,
  preferences,
}: CardEditorProps) {
  const [isExpanded, setIsExpanded] = useState(true);

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
          onChange={(e) => onUpdateBoolean('selected', e.currentTarget.checked)}
        />
        <Avatar src={insert.image} alt={insert.name} size="md" radius="sm" />
        <Title order={3} style={{ margin: 0 }}>
          {insert.name || 'Unnamed Card'}
        </Title>
        <Button onClick={() => setIsExpanded(!isExpanded)} variant="subtle" size="xs" style={{ marginLeft: 'auto' }}>
          {isExpanded ? 'Collapse' : 'Expand'}
        </Button>
        <Button onClick={onRemove} color="red" size="xs" pos="absolute" style={{ marginLeft: 'auto', right: 10 }}>
          Remove
        </Button>
      </Group>

      <Collapse in={isExpanded}>
        <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
          {/* Input Form */}
          <div style={{ flex: '1 1 300px' }}>
            <InsertForm
              insert={insert}
              onUpdate={onUpdate}
              onUpdateBoolean={onUpdateBoolean}
              preferences={preferences}
            />
          </div>

          {/* Live Preview */}
          <div style={{ flex: '0 0 auto' }}>
            <Title order={4} mb="xs">
              Preview
            </Title>
            <InsertCard insert={insert} index={index} preferences={preferences} />
          </div>
        </div>
      </Collapse>
    </Paper>
  );
}
