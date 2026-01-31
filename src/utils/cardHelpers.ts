import { calculateModifier } from './passiveCalculator';

// Helper function to calculate ability modifier
export const formatModifier = (stat: number): string => {
  if (Number.isNaN(stat)) return '';
  const modifier = calculateModifier(stat);
  const sign = modifier >= 0 ? '+' : '';
  return `${stat} (${sign}${modifier})`;
};

// Helper function to calculate only the modifier (for small cards)
export const formatModifierOnly = (stat: number): string => {
  if (Number.isNaN(stat)) return '';
  const modifier = calculateModifier(stat);
  const sign = modifier >= 0 ? '+' : '';
  return `${sign}${modifier}`;
};

// Helper function to format bonus with + sign
export const formatBonus = (bonus: number | string): string => {
  if (bonus === 0 || !bonus) return '';
  const value = typeof bonus === 'number' ? bonus : Number.parseInt(bonus.trim(), 10);
  if (Number.isNaN(value)) return '';
  return value >= 0 ? `+${value}` : `${value}`;
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
