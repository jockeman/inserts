import { GiShield, GiCampingTent } from 'react-icons/gi';
import { FaHeart, FaEye, FaBrain, FaSearch, FaLeaf, FaUserSecret, FaBook, FaMoon } from 'react-icons/fa';
import { Insert } from '../types/Insert';

interface PlayerInsertCardProps {
  insert: Insert;
  dmContentWidth: string;
  dmContentHeight: string;
}

export default function PlayerInsertCard({ insert, dmContentWidth, dmContentHeight }: PlayerInsertCardProps) {
  return (
    <div style={{
      position: 'absolute', left: '2mm', top: 0,
      width: dmContentWidth, height: dmContentHeight, background: '#fff',
      border: '1px solid #bbb', borderRadius: '1mm', overflow: 'hidden',
      padding: '1mm', fontSize: '3.2mm', boxSizing: 'border-box',
    }}>
      <div style={{ fontWeight: 'bold', fontSize: '4mm', marginBottom: '0.5mm', textAlign: 'center' }}>
        {insert.name || 'Name'}
      </div>
      
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
  );
}
