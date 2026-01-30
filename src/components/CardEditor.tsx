import { Paper, Button, Group, Title, Checkbox } from '@mantine/core';
import { Insert } from '../types/Insert';
import { UserPreferences } from '../types/UserPreferences';
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

export default function CardEditor({ insert, index, onUpdate, onUpdateBoolean, onRemove, preferences }: CardEditorProps) {
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
        minWidth: 0
      }}
    >
      <Button 
        onClick={onRemove} 
        color="red"
        size="xs"
        pos="absolute"
        style={{ top: 8, right: 8 }}
      >
        Remove
      </Button>
      
      <Group mb="md" mt={0}>
        <Title order={3} style={{ margin: 0 }}>{insert.name || "Unnamed Card"}</Title>
        <Checkbox
          label="Print this card"
          checked={insert.selected}
          onChange={(e) => onUpdateBoolean('selected', e.currentTarget.checked)}
        />
      </Group>
      
      <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
        {/* Input Form */}
        <div style={{ flex: '1 1 300px' }}>
          <InsertForm insert={insert} onUpdate={onUpdate} onUpdateBoolean={onUpdateBoolean} preferences={preferences} />
        </div>
        
        {/* Live Preview */}
        <div style={{ flex: '0 0 auto' }}>
          <Title order={4} mb="xs">Preview</Title>
          <InsertCard insert={insert} index={index} preferences={preferences} />
        </div>
      </div>
    </Paper>
  );
}
