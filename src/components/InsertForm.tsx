import { Insert } from '../types/Insert';
import ImageInput from './ImageInput';

interface InsertFormProps {
  insert: Insert;
  onUpdate: (field: keyof Insert, value: string) => void;
}

export default function InsertForm({ insert, onUpdate }: InsertFormProps) {
  const isMonster = insert.cardType === 'monster';
  const isLarge = insert.size === 'large';
  
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
      <div style={{ display: 'flex', gap: 12 }}>
        <div style={{ flex: 1 }}>
          <label>
            Card Type<br />
            <select 
              value={insert.cardType} 
              onChange={(e) => onUpdate('cardType', e.target.value)}
              style={{ width: '100%' }}
            >
              <option value="player">Player</option>
              <option value="monster">Monster</option>
            </select>
          </label>
        </div>
        <div style={{ flex: 1 }}>
          <label>
            Size<br />
            <select 
              value={insert.size} 
              onChange={(e) => onUpdate('size', e.target.value)}
              style={{ width: '100%' }}
            >
              <option value="small">Small (37x77mm)</option>
              <option value="large">Large (64x89mm)</option>
            </select>
          </label>
        </div>
      </div>
      
      {isMonster ? (
        <>
          {/* Monster-specific fields */}
          <div>
            <label>
              Type (e.g., "Small Humanoid (Angulotl)")<br />
              <input 
                value={insert.monsterType} 
                onChange={(e) => onUpdate('monsterType', e.target.value)}
                style={{ width: '100%' }}
              />
            </label>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <div style={{ flex: 1 }}>
              <label>
                CR<br />
                <input 
                  value={insert.cr} 
                  onChange={(e) => onUpdate('cr', e.target.value)}
                  style={{ width: '100%' }}
                  placeholder="e.g., 1/4"
                />
              </label>
            </div>
            <div style={{ flex: 1 }}>
              <label>
                Speed<br />
                <input 
                  value={insert.speed} 
                  onChange={(e) => onUpdate('speed', e.target.value)}
                  style={{ width: '100%' }}
                  placeholder="e.g., 20 ft., swim 30 ft."
                />
              </label>
            </div>
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
                HP<br />
                <input 
                  value={insert.hp} 
                  onChange={(e) => onUpdate('hp', e.target.value)}
                  style={{ width: '100%' }}
                  placeholder="e.g., 14 (4d6)"
                />
              </label>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            <div>
              <label>
                STR<br />
                <input 
                  value={insert.str} 
                  onChange={(e) => onUpdate('str', e.target.value)}
                  style={{ width: '100%' }}
                  type="number"
                  placeholder="e.g., 7"
                />
              </label>
            </div>
            <div>
              <label>
                DEX<br />
                <input 
                  value={insert.dex} 
                  onChange={(e) => onUpdate('dex', e.target.value)}
                  style={{ width: '100%' }}
                  type="number"
                  placeholder="e.g., 15"
                />
              </label>
            </div>
            <div>
              <label>
                CON<br />
                <input 
                  value={insert.con} 
                  onChange={(e) => onUpdate('con', e.target.value)}
                  style={{ width: '100%' }}
                  type="number"
                  placeholder="e.g., 11"
                />
              </label>
            </div>
            <div>
              <label>
                INT<br />
                <input 
                  value={insert.int} 
                  onChange={(e) => onUpdate('int', e.target.value)}
                  style={{ width: '100%' }}
                  type="number"
                  placeholder="e.g., 10"
                />
              </label>
            </div>
            <div>
              <label>
                WIS<br />
                <input 
                  value={insert.wis} 
                  onChange={(e) => onUpdate('wis', e.target.value)}
                  style={{ width: '100%' }}
                  type="number"
                  placeholder="e.g., 14"
                />
              </label>
            </div>
            <div>
              <label>
                CHA<br />
                <input 
                  value={insert.cha} 
                  onChange={(e) => onUpdate('cha', e.target.value)}
                  style={{ width: '100%' }}
                  type="number"
                  placeholder="e.g., 8"
                />
              </label>
            </div>
          </div>
          <div>
            <label>
              Saving Throws<br />
              <input 
                value={insert.savingThrows} 
                onChange={(e) => onUpdate('savingThrows', e.target.value)}
                style={{ width: '100%' }}
                placeholder="e.g., Str +2, Dex +4"
              />
            </label>
          </div>
          <div>
            <label>
              Skills<br />
              <input 
                value={insert.skills} 
                onChange={(e) => onUpdate('skills', e.target.value)}
                style={{ width: '100%' }}
                placeholder="e.g., Perception +4, Stealth +4"
              />
            </label>
          </div>
          <div>
            <label>
              Damage Immunities<br />
              <input 
                value={insert.damageImmunities} 
                onChange={(e) => onUpdate('damageImmunities', e.target.value)}
                style={{ width: '100%' }}
              />
            </label>
          </div>
          <div>
            <label>
              Damage Resistances<br />
              <input 
                value={insert.damageResistances} 
                onChange={(e) => onUpdate('damageResistances', e.target.value)}
                style={{ width: '100%' }}
              />
            </label>
          </div>
          <div>
            <label>
              Senses<br />
              <input 
                value={insert.senses} 
                onChange={(e) => onUpdate('senses', e.target.value)}
                style={{ width: '100%' }}
                placeholder="e.g., darkvision 60 ft., passive Perception 14"
              />
            </label>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <div style={{ flex: 1 }}>
              <label>
                Languages<br />
                <input 
                  value={insert.languages} 
                  onChange={(e) => onUpdate('languages', e.target.value)}
                  style={{ width: '100%' }}
                />
              </label>
            </div>
            <div style={{ flex: 1 }}>
              <label>
                Proficiency Bonus<br />
                <input 
                  value={insert.proficiencyBonus} 
                  onChange={(e) => onUpdate('proficiencyBonus', e.target.value)}
                  style={{ width: '100%' }}
                  placeholder="e.g., +2"
                />
              </label>
            </div>
          </div>
          {isLarge && (
            <>
              <div>
                <label>
                  Traits (one per line)<br />
                  <textarea 
                    value={insert.traits} 
                    onChange={(e) => onUpdate('traits', e.target.value)}
                    style={{ width: '100%', minHeight: 80 }}
                    placeholder="e.g., Amphibious. The blade can breathe air and water."
                  />
                </label>
              </div>
              <div>
                <label>
                  Actions (one per line)<br />
                  <textarea 
                    value={insert.actions} 
                    onChange={(e) => onUpdate('actions', e.target.value)}
                    style={{ width: '100%', minHeight: 80 }}
                    placeholder="e.g., Machete. Melee Weapon Attack: +4 to hit..."
                  />
                </label>
              </div>
              <div>
                <label>
                  Bonus Actions (one per line)<br />
                  <textarea 
                    value={insert.bonusActions} 
                    onChange={(e) => onUpdate('bonusActions', e.target.value)}
                    style={{ width: '100%', minHeight: 80 }}
                  />
                </label>
              </div>
            </>
          )}
        </>
      ) : (
        <>
          {/* Player-specific fields */}
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
        </>
      )}
      
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
