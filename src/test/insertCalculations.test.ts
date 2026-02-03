import { describe, expect, it } from 'vitest';
import type { InsertInputs } from '../types/Insert';
import { calculateInsertValues } from '../utils/insertCalculations';

describe('insertCalculations', () => {
  describe('calculateInsertValues', () => {
    describe('Player calculations', () => {
      const basePlayerInputs: Partial<InsertInputs> = {
        cardType: 'player',
        name: 'Test Player',
        level: 5,
        class: 'Fighter',
        race: 'Human',
        str: 16,
        dex: 14,
        con: 15,
        int: 12,
        wis: 13,
        cha: 10,
        proficiencyBonus: 0,
        proficiencyBonusOverride: false,
        maxHPOverride: false,
        darkvisionOverride: false,
        skills: {
          acrobatics: { proficiency: 'none', modifier: 0 },
          animalHandling: { proficiency: 'none', modifier: 0 },
          arcana: { proficiency: 'none', modifier: 0 },
          athletics: { proficiency: 'proficient', modifier: 0 },
          deception: { proficiency: 'none', modifier: 0 },
          history: { proficiency: 'none', modifier: 0 },
          insight: { proficiency: 'none', modifier: 0 },
          intimidation: { proficiency: 'none', modifier: 0 },
          investigation: { proficiency: 'none', modifier: 0 },
          medicine: { proficiency: 'none', modifier: 0 },
          nature: { proficiency: 'none', modifier: 0 },
          perception: { proficiency: 'none', modifier: 0 },
          performance: { proficiency: 'none', modifier: 0 },
          persuasion: { proficiency: 'none', modifier: 0 },
          religion: { proficiency: 'none', modifier: 0 },
          sleightOfHand: { proficiency: 'none', modifier: 0 },
          stealth: { proficiency: 'none', modifier: 0 },
          survival: { proficiency: 'none', modifier: 0 },
        },
      };

      it('should calculate proficiency bonus for players', () => {
        const result = calculateInsertValues(basePlayerInputs as InsertInputs);
        expect(result.proficiencyBonus).toBe(3); // Level 5 = +3 proficiency
      });

      it('should not override existing proficiency bonus', () => {
        const inputs = { ...basePlayerInputs, proficiencyBonusOverride: true, proficiencyBonus: 5 };
        const result = calculateInsertValues(inputs as InsertInputs);
        expect(result.proficiencyBonus).toBe(5);
      });

      it('should calculate max HP for players', () => {
        const result = calculateInsertValues(basePlayerInputs as InsertInputs);
        // Fighter level 5, CON 15 (+2): 10 + 2 + (4 * (6 + 2)) = 44
        expect(result.hp).toBe(44);
      });

      it('should not override existing max HP', () => {
        const inputs = { ...basePlayerInputs, maxHPOverride: true, hp: 50 };
        const result = calculateInsertValues(inputs as InsertInputs);
        expect(result.hp).toBe(50);
      });

      it('should calculate skill values for players', () => {
        const result = calculateInsertValues(basePlayerInputs as InsertInputs);

        // Athletics: STR (16, +3) + proficient (+3) = +6
        expect(result.skills.athletics.value).toBe(6);

        // Acrobatics: DEX (14, +2) + none (0) = +2
        expect(result.skills.acrobatics.value).toBe(2);
      });

      it('should handle skill modifiers', () => {
        const inputs = {
          ...basePlayerInputs,
          skills: {
            ...basePlayerInputs.skills!,
            athletics: { proficiency: 'proficient' as const, modifier: 2 }, // Manual +2 bonus
          },
        };
        const result = calculateInsertValues(inputs as InsertInputs);

        // Athletics: STR (+3) + proficient (+3) + manual (+2) = +8
        expect(result.skills.athletics.value).toBe(8);
      });
    });

    describe('Monster calculations', () => {
      const baseMonsterInputs: Partial<InsertInputs> = {
        cardType: 'monster',
        name: 'Test Monster',
        str: 16,
        dex: 14,
        con: 15,
        int: 12,
        wis: 13,
        cha: 10,
        skills: {
          acrobatics: { proficiency: 'none', modifier: 0 },
          animalHandling: { proficiency: 'none', modifier: 0 },
          arcana: { proficiency: 'none', modifier: 0 },
          athletics: { proficiency: 'none', modifier: 5 }, // Pre-calculated
          deception: { proficiency: 'none', modifier: 0 },
          history: { proficiency: 'none', modifier: 0 },
          insight: { proficiency: 'none', modifier: 0 },
          intimidation: { proficiency: 'none', modifier: 0 },
          investigation: { proficiency: 'none', modifier: 0 },
          medicine: { proficiency: 'none', modifier: 0 },
          nature: { proficiency: 'none', modifier: 0 },
          perception: { proficiency: 'none', modifier: 0 },
          performance: { proficiency: 'none', modifier: 0 },
          persuasion: { proficiency: 'none', modifier: 0 },
          religion: { proficiency: 'none', modifier: 0 },
          sleightOfHand: { proficiency: 'none', modifier: 0 },
          stealth: { proficiency: 'none', modifier: 0 },
          survival: { proficiency: 'none', modifier: 0 },
        },
      };

      it('should use pre-calculated skill values for monsters with modifiers', () => {
        const result = calculateInsertValues(baseMonsterInputs as InsertInputs);

        // Athletics has a pre-calculated modifier of 5
        expect(result.skills.athletics.value).toBe(5);
      });

      it('should auto-calculate skill values for monsters with all zero modifiers', () => {
        const inputs = {
          ...baseMonsterInputs,
          proficiencyBonus: 3,
          skills: {
            ...baseMonsterInputs.skills!,
            athletics: { proficiency: 'proficient' as const, modifier: 0 }, // All modifiers are 0
          },
        };
        const result = calculateInsertValues(inputs as InsertInputs);

        // Athletics: STR (+3) + proficient (+3) = +6
        expect(result.skills.athletics.value).toBe(6);
      });
    });

    describe('Edge cases', () => {
      it('should handle missing ability scores', () => {
        const inputs: Partial<InsertInputs> = {
          cardType: 'player',
          name: 'Test',
          level: 1,
          class: 'Fighter',
          proficiencyBonus: 0,
          skills: {
            acrobatics: { proficiency: 'none', modifier: 0 },
            animalHandling: { proficiency: 'none', modifier: 0 },
            arcana: { proficiency: 'none', modifier: 0 },
            athletics: { proficiency: 'proficient', modifier: 0 },
            deception: { proficiency: 'none', modifier: 0 },
            history: { proficiency: 'none', modifier: 0 },
            insight: { proficiency: 'none', modifier: 0 },
            intimidation: { proficiency: 'none', modifier: 0 },
            investigation: { proficiency: 'none', modifier: 0 },
            medicine: { proficiency: 'none', modifier: 0 },
            nature: { proficiency: 'none', modifier: 0 },
            perception: { proficiency: 'none', modifier: 0 },
            performance: { proficiency: 'none', modifier: 0 },
            persuasion: { proficiency: 'none', modifier: 0 },
            religion: { proficiency: 'none', modifier: 0 },
            sleightOfHand: { proficiency: 'none', modifier: 0 },
            stealth: { proficiency: 'none', modifier: 0 },
            survival: { proficiency: 'none', modifier: 0 },
          },
        };

        const result = calculateInsertValues(inputs as InsertInputs);
        expect(result.proficiencyBonus).toBe(2); // Should still calculate proficiency
      });

      it('should preserve original input structure', () => {
        const inputs: Partial<InsertInputs> = {
          cardType: 'monster',
          name: 'Test Monster',
          cr: '5',
          hp: 68,
          hpFormula: '8d10 + 24',
          skills: {
            acrobatics: { proficiency: 'none', modifier: 0 },
            animalHandling: { proficiency: 'none', modifier: 0 },
            arcana: { proficiency: 'none', modifier: 0 },
            athletics: { proficiency: 'none', modifier: 0 },
            deception: { proficiency: 'none', modifier: 0 },
            history: { proficiency: 'none', modifier: 0 },
            insight: { proficiency: 'none', modifier: 0 },
            intimidation: { proficiency: 'none', modifier: 0 },
            investigation: { proficiency: 'none', modifier: 0 },
            medicine: { proficiency: 'none', modifier: 0 },
            nature: { proficiency: 'none', modifier: 0 },
            perception: { proficiency: 'none', modifier: 0 },
            performance: { proficiency: 'none', modifier: 0 },
            persuasion: { proficiency: 'none', modifier: 0 },
            religion: { proficiency: 'none', modifier: 0 },
            sleightOfHand: { proficiency: 'none', modifier: 0 },
            stealth: { proficiency: 'none', modifier: 0 },
            survival: { proficiency: 'none', modifier: 0 },
          },
        };

        const result = calculateInsertValues(inputs as InsertInputs);
        expect(result.name).toBe('Test Monster');
        expect(result.cr).toBe('5');
        expect(result.hp).toBe(68);
      });
    });
  });
});
