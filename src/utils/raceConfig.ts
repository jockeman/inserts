export type RaceName =
  | 'Dragonborn'
  | 'Dwarf'
  | 'Elf'
  | 'Gnome'
  | 'Goliath'
  | 'Half-Elf'
  | 'Half-Orc'
  | 'Halfling'
  | 'Human'
  | 'Tabaxi'
  | 'Tiefling';

interface RaceInfo {
  name: RaceName;
  darkvision: number;
}

const RACES_DATA: RaceInfo[] = [
  { name: 'Dragonborn', darkvision: 0 },
  { name: 'Dwarf', darkvision: 60 },
  { name: 'Elf', darkvision: 60 },
  { name: 'Gnome', darkvision: 60 },
  { name: 'Goliath', darkvision: 0 },
  { name: 'Half-Elf', darkvision: 60 },
  { name: 'Half-Orc', darkvision: 60 },
  { name: 'Halfling', darkvision: 0 },
  { name: 'Human', darkvision: 0 },
  { name: 'Tabaxi', darkvision: 60 },
  { name: 'Tiefling', darkvision: 60 },
];

export const RACE_OPTIONS = [
  { value: '', label: '-- Select --' },
  ...RACES_DATA.map((r) => ({ value: r.name, label: r.name })),
];

export function getDarkvisionForRace(race: string): number {
  const raceInfo = RACES_DATA.find((r) => r.name === race);
  return raceInfo?.darkvision ?? 0;
}
