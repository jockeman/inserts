import { GiShield, GiCampingTent } from 'react-icons/gi';
import { FaHeart, FaEye, FaBrain, FaSearch, FaLeaf, FaUserSecret, FaBook, FaMoon } from 'react-icons/fa';
import { Insert } from '../types/Insert';

interface InsertCardProps {
  insert: Insert;
  index: number;
}

export default function InsertCard({ insert }: InsertCardProps) {
  return (
    <div style={{
      width: '76mm', height: '77mm', margin: '2mm', display: 'inline-block',
      position: 'relative',
      pageBreakInside: 'avoid',
    }}>
      {/* Player Side (Front) */}
      <div style={{
        position: 'absolute', left: 0, top: 0, width: '37mm', height: '77mm',
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
        position: 'absolute', left: '39mm', top: 0, width: '37mm', height: '77mm',
        border: '1px solid #333', borderRadius: '2mm', overflow: 'hidden',
        background: '#f3f3f3', boxShadow: '0 0 2mm #0002',
      }}>
        <div style={{
          position: 'absolute', left: '2mm', top: 0,
          width: '33mm', height: '73mm', background: '#fff',
          border: '1px solid #bbb', borderRadius: '1mm', overflow: 'hidden',
          padding: '1mm', fontSize: '3.2mm', boxSizing: 'border-box',
        }}>
          <div style={{ fontWeight: 'bold', fontSize: '4mm', marginBottom: '1mm', textAlign: 'center' }}>{insert.name || 'Name'}</div>
          <div style={{ textAlign: 'center', marginBottom: '1mm', paddingBottom: '1mm', borderBottom: '1px solid #ccc', fontSize: '3mm' }}>
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '1mm' }}>
              <FaEye size="4.5mm" />
              <b>{insert.perception || '-'}</b>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1mm' }}>
              <FaBrain size="4.5mm" />
              <b>{insert.insight || '-'}</b>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1mm' }}>
              <FaSearch size="4.5mm" />
              <b>{insert.investigation || '-'}</b>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1mm' }}>
              <FaBook size="4.5mm" />
              <b>{insert.arcana || '-'}</b>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1mm' }}>
              <FaLeaf size="4.5mm" />
              <b>{insert.nature || '-'}</b>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1mm' }}>
              <GiCampingTent size="4.5mm" />
              <b>{insert.survival || '-'}</b>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1mm' }}>
              <FaUserSecret size="4.5mm" />
              <b>{insert.stealth || '-'}</b>
            </div>
            {insert.darkvision && parseInt(insert.darkvision) > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '1mm' }}>
                <FaMoon size="4.5mm" />
                <b>{insert.darkvision}ft</b>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
