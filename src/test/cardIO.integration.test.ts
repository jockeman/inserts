import { describe, expect, it } from 'vitest';
import { normalizeInsertInputs } from '../utils/inputNormalizer';

describe('cardIO integration', () => {
  describe('robust data handling', () => {
    it('should handle incomplete data from various sources', () => {
      // Simulate data that might come from localStorage or JSON import
      const incompleteData = [
        {
          name: 'Test Character',
          str: 15,
          // Missing many required fields like dex, con, skills, etc.
        },
        {
          name: 'Another Character',
          cardType: 'monster' as const,
          monsterType: 'Dragon' as const,
          // Missing ability scores and other fields
        },
      ];

      // Process each item through normalization (like the import process does)
      const normalizedData = incompleteData.map(normalizeInsertInputs);

      expect(normalizedData).toHaveLength(2);

      const firstCharacter = normalizedData[0];
      expect(firstCharacter.name).toBe('Test Character');
      expect(firstCharacter.str).toBe(15);
      // Verify defaults were applied
      expect(firstCharacter.dex).toBe(10);
      expect(firstCharacter.con).toBe(10);
      expect(firstCharacter.cardType).toBe('player');
      expect(firstCharacter.skills).toBeDefined();
      expect(firstCharacter.id).toBeDefined();

      const secondCharacter = normalizedData[1];
      expect(secondCharacter.name).toBe('Another Character');
      expect(secondCharacter.cardType).toBe('monster');
      expect(secondCharacter.monsterType).toBe('Dragon');
      // Verify defaults were applied for missing ability scores
      expect(secondCharacter.str).toBe(10);
      expect(secondCharacter.dex).toBe(10);
      expect(secondCharacter.con).toBe(10);
    });

    it('should handle completely empty objects', () => {
      const emptyData = [{}]; // Completely empty object

      const normalizedData = emptyData.map(normalizeInsertInputs);

      expect(normalizedData).toHaveLength(1);
      const character = normalizedData[0];

      // Verify all defaults are applied
      expect(character.name).toBe('');
      expect(character.cardType).toBe('player');
      expect(character.str).toBe(10);
      expect(character.dex).toBe(10);
      expect(character.con).toBe(10);
      expect(character.int).toBe(10);
      expect(character.wis).toBe(10);
      expect(character.cha).toBe(10);
      expect(character.skills).toBeDefined();
      expect(character.id).toBeDefined();
      expect(character.level).toBe(1);
      expect(character.race).toBe('Human');
      expect(character.class).toBe('Fighter');
    });

    it('should handle invalid ability score values', () => {
      const badData = [
        {
          name: 'Bad Stats Character',
          str: 'not a number' as any,
          dex: null as any,
          con: undefined,
          int: NaN,
          wis: 15, // This one is valid
          cha: -99, // Edge case, but valid number
        },
      ];

      const normalizedData = badData.map(normalizeInsertInputs);

      expect(normalizedData).toHaveLength(1);
      const character = normalizedData[0];

      // Invalid values should be normalized to 10
      expect(character.str).toBe(10);
      expect(character.dex).toBe(10);
      expect(character.con).toBe(10);
      expect(character.int).toBe(10);
      // Valid values should be preserved
      expect(character.wis).toBe(15);
      expect(character.cha).toBe(-99); // Valid number, even if unusual
    });
  });

  describe('normalizeInsertInputs', () => {
    it('should not crash with null or undefined input', () => {
      expect(() => normalizeInsertInputs(null as any)).not.toThrow();
      expect(() => normalizeInsertInputs(undefined as any)).not.toThrow();
      expect(() => normalizeInsertInputs({} as any)).not.toThrow();
    });

    it('should handle corrupted skills data', () => {
      const corruptedSkillsData = {
        name: 'Corrupted Skills',
        skills: 'not an object' as any,
      };

      const result = normalizeInsertInputs(corruptedSkillsData);
      expect(result.skills).toBeDefined();
      expect(typeof result.skills).toBe('object');
      expect(result.skills.athletics).toBeDefined();
      expect(result.skills.athletics.proficiency).toBe('none');
    });

    it('should preserve valid skill data while filling missing skills', () => {
      const partialSkillsData: any = {
        name: 'Partial Skills',
        skills: {
          athletics: { proficiency: 'proficient' as const, modifier: 0 },
          // Missing all other skills
        },
      };

      const result = normalizeInsertInputs(partialSkillsData);
      expect(result.skills.athletics.proficiency).toBe('proficient');
      expect(result.skills.acrobatics).toBeDefined();
      expect(result.skills.acrobatics.proficiency).toBe('none');
    });
  });
});
