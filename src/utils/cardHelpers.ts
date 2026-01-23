// Helper function to calculate ability modifier
export const calcModifier = (stat: string): string => {
  const value = parseInt(stat);
  if (isNaN(value)) return '';
  const modifier = Math.floor((value - 10) / 2);
  const sign = modifier >= 0 ? '+' : '';
  return `${value} (${sign}${modifier})`;
};

// Helper function to calculate only the modifier (for small cards)
export const calcModifierOnly = (stat: string): string => {
  const value = parseInt(stat);
  if (isNaN(value)) return '';
  const modifier = Math.floor((value - 10) / 2);
  const sign = modifier >= 0 ? '+' : '';
  return `${sign}${modifier}`;
};

// Helper function to format bonus with + sign
export const formatBonus = (bonus: string): string => {
  if (!bonus) return '';
  const trimmed = bonus.trim();
  if (trimmed.startsWith('+') || trimmed.startsWith('-')) return trimmed;
  return `+${trimmed}`;
};

// Calculate dimensions based on size
export const getCardDimensions = (isLarge: boolean) => ({
  containerWidth: isLarge ? '128mm' : '76mm',
  containerHeight: isLarge ? '89mm' : '77mm',
  cardWidth: isLarge ? '64mm' : '37mm',
  cardHeight: isLarge ? '89mm' : '77mm',
  playerOpeningWidth: isLarge ? '59mm' : '33mm',
  playerOpeningHeight: isLarge ? '83mm' : '43mm',
  playerOpeningTop: isLarge ? '3mm' : '4mm',
  dmContentWidth: isLarge ? '59mm' : '33mm',
  dmContentHeight: isLarge ? '85mm' : '73mm',
});
