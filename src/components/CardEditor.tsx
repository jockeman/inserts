import { Insert } from '../types/Insert';
import InsertCard from './InsertCard';
import InsertForm from './InsertForm';

interface CardEditorProps {
  insert: Insert;
  index: number;
  onUpdate: (field: keyof Insert, value: string) => void;
  onUpdateBoolean: (field: keyof Insert, value: boolean) => void;
  onRemove: () => void;
}

export default function CardEditor({ insert, index, onUpdate, onUpdateBoolean, onRemove }: CardEditorProps) {
  return (
    <div className="card-editor" style={{ 
      border: '2px solid #ddd', 
      borderRadius: 8, 
      padding: 16, 
      background: '#f9f9f9',
      position: 'relative',
      flex: '0 0 auto',
      width: 900,
      minWidth: 0
    }}>
      <button 
        onClick={onRemove} 
        style={{ 
          position: 'absolute', 
          top: 8, 
          right: 8, 
          background: '#f88',
          color: '#fff',
          border: 'none',
          borderRadius: 4,
          padding: '4px 12px',
          cursor: 'pointer',
          fontSize: '1em'
        }}
      >
        Remove
      </button>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 0 }}>
        <h3 style={{ margin: 0 }}>{insert.name || "Unnamed Card"}</h3>
        <label style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
          <input 
            type="checkbox" 
            checked={insert.selected}
            onChange={(e) => onUpdateBoolean('selected', e.target.checked)}
            style={{ cursor: 'pointer' }}
          />
          Print this card
        </label>
      </div>
      
      <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
        {/* Input Form */}
        <div style={{ flex: '1 1 300px' }}>
          <InsertForm insert={insert} onUpdate={onUpdate} />
        </div>
        
        {/* Live Preview */}
        <div style={{ flex: '0 0 auto' }}>
          <h4 style={{ marginTop: 0, marginBottom: 8 }}>Preview</h4>
          <InsertCard insert={insert} index={index} />
        </div>
      </div>
    </div>
  );
}
