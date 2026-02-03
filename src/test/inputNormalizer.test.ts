import { describe, expect, it } from 'vitest';
import type { CardType, MonsterSize, MonsterType } from '../types/Insert';
import { normalizeInsertInputs, safeAbilityScore, safeNumericValue } from '../utils/inputNormalizer';
import { createEmptySkills } from '../utils/skillHelpers';

describe('inputNormalizer', () => {
  describe('safeAbilityScore', () => {
    it('returns the value when it is a valid number', () => {
      expect(safeAbilityScore(15)).toBe(15);
      expect(safeAbilityScore(8)).toBe(8);
      expect(safeAbilityScore(20)).toBe(20);
    });

    it('returns 10 for undefined values', () => {
      expect(safeAbilityScore(undefined)).toBe(10);
    });

    it('returns 10 for null values', () => {
      expect(safeAbilityScore(null)).toBe(10);
    });

    it('returns 10 for NaN values', () => {
      expect(safeAbilityScore(NaN)).toBe(10);
    });

    it('returns 10 for string values', () => {
      expect(safeAbilityScore('hello' as never)).toBe(10);
    });
  });

  describe('safeNumericValue', () => {
    it('returns the value when it is a valid number', () => {
      expect(safeNumericValue(42, 0)).toBe(42);
      expect(safeNumericValue(0, 5)).toBe(0);
      expect(safeNumericValue(100, 10)).toBe(100);
    });

    it('returns the default for undefined values', () => {
      expect(safeNumericValue(undefined, 15)).toBe(15);
      expect(safeNumericValue(undefined, 0)).toBe(0);
    });

    it('returns the default for null values', () => {
      expect(safeNumericValue(null, 25)).toBe(25);
    });

    it('returns the default for NaN values', () => {
      expect(safeNumericValue(NaN, 33)).toBe(33);
    });

    it('returns the default for string values', () => {
      expect(safeNumericValue('invalid' as never, 77)).toBe(77);
    });
  });

  describe('normalizeInsertInputs', () => {
    it('returns a complete object with all required fields for empty input', () => {
      const result = normalizeInsertInputs({});

      // Check that all required fields exist
      expect(result.name).toBe('');
      expect(result.image).toBe('');
      expect(result.cardType).toBe('player');
      expect(result.size).toBe('small');
      expect(result.race).toBe('Human');
      expect(result.class).toBe('Fighter');
      expect(result.ac).toBe(0);
      expect(result.hp).toBe(0);
      expect(result.senses).toEqual({});
      expect(result.level).toBe(1);

      // Check ability scores
      expect(result.str).toBe(10);
      expect(result.dex).toBe(10);
      expect(result.con).toBe(10);
      expect(result.int).toBe(10);
      expect(result.wis).toBe(10);
      expect(result.cha).toBe(10);

      // Check skills exist
      expect(result.skills).toBeDefined();
      expect(typeof result.skills).toBe('object');

      // Check that ID is generated
      expect(result.id).toBeTruthy();
      expect(typeof result.id).toBe('string');
    });

    it('preserves existing valid values', () => {
      const input = {
        name: 'Test Character',
        str: 18,
        dex: 14,
        con: 16,
        int: 12,
        wis: 13,
        cha: 15,
        level: 5,
        hp: 45,
        ac: 15,
        cardType: 'monster' as CardType,
      };

      const result = normalizeInsertInputs(input);

      expect(result.name).toBe('Test Character');
      expect(result.str).toBe(18);
      expect(result.dex).toBe(14);
      expect(result.con).toBe(16);
      expect(result.int).toBe(12);
      expect(result.wis).toBe(13);
      expect(result.cha).toBe(15);
      expect(result.level).toBe(5);
      expect(result.hp).toBe(45);
      expect(result.ac).toBe(15);
      expect(result.cardType).toBe('monster');
    });

    it('fills in missing ability scores with default value 10', () => {
      const input = {
        name: 'Partial Character',
        str: 15,
        // Missing dex, con, int, wis, cha
      };

      const result = normalizeInsertInputs(input);

      expect(result.str).toBe(15);
      expect(result.dex).toBe(10);
      expect(result.con).toBe(10);
      expect(result.int).toBe(10);
      expect(result.wis).toBe(10);
      expect(result.cha).toBe(10);
    });

    it('handles invalid/undefined ability scores', () => {
      const input = {
        str: undefined,
        dex: null as any,
        con: NaN,
        int: 'invalid' as never,
        wis: 14, // Valid
        cha: 0, // Valid (though low)
      };

      const result = normalizeInsertInputs(input);

      expect(result.str).toBe(10);
      expect(result.dex).toBe(10);
      expect(result.con).toBe(10);
      expect(result.int).toBe(10);
      expect(result.wis).toBe(14);
      expect(result.cha).toBe(0);
    });

    it('creates empty skills when missing', () => {
      const input = { name: 'No Skills Character' };

      const result = normalizeInsertInputs(input);

      expect(result.skills).toBeDefined();
      expect(result.skills).toEqual(createEmptySkills());
    });

    it('preserves existing skills', () => {
      const customSkills = createEmptySkills();
      customSkills.athletics.proficiency = 'proficient';
      customSkills.acrobatics.proficiency = 'expert';

      const input = {
        name: 'Skilled Character',
        skills: customSkills,
      };

      const result = normalizeInsertInputs(input);

      expect(result.skills.athletics.proficiency).toBe('proficient');
      expect(result.skills.acrobatics.proficiency).toBe('expert');
    });

    it('handles monster-specific fields', () => {
      const input = {
        cardType: 'monster' as CardType,
        monsterSize: 'Large' as MonsterSize,
        monsterType: 'Dragon' as MonsterType,
        cr: '5',
        speed: '30 ft., fly 60 ft.',
      };

      const result = normalizeInsertInputs(input);

      expect(result.cardType).toBe('monster');
      expect(result.monsterSize).toBe('Large');
      expect(result.monsterType).toBe('Dragon');
      expect(result.cr).toBe('5');
      expect(result.speed).toBe('30 ft., fly 60 ft.');
    });

    it('handles arrays properly', () => {
      const input = {
        damageImmunities: ['fire', 'cold'],
        damageResistances: ['bludgeoning'],
        damageVulnerabilities: ['thunder'],
      };

      const result = normalizeInsertInputs(input);

      expect(result.damageImmunities).toEqual(['fire', 'cold']);
      expect(result.damageResistances).toEqual(['bludgeoning']);
      expect(result.damageVulnerabilities).toEqual(['thunder']);
    });

    it('provides empty arrays for missing array fields', () => {
      const input = { name: 'Basic Character' };

      const result = normalizeInsertInputs(input);

      expect(result.damageImmunities).toEqual([]);
      expect(result.damageResistances).toEqual([]);
      expect(result.damageVulnerabilities).toEqual([]);
      expect(result.conditionImmunities).toEqual([]);
      expect(result.languages).toBe('');
      expect(result.senses).toBe('');
    });

    it('handles boolean overrides correctly', () => {
      const input = {
        proficiencyBonusOverride: false,
        maxHPOverride: false,
      };

      const result = normalizeInsertInputs(input);

      expect(result.proficiencyBonusOverride).toBe(false);
      expect(result.maxHPOverride).toBe(false);
    });

    it('provides default false values for missing boolean overrides', () => {
      const input = { name: 'Basic Character' };

      const result = normalizeInsertInputs(input);

      expect(result.proficiencyBonusOverride).toBe(false);
      expect(result.maxHPOverride).toBe(false);
    });
  });
});
