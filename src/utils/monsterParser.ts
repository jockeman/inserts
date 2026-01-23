import { Insert } from '../types/Insert';

export function parseMonsterStatBlock(text: string): Partial<Insert> {
  const lines = text.split('\n').map(line => line.trim()).filter(line => line);
  
  const result: Partial<Insert> = {
    cardType: 'monster',
    size: 'small',
  };
  
  let currentSection = '';
  let traitsLines: string[] = [];
  let actionsLines: string[] = [];
  let bonusActionsLines: string[] = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Detect sections
    if (line === 'Actions') {
      currentSection = 'actions';
      continue;
    } else if (line === 'Bonus Actions') {
      currentSection = 'bonusActions';
      continue;
    } else if (line === 'Reactions') {
      currentSection = 'reactions';
      continue;
    }
    
    // Parse name (first line)
    if (i === 0) {
      result.name = line;
      continue;
    }
    
    // Parse type (second line, contains alignment)
    if (i === 1 && (line.includes('Humanoid') || line.includes('Beast') || line.includes('Dragon') || 
        line.includes('Undead') || line.includes('Fiend') || line.includes('Celestial') || 
        line.includes('Construct') || line.includes('Elemental') || line.includes('Fey') ||
        line.includes('Giant') || line.includes('Monstrosity') || line.includes('Ooze') || 
        line.includes('Plant') || line.includes('Aberration'))) {
      // Extract size and type separately
      const fullType = line.replace(/, (Any|Lawful|Neutral|Chaotic|Good|Evil|Unaligned).*$/i, '');
      // Try to extract size (Tiny, Small, Medium, Large, Huge, Gargantuan)
      const sizeMatch = fullType.match(/^(Tiny|Small|Medium|Large|Huge|Gargantuan)\s+/i);
      if (sizeMatch) {
        result.monsterSize = sizeMatch[1];
        result.monsterType = fullType.substring(sizeMatch[0].length);
      } else {
        result.monsterType = fullType;
      }
      continue;
    }
    
    // CR
    if (line.startsWith('CR ')) {
      const crMatch = line.match(/CR\s+([\d/]+)/);
      if (crMatch) result.cr = crMatch[1];
      continue;
    }
    
    // Armor Class
    if (line.startsWith('Armor Class ')) {
      result.ac = line.replace('Armor Class ', '');
      continue;
    }
    
    // Hit Points
    if (line.startsWith('Hit Points ')) {
      result.hp = line.replace('Hit Points ', '');
      continue;
    }
    
    // Speed
    if (line.startsWith('Speed ')) {
      result.speed = line.replace('Speed ', '');
      continue;
    }
    
    // Ability scores - look for lines with just the ability name
    if (line === 'STR' && i + 1 < lines.length) {
      const nextLine = lines[i + 1];
      const match = nextLine.match(/^(\d+)/);
      if (match) result.str = match[1];
      continue;
    }
    if (line === 'DEX' && i + 1 < lines.length) {
      const nextLine = lines[i + 1];
      const match = nextLine.match(/^(\d+)/);
      if (match) result.dex = match[1];
      continue;
    }
    if (line === 'CON' && i + 1 < lines.length) {
      const nextLine = lines[i + 1];
      const match = nextLine.match(/^(\d+)/);
      if (match) result.con = match[1];
      continue;
    }
    if (line === 'INT' && i + 1 < lines.length) {
      const nextLine = lines[i + 1];
      const match = nextLine.match(/^(\d+)/);
      if (match) result.int = match[1];
      continue;
    }
    if (line === 'WIS' && i + 1 < lines.length) {
      const nextLine = lines[i + 1];
      const match = nextLine.match(/^(\d+)/);
      if (match) result.wis = match[1];
      continue;
    }
    if (line === 'CHA' && i + 1 < lines.length) {
      const nextLine = lines[i + 1];
      const match = nextLine.match(/^(\d+)/);
      if (match) result.cha = match[1];
      continue;
    }
    
    // Saving Throws
    if (line.startsWith('Saving Throws ')) {
      result.savingThrows = line.replace('Saving Throws ', '');
      continue;
    }
    
    // Skills
    if (line.startsWith('Skills ')) {
      result.skills = line.replace('Skills ', '');
      continue;
    }
    
    // Damage Immunities
    if (line.startsWith('Damage Immunities ')) {
      result.damageImmunities = line.replace('Damage Immunities ', '');
      continue;
    }
    
    // Damage Resistances
    if (line.startsWith('Damage Resistances ')) {
      result.damageResistances = line.replace('Damage Resistances ', '');
      continue;
    }
    
    // Damage Vulnerabilities
    if (line.startsWith('Damage Vulnerabilities ')) {
      result.damageVulnerabilities = line.replace('Damage Vulnerabilities ', '');
      continue;
    }
    
    // Condition Immunities
    if (line.startsWith('Condition Immunities ')) {
      result.conditionImmunities = line.replace('Condition Immunities ', '');
      continue;
    }
    
    // Senses
    if (line.startsWith('Senses ')) {
      result.senses = line.replace('Senses ', '');
      continue;
    }
    
    // Languages
    if (line.startsWith('Languages ')) {
      result.languages = line.replace('Languages ', '');
      continue;
    }
    
    // Proficiency Bonus
    if (line.startsWith('Proficiency Bonus ')) {
      result.proficiencyBonus = line.replace('Proficiency Bonus ', '');
      continue;
    }
    
    // Skip XP and other non-stat lines
    if (line.includes('XP') || line.includes('Controller') || line.includes('Brute') || 
        line.includes('Skirmisher') || line.includes('Defender') || line.includes('Lurker') ||
        line.match(/^\d+\s*\([−\+\-\d]+\)$/)) {
      continue;
    }
    
    // Everything else goes into the appropriate section
    if (currentSection === 'actions') {
      actionsLines.push(line);
    } else if (currentSection === 'bonusActions') {
      bonusActionsLines.push(line);
    } else if (currentSection === '' && i > 5) {
      // After basic stats, before Actions section = traits
      traitsLines.push(line);
    }
  }
  
  if (traitsLines.length > 0) {
    result.traits = traitsLines.join('\n');
  }
  if (actionsLines.length > 0) {
    result.actions = actionsLines.join('\n');
  }
  if (bonusActionsLines.length > 0) {
    result.bonusActions = bonusActionsLines.join('\n');
  }
  
  return result;
}
