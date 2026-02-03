import { FaHeart, FaMoon } from 'react-icons/fa';
import { GiShield } from 'react-icons/gi';
import type { Insert } from '../types/Insert';
import type { UserPreferences } from '../types/UserPreferences';
import { getVisibleSkills } from '../utils/skillConfig';

interface PlayerInsertCardProps {
  insert: Insert;
  dmContentWidth: string;
  dmContentHeight: string;
  preferences: UserPreferences;
}

export function PlayerInsertCard({ insert, dmContentWidth, dmContentHeight, preferences }: PlayerInsertCardProps) {
  const visibleSkills = getVisibleSkills(preferences);

  return (
    <div
      style={{
        position: 'absolute',
        left: '2mm',
        top: 0,
        width: dmContentWidth,
        height: dmContentHeight,
        background: '#fff',
        border: '1px solid #bbb',
        borderRadius: '1mm',
        overflow: 'hidden',
        padding: '1mm',
        fontSize: '3.2mm',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ fontWeight: 'bold', fontSize: '4mm', marginBottom: '0.5mm', textAlign: 'center' }}>
        {insert.name || 'Name'}
      </div>

      <div
        style={{
          textAlign: 'center',
          marginBottom: '1mm',
          paddingBottom: '1mm',
          borderBottom: '1px solid #ccc',
          fontSize: '3mm',
        }}
      >
        <b>{insert.race && insert.class ? `${insert.race} ${insert.class}` : insert.race || insert.class || '-'}</b>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5mm 2mm' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1mm' }}>
          <GiShield size="4.5mm" />
          <b>{insert.ac || '-'}</b>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1mm' }}>
          <FaHeart size="4.5mm" />
          <b>{insert.hp || '-'}</b>
        </div>

        {visibleSkills.map((skillInfo) => {
          const Icon = skillInfo.icon;
          const skillBonus = insert.skills[skillInfo.key]?.value;
          // Display as passive value (skill bonus + 10)
          const passiveValue = skillBonus !== undefined ? skillBonus + 10 : undefined;
          return (
            <div key={skillInfo.key} style={{ display: 'flex', alignItems: 'center', gap: '1mm' }}>
              <Icon size="4.5mm" />
              <b>{passiveValue || '-'}</b>
            </div>
          );
        })}
        {(insert?.darkvision ?? 0) > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1mm' }}>
            <FaMoon size="4.5mm" />
            <b>{insert.darkvision}ft</b>
          </div>
        )}
      </div>
    </div>
  );
}
