interface ClassInfo {
  name: string;
  hitDie: number;
}

const CLASSES_DATA: ClassInfo[] = [
  { name: 'Barbarian', hitDie: 12 },
  { name: 'Bard', hitDie: 8 },
  { name: 'Cleric', hitDie: 8 },
  { name: 'Druid', hitDie: 8 },
  { name: 'Fighter', hitDie: 10 },
  { name: 'Monk', hitDie: 8 },
  { name: 'Paladin', hitDie: 10 },
  { name: 'Ranger', hitDie: 10 },
  { name: 'Rogue', hitDie: 8 },
  { name: 'Sorcerer', hitDie: 6 },
  { name: 'Warlock', hitDie: 8 },
  { name: 'Wizard', hitDie: 6 },
];

export const CLASSES = CLASSES_DATA.map(c => c.name);

export function getClassOptions() {
  return [
    { value: '', label: '-- Select --' },
    ...CLASSES_DATA.map(c => ({ value: c.name, label: c.name }))
  ];
}

export function getHitDieForClass(className: string): number {
  const classInfo = CLASSES_DATA.find(c => c.name === className);
  return classInfo?.hitDie ?? 8;
}
