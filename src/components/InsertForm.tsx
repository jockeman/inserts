import { Insert } from '../types/Insert';
import ImageInput from './ImageInput';

interface InsertFormProps {
  insert: Insert;
  onUpdate: (field: keyof Insert, value: string) => void;
}

export default function InsertForm({ insert, onUpdate }: InsertFormProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div>
        <label>
          Name<br />
          <input 
            value={insert.name} 
            onChange={(e) => onUpdate('name', e.target.value)}
            style={{ width: '100%' }}
          />
        </label>
      </div>
      <div>
        <label>
          Race<br />
          <select 
            value={insert.race} 
            onChange={(e) => onUpdate('race', e.target.value)}
            style={{ width: '100%' }}
          >
            <option value="">-- Select --</option>
            <option value="Dragonborn">Dragonborn</option>
            <option value="Dwarf">Dwarf</option>
            <option value="Elf">Elf</option>
            <option value="Gnome">Gnome</option>
            <option value="Goliath">Goliath</option>
            <option value="Half-Elf">Half-Elf</option>
            <option value="Half-Orc">Half-Orc</option>
            <option value="Halfling">Halfling</option>
            <option value="Human">Human</option>
            <option value="Tabaxi">Tabaxi</option>
            <option value="Tiefling">Tiefling</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Class<br />
          <select 
            value={insert.class} 
            onChange={(e) => onUpdate('class', e.target.value)}
            style={{ width: '100%' }}
          >
            <option value="">-- Select --</option>
            <option value="Barbarian">Barbarian</option>
            <option value="Bard">Bard</option>
            <option value="Cleric">Cleric</option>
            <option value="Druid">Druid</option>
            <option value="Fighter">Fighter</option>
            <option value="Monk">Monk</option>
            <option value="Paladin">Paladin</option>
            <option value="Ranger">Ranger</option>
            <option value="Rogue">Rogue</option>
            <option value="Sorcerer">Sorcerer</option>
            <option value="Warlock">Warlock</option>
            <option value="Wizard">Wizard</option>
          </select>
        </label>
      </div>
      <div style={{ display: 'flex', gap: 12 }}>
        <div style={{ flex: 1 }}>
          <label>
            AC<br />
            <input 
              value={insert.ac} 
              onChange={(e) => onUpdate('ac', e.target.value)}
              style={{ width: '100%' }}
            />
          </label>
        </div>
        <div style={{ flex: 1 }}>
          <label>
            Max HP<br />
            <input 
              value={insert.hp} 
              onChange={(e) => onUpdate('hp', e.target.value)}
              style={{ width: '100%' }}
            />
          </label>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 12 }}>
        <div style={{ flex: 1 }}>
          <label>
            Passive Arcana<br />
            <input 
              value={insert.arcana} 
              onChange={(e) => onUpdate('arcana', e.target.value)}
              style={{ width: '100%' }}
            />
          </label>
        </div>
        <div style={{ flex: 1 }}>
          <label>
            Passive Insight<br />
            <input 
              value={insert.insight} 
              onChange={(e) => onUpdate('insight', e.target.value)}
              style={{ width: '100%' }}
            />
          </label>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 12 }}>
        <div style={{ flex: 1 }}>
          <label>
            Passive Investigation<br />
            <input 
              value={insert.investigation} 
              onChange={(e) => onUpdate('investigation', e.target.value)}
              style={{ width: '100%' }}
            />
          </label>
        </div>
        <div style={{ flex: 1 }}>
          <label>
            Passive Nature<br />
            <input 
              value={insert.nature} 
              onChange={(e) => onUpdate('nature', e.target.value)}
              style={{ width: '100%' }}
            />
          </label>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 12 }}>
        <div style={{ flex: 1 }}>
          <label>
            Passive Perception<br />
            <input 
              value={insert.perception} 
              onChange={(e) => onUpdate('perception', e.target.value)}
              style={{ width: '100%' }}
            />
          </label>
        </div>
        <div style={{ flex: 1 }}>
          <label>
            Passive Stealth<br />
            <input 
              value={insert.stealth} 
              onChange={(e) => onUpdate('stealth', e.target.value)}
              style={{ width: '100%' }}
            />
          </label>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 12 }}>
        <div style={{ flex: 1 }}>
          <label>
            Passive Survival<br />
            <input 
              value={insert.survival} 
              onChange={(e) => onUpdate('survival', e.target.value)}
              style={{ width: '100%' }}
            />
          </label>
        </div>
        <div style={{ flex: 1 }}>
          <label>
            Darkvision (ft)<br />
            <input 
              value={insert.darkvision} 
              onChange={(e) => onUpdate('darkvision', e.target.value)}
              style={{ width: '100%' }}
              type="number"
              min="0"
            />
          </label>
        </div>
      </div>
      <div>
        <label>
          Image<br />
          <ImageInput 
            value={insert.image} 
            onChange={(val) => onUpdate('image', val)} 
          />
        </label>
      </div>
    </div>
  );
}
