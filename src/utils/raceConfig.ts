const darkvisionByRace: Record<string, number> = {
  'Dragonborn': 0,
  'Dwarf': 60,
  'Elf': 60,
  'Gnome': 60,
  'Goliath': 0,
  'Half-Elf': 60,
  'Half-Orc': 60,
  'Halfling': 0,
  'Human': 0,
  'Tabaxi': 60,
  'Tiefling': 60,
};

export function getDarkvisionForRace(race: string): number {
  return darkvisionByRace[race] ?? 0;
}
