import { GiShield, GiCampingTent } from 'react-icons/gi';
import { 
  FaHeart, FaEye, FaBrain, FaSearch, FaLeaf, FaUserSecret, FaBook, FaMoon,
  FaDumbbell, FaHandPaper, FaTheaterMasks, FaComments, FaScroll, FaHandRock,
  FaBriefcaseMedical, FaMusic, FaPray, FaPaw
} from 'react-icons/fa';
import { Insert } from '../types/Insert';
import { UserPreferences } from '../types/UserPreferences';
import { getVisibleSkills } from '../utils/skillConfig';

interface PlayerInsertCardProps {
  insert: Insert;
  dmContentWidth: string;
  dmContentHeight: string;
  preferences: UserPreferences;
}

const skillIcons: Record<string, React.ElementType> = {
  acrobatics: FaDumbbell,
  animalHandling: FaPaw,
  arcana: FaBook,
  athletics: FaDumbbell,
  deception: FaTheaterMasks,
  history: FaScroll,
  insight: FaBrain,
  intimidation: FaHandRock,
  investigation: FaSearch,
  medicine: FaBriefcaseMedical,
  nature: FaLeaf,
  perception: FaEye,
  performance: FaMusic,
  persuasion: FaComments,
  religion: FaPray,
  sleightOfHand: FaHandPaper,
  stealth: FaUserSecret,
  survival: GiCampingTent,
};

export default function PlayerInsertCard({ insert, dmContentWidth, dmContentHeight, preferences }: PlayerInsertCardProps) {
  const visibleSkills = getVisibleSkills(preferences);
  
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
        
        {visibleSkills.map(([skillKey, skillInfo]) => {
          const Icon = skillIcons[skillKey] || FaPaw;
          const value = insert[skillInfo.passiveField] as string;
          return (
            <div key={skillKey} style={{ display: 'flex', alignItems: 'center', gap: '1mm' }}>
              <Icon size="4.5mm" />
              <b>{value || '-'}</b>
            </div>
          );
        })}
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
