import type { Insert } from '../types/Insert';
import { formatBonus, formatModifier, formatModifierOnly } from '../utils/cardHelpers';

interface MonsterInsertCardProps {
  insert: Insert;
  isLarge: boolean;
  dmContentWidth: string;
  dmContentHeight: string;
}

export function MonsterInsertCard({ insert, isLarge, dmContentWidth, dmContentHeight }: MonsterInsertCardProps) {
  // Helper to format HP with dice formula
  const formatHP = (hp: number, hpFormula?: string) => {
    if (!hp) return '';
    // On large cards, show both HP and formula if available
    if (isLarge && hpFormula) {
      return `${hp} (${hpFormula})`;
    }
    // On small cards, just show the HP number
    return hp.toString();
  };

  // Helper to format AC with armor type
  const formatAC = (ac: number, acType?: string) => {
    if (!ac) return '';
    // On large cards, show both AC and type if available
    if (isLarge && acType) {
      return `${ac} (${acType})`;
    }
    // On small cards, just show the AC number
    return ac.toString();
  };

  // Helper to format trait/action/bonus action text (bold first part before period)
  const formatAbilityText = (text: string) => {
    const firstPeriodIndex = text.indexOf('.');
    if (firstPeriodIndex === -1) return text;

    const name = text.substring(0, firstPeriodIndex);
    const description = text.substring(firstPeriodIndex);

    return (
      <>
        <b>{name}</b>
        {description}
      </>
    );
  };

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
        fontSize: isLarge ? '2.8mm' : '3.2mm',
        boxSizing: 'border-box',
      }}
    >
      {isLarge ? (
        <>
          <div style={{ fontWeight: 'bold', fontSize: '3.5mm', marginBottom: '0.5mm', textAlign: 'center' }}>
            {insert.name || 'Name'}
            {insert.cr && ` (CR ${insert.cr})`}
          </div>
          {(insert.monsterSize || insert.monsterType) && (
            <div
              style={{
                textAlign: 'center',
                fontSize: '2.5mm',
                marginBottom: '0.5mm',
                paddingBottom: '0.5mm',
                borderBottom: '1px solid #ccc',
                fontStyle: 'italic',
              }}
            >
              {[
                insert.monsterSize,
                insert.monsterType && insert.monsterTypeTag
                  ? `${insert.monsterType} (${insert.monsterTypeTag})`
                  : insert.monsterType,
              ]
                .filter(Boolean)
                .join(' ')}
            </div>
          )}
        </>
      ) : (
        <>
          <div style={{ fontWeight: 'bold', fontSize: '4mm', marginBottom: '0.5mm', textAlign: 'center' }}>
            {insert.name || 'Name'}
          </div>
          {(insert.monsterSize || insert.cr) && (
            <div
              style={{
                textAlign: 'center',
                fontSize: '2.8mm',
                marginBottom: '0.5mm',
                paddingBottom: '0.5mm',
                borderBottom: '1px solid #ccc',
                fontStyle: 'italic',
              }}
            >
              {[insert.monsterSize, insert.cr && `CR ${insert.cr}`].filter(Boolean).join(' • ')}
            </div>
          )}
        </>
      )}
      <div style={{ fontSize: isLarge ? '2.5mm' : '2.8mm', lineHeight: 1.2 }}>
        {(insert.ac || insert.hp) && (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>
              <b>AC</b> {formatAC(insert.ac, insert.acType) || '-'}
            </span>
            <span>
              <b>HP</b> {formatHP(insert.hp, insert.hpFormula) || '-'}
            </span>
          </div>
        )}
        {insert.speed && (
          <div>
            <b>Speed</b> {insert.speed}
          </div>
        )}

        {(insert.str || insert.dex || insert.con || insert.int || insert.wis || insert.cha) && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: isLarge ? '1mm' : '0.5mm',
              margin: '1mm 0',
              fontSize: isLarge ? '2.3mm' : '2.5mm',
            }}
          >
            {insert.str && (
              <div>
                <b>STR</b> {isLarge ? formatModifier(insert.str) : formatModifierOnly(insert.str)}
              </div>
            )}
            {insert.dex && (
              <div>
                <b>DEX</b> {isLarge ? formatModifier(insert.dex) : formatModifierOnly(insert.dex)}
              </div>
            )}
            {insert.con && (
              <div>
                <b>CON</b> {isLarge ? formatModifier(insert.con) : formatModifierOnly(insert.con)}
              </div>
            )}
            {insert.int && (
              <div>
                <b>INT</b> {isLarge ? formatModifier(insert.int) : formatModifierOnly(insert.int)}
              </div>
            )}
            {insert.wis && (
              <div>
                <b>WIS</b> {isLarge ? formatModifier(insert.wis) : formatModifierOnly(insert.wis)}
              </div>
            )}
            {insert.cha && (
              <div>
                <b>CHA</b> {isLarge ? formatModifier(insert.cha) : formatModifierOnly(insert.cha)}
              </div>
            )}
          </div>
        )}

        {/* Display individual saving throws */}
        {(() => {
          const saves = [
            { name: 'Str', value: insert.savingThrowStr },
            { name: 'Dex', value: insert.savingThrowDex },
            { name: 'Con', value: insert.savingThrowCon },
            { name: 'Int', value: insert.savingThrowInt },
            { name: 'Wis', value: insert.savingThrowWis },
            { name: 'Cha', value: insert.savingThrowCha },
          ].filter((save) => save.value != null);

          if (saves.length === 0) return null;

          return (
            <div>
              <b>{isLarge ? 'Saving Throws' : 'Saves'}</b>{' '}
              {saves.map((save, i) => (
                <span key={save.name}>
                  {i > 0 && ', '}
                  {save.name} {save.value && save.value > 0 ? '+' : ''}
                  {save.value}
                </span>
              ))}
            </div>
          );
        })()}
        {/* Display individual skills with non-zero values */}
        {(() => {
          const skills = [
            { name: 'Acrobatics', value: insert.acrobatics },
            { name: 'Animal Handling', value: insert.animalHandling },
            { name: 'Arcana', value: insert.arcana },
            { name: 'Athletics', value: insert.athletics },
            { name: 'Deception', value: insert.deception },
            { name: 'History', value: insert.history },
            { name: 'Insight', value: insert.insight },
            { name: 'Intimidation', value: insert.intimidation },
            { name: 'Investigation', value: insert.investigation },
            { name: 'Medicine', value: insert.medicine },
            { name: 'Nature', value: insert.nature },
            { name: 'Perception', value: insert.perception },
            { name: 'Performance', value: insert.performance },
            { name: 'Persuasion', value: insert.persuasion },
            { name: 'Religion', value: insert.religion },
            { name: 'Sleight of Hand', value: insert.sleightOfHand },
            { name: 'Stealth', value: insert.stealth },
            { name: 'Survival', value: insert.survival },
          ].filter((skill) => skill.value && skill.value !== 0);

          if (skills.length === 0) return null;

          return (
            <div>
              <b>Skills</b>{' '}
              {skills.map((skill, i) => (
                <span key={skill.name}>
                  {i > 0 && ', '}
                  {skill.name} {skill.value && skill.value > 0 ? '+' : ''}
                  {skill.value}
                </span>
              ))}
            </div>
          );
        })()}
        {Array.isArray(insert.damageImmunities) && insert.damageImmunities.length > 0 && (
          <div>
            <b>Immunities</b> {insert.damageImmunities.join(', ')}
          </div>
        )}
        {Array.isArray(insert.damageResistances) && insert.damageResistances.length > 0 && (
          <div>
            <b>Resistances</b> {insert.damageResistances.join(', ')}
          </div>
        )}
        {Array.isArray(insert.damageVulnerabilities) && insert.damageVulnerabilities.length > 0 && (
          <div>
            <b>Vulnerabilities</b> {insert.damageVulnerabilities.join(', ')}
          </div>
        )}
        {Array.isArray(insert.conditionImmunities) && insert.conditionImmunities.length > 0 && (
          <div>
            <b>Condition Immunities</b> {insert.conditionImmunities.join(', ')}
          </div>
        )}
        {insert.senses && (
          <div>
            <b>Senses</b> {insert.senses}
          </div>
        )}
        {insert.languages && (
          <div>
            <b>Languages</b> {insert.languages}
          </div>
        )}
        {insert.proficiencyBonus && (
          <div>
            <b>Proficiency Bonus</b> {formatBonus(insert.proficiencyBonus)}
          </div>
        )}

        {isLarge && insert.traits && (
          <div style={{ marginTop: '1mm', borderTop: '1px solid #ccc', paddingTop: '0.5mm' }}>
            {insert.traits
              .split('\n')
              .filter((t) => t.trim())
              .map((trait, i) => (
                <div key={`trait-${i}-${trait.substring(0, 20)}`} style={{ marginBottom: '0.5mm' }}>
                  {formatAbilityText(trait)}
                </div>
              ))}
          </div>
        )}

        {isLarge && insert.actions && (
          <div style={{ marginTop: '1mm', borderTop: '1px solid #ccc', paddingTop: '0.5mm' }}>
            <div style={{ fontWeight: 'bold' }}>Actions</div>
            {insert.actions
              .split('\n')
              .filter((a) => a.trim())
              .map((action, i) => (
                <div key={`action-${i}-${action.substring(0, 20)}`} style={{ marginBottom: '0.5mm' }}>
                  {formatAbilityText(action)}
                </div>
              ))}
          </div>
        )}

        {isLarge && insert.bonusActions && (
          <div style={{ marginTop: '1mm', borderTop: '1px solid #ccc', paddingTop: '0.5mm' }}>
            <div style={{ fontWeight: 'bold' }}>Bonus Actions</div>
            {insert.bonusActions
              .split('\n')
              .filter((b) => b.trim())
              .map((bonus, i) => (
                <div key={`bonus-${i}-${bonus.substring(0, 20)}`} style={{ marginBottom: '0.5mm' }}>
                  {formatAbilityText(bonus)}
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
