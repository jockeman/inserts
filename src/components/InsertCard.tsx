import React from 'react';

interface Insert {
  name: string;
  image: string;
  class: string;
  ac: string;
  hp: string;
  pp: string;
  pi: string;
}

interface InsertCardProps {
  insert: Insert;
  index: number;
}

export default function InsertCard({ insert, index }: InsertCardProps) {
  return (
    <div style={{
      width: '76mm', height: '79mm', margin: '2mm', display: 'inline-block',
      position: 'relative',
      pageBreakInside: 'avoid',
    }}>
      {/* Player Side (Front) */}
      <div style={{
        position: 'absolute', left: 0, top: 0, width: '37mm', height: '79mm',
        border: '1px solid #333', borderRadius: '2mm', overflow: 'hidden',
        background: '#f8f8f8', boxShadow: '0 0 2mm #0002',
      }}>
        <div style={{
          position: 'absolute', left: '2mm', top: '4mm',
          width: '33mm', height: '43mm', background: '#fff',
          border: '1px solid #bbb', borderRadius: '1mm', overflow: 'hidden',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center',
        }}>
          {insert.image && (
            <img src={insert.image} alt="character" style={{
              maxWidth: '100%', maxHeight: '70%', objectFit: 'contain',
            }} />
          )}
          <div style={{ fontWeight: 'bold', fontSize: '4mm', marginTop: '1mm', textAlign: 'center' }}>
            {insert.name || <span style={{ color: '#bbb' }}>Name</span>}
          </div>
        </div>
      </div>
      {/* DM Side (Back) */}
      <div style={{
        position: 'absolute', left: '39mm', top: 0, width: '37mm', height: '79mm',
        border: '1px solid #333', borderRadius: '2mm', overflow: 'hidden',
        background: '#f3f3f3', boxShadow: '0 0 2mm #0002',
      }}>
        <div style={{
          position: 'absolute', left: '2mm', top: 0,
          width: '33mm', height: '75mm', background: '#fff',
          border: '1px solid #bbb', borderRadius: '1mm', overflow: 'hidden',
          padding: '1mm', fontSize: '3.2mm', boxSizing: 'border-box',
        }}>
          <div style={{ fontWeight: 'bold', fontSize: '4mm', marginBottom: '1mm', textAlign: 'center' }}>{insert.name || 'Name'}</div>
          <div style={{ textAlign: 'center', marginBottom: '1mm', paddingBottom: '1mm', borderBottom: '1px solid #ccc' }}><b>{insert.class || '-'}</b></div>
          <div>AC: <b>{insert.ac || '-'}</b></div>
          <div>Max HP: <b>{insert.hp || '-'}</b></div>
          <div>PP: <b>{insert.pp || '-'}</b></div>
          <div>PI: <b>{insert.pi || '-'}</b></div>
        </div>
      </div>
    </div>
  );
}
