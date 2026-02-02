import { useMemo } from 'react';
import type { InsertInputs } from '../types/Insert';
import type { UserPreferences } from '../types/UserPreferences';
import { getCardDimensions } from '../utils/cardHelpers';
import { calculateInsertValues } from '../utils/insertCalculations';
import { MonsterInsertCard } from './MonsterInsertCard';
import { PlayerInsertCard } from './PlayerInsertCard';

interface InsertCardProps {
  insertInput: InsertInputs;
  index: number;
  preferences: UserPreferences;
}

export function InsertCard({ insertInput, preferences }: InsertCardProps) {
  // Calculate Insert values from inputs - only recalculates when insertInput changes
  const insert = useMemo(() => calculateInsertValues(insertInput), [insertInput]);

  const isLarge = insert.size === 'large';
  const isMonster = insert.cardType === 'monster';

  const {
    containerWidth,
    containerHeight,
    cardWidth,
    cardHeight,
    playerOpeningWidth,
    playerOpeningHeight,
    playerOpeningTop,
    dmContentWidth,
    dmContentHeight,
  } = getCardDimensions(isLarge);

  return (
    <div
      style={{
        width: containerWidth,
        height: containerHeight,
        margin: '2mm',
        display: 'inline-block',
        position: 'relative',
        pageBreakInside: 'avoid',
      }}
    >
      {/* Player Side (Front) */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: cardWidth,
          height: cardHeight,
          border: '1px solid #333',
          borderRadius: '2mm',
          overflow: 'hidden',
          background: '#f8f8f8',
          boxShadow: '0 0 2mm #0002',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: '2mm',
            top: playerOpeningTop,
            width: playerOpeningWidth,
            height: playerOpeningHeight,
            background: '#fff',
            border: '1px solid #bbb',
            borderRadius: '1mm',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {insert.image && (
            <img
              src={insert.image}
              alt="character"
              style={{
                maxWidth: '100%',
                maxHeight: isMonster ? '100%' : '70%',
                objectFit: 'contain',
              }}
            />
          )}
          {!isMonster && (
            <div style={{ fontWeight: 'bold', fontSize: '4mm', marginTop: '1mm', textAlign: 'center' }}>
              {insert.name || <span style={{ color: '#bbb' }}>Name</span>}
            </div>
          )}
        </div>
      </div>
      {/* DM Side (Back) */}
      <div
        style={{
          position: 'absolute',
          left: isLarge ? '66mm' : '39mm',
          top: 0,
          width: cardWidth,
          height: cardHeight,
          border: '1px solid #333',
          borderRadius: '2mm',
          overflow: 'hidden',
          background: '#f3f3f3',
          boxShadow: '0 0 2mm #0002',
        }}
      >
        {isMonster ? (
          <MonsterInsertCard
            insert={insert}
            isLarge={isLarge}
            dmContentWidth={dmContentWidth}
            dmContentHeight={dmContentHeight}
          />
        ) : (
          <PlayerInsertCard
            insert={insert}
            dmContentWidth={dmContentWidth}
            dmContentHeight={dmContentHeight}
            preferences={preferences}
          />
        )}
      </div>
    </div>
  );
}
