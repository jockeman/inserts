import { Insert } from '../types/Insert';
import { calcModifier, formatBonus } from '../utils/cardHelpers';

interface MonsterInsertCardProps {
  insert: Insert;
  isLarge: boolean;
  dmContentWidth: string;
  dmContentHeight: string;
}

export default function MonsterInsertCard({ insert, isLarge, dmContentWidth, dmContentHeight }: MonsterInsertCardProps) {
  return (
    <div style={{
      position: 'absolute', left: '2mm', top: 0,
      width: dmContentWidth, height: dmContentHeight, background: '#fff',
      border: '1px solid #bbb', borderRadius: '1mm', overflow: 'hidden',
      padding: '1mm', fontSize: isLarge ? '2.8mm' : '3.2mm', boxSizing: 'border-box',
    }}>
      <div style={{ fontWeight: 'bold', fontSize: isLarge ? '3.5mm' : '4mm', marginBottom: '0.5mm', textAlign: 'center' }}>
        {insert.name || 'Name'}
      </div>
      
      {insert.monsterType && (
        <div style={{ textAlign: 'center', fontSize: isLarge ? '2.5mm' : '2.8mm', marginBottom: '0.5mm', fontStyle: 'italic' }}>
          {insert.monsterType}
        </div>
      )}
      {insert.cr && (
        <div style={{ textAlign: 'center', marginBottom: '0.5mm', paddingBottom: '0.5mm', borderBottom: '1px solid #ccc', fontSize: isLarge ? '2.5mm' : '2.8mm' }}>
          <b>CR {insert.cr}</b>
        </div>
      )}
      <div style={{ fontSize: isLarge ? '2.5mm' : '2.8mm', lineHeight: 1.2 }}>
        {insert.ac && <div><b>AC</b> {insert.ac}</div>}
        {insert.hp && <div><b>HP</b> {insert.hp}</div>}
        {insert.speed && <div><b>Speed</b> {insert.speed}</div>}
        
        {(insert.str || insert.dex || insert.con || insert.int || insert.wis || insert.cha) && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1mm', margin: '1mm 0', fontSize: isLarge ? '2.3mm' : '2.5mm' }}>
            {insert.str && <div><b>STR</b> {calcModifier(insert.str)}</div>}
            {insert.dex && <div><b>DEX</b> {calcModifier(insert.dex)}</div>}
            {insert.con && <div><b>CON</b> {calcModifier(insert.con)}</div>}
            {insert.int && <div><b>INT</b> {calcModifier(insert.int)}</div>}
            {insert.wis && <div><b>WIS</b> {calcModifier(insert.wis)}</div>}
            {insert.cha && <div><b>CHA</b> {calcModifier(insert.cha)}</div>}
          </div>
        )}
        
        {insert.savingThrows && <div><b>Saving Throws</b> {insert.savingThrows}</div>}
        {insert.skills && <div><b>Skills</b> {insert.skills}</div>}
        {insert.damageImmunities && <div><b>Damage Immunities</b> {insert.damageImmunities}</div>}
        {insert.damageResistances && <div><b>Damage Resistances</b> {insert.damageResistances}</div>}
        {insert.senses && <div><b>Senses</b> {insert.senses}</div>}
        {insert.languages && <div><b>Languages</b> {insert.languages}</div>}
        {insert.proficiencyBonus && <div><b>Proficiency Bonus</b> {formatBonus(insert.proficiencyBonus)}</div>}
        
        {isLarge && insert.traits && (
          <div style={{ marginTop: '1mm', borderTop: '1px solid #ccc', paddingTop: '0.5mm' }}>
            {insert.traits.split('\n').filter(t => t.trim()).map((trait, i) => (
              <div key={i} style={{ marginBottom: '0.5mm' }}>{trait}</div>
            ))}
          </div>
        )}
        
        {isLarge && insert.actions && (
          <div style={{ marginTop: '1mm', borderTop: '1px solid #ccc', paddingTop: '0.5mm' }}>
            <div style={{ fontWeight: 'bold' }}>Actions</div>
            {insert.actions.split('\n').filter(a => a.trim()).map((action, i) => (
              <div key={i} style={{ marginBottom: '0.5mm' }}>{action}</div>
            ))}
          </div>
        )}
        
        {isLarge && insert.bonusActions && (
          <div style={{ marginTop: '1mm', borderTop: '1px solid #ccc', paddingTop: '0.5mm' }}>
            <div style={{ fontWeight: 'bold' }}>Bonus Actions</div>
            {insert.bonusActions.split('\n').filter(b => b.trim()).map((bonus, i) => (
              <div key={i} style={{ marginBottom: '0.5mm' }}>{bonus}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
