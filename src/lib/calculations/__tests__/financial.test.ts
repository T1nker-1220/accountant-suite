import { z } from 'zod';
import { financialUtils } from '../financial';

const {
  round,
  calculateNPV,
  calculateIRR,
  calculatePMT,
} = financialUtils;

describe('Financial Calculations', () => {
  describe('round', () => {
    it('should round to 2 decimal places by default', () => {
      expect(round(10.1234)).toBe(10.12);
      expect(round(10.1255)).toBe(10.13);
      expect(round(-10.1234)).toBe(-10.12);
    });

    it('should round to specified decimal places', () => {
      expect(round(10.1234, 3)).toBe(10.123);
      expect(round(10.1255, 1)).toBe(10.1);
      expect(round(-10.1234, 0)).toBe(-10);
    });
  });

  describe('calculateNPV', () => {
    it('should calculate NPV correctly', () => {
      const input = {
        value: 1000,
        rate: 0.1,
        cashFlows: [-1000, 200, 300, 400, 500],
        precision: 2
      };
      expect(calculateNPV(input)).toBe(70.72);
    });

    it('should handle negative cash flows', () => {
      const input = {
        value: 1000,
        rate: 0.1,
        cashFlows: [-1000, -200, 300, 400, 500],
        precision: 2
      };
      expect(calculateNPV(input)).toBe(-251.19);
    });

    it('should throw error for invalid input', () => {
      const input = {
        value: 1000,
        rate: -2, // Invalid rate
        cashFlows: [-1000, 200, 300],
        precision: 2
      };
      expect(() => calculateNPV(input)).toThrow(z.ZodError);
    });
  });

  describe('calculateIRR', () => {
    it('should calculate IRR correctly', () => {
      const input = {
        value: 1000,
        cashFlows: [-1000, 200, 300, 400, 500],
        precision: 2
      };
      expect(calculateIRR(input)).toBe(0.15);
    });

    it('should handle custom initial guess', () => {
      const input = {
        value: 1000,
        cashFlows: [-1000, 200, 300, 400, 500],
        guess: 0.2,
        precision: 2
      };
      expect(calculateIRR(input)).toBe(0.15);
    });

    it('should throw error for non-convergent cash flows', () => {
      const input = {
        value: 1000,
        cashFlows: [-1000, -2000, -3000],
        precision: 2
      };
      expect(() => calculateIRR(input)).toThrow('IRR calculation did not converge');
    });
  });

  describe('calculatePMT', () => {
    it('should calculate payment amount correctly', () => {
      const input = {
        value: 1000,
        rate: 0.1,
        periods: 12,
        presentValue: 1000,
        precision: 2
      };
      expect(calculatePMT(input)).toBe(-132.15);
    });

    it('should handle zero interest rate', () => {
      const input = {
        value: 1000,
        rate: 0,
        periods: 12,
        presentValue: 1000,
        precision: 2
      };
      expect(calculatePMT(input)).toBe(-83.33);
    });

    it('should handle beginning of period payments', () => {
      const input = {
        value: 1000,
        rate: 0.1,
        periods: 12,
        presentValue: 1000,
        type: 1 as 0 | 1,
        precision: 2
      };
      expect(calculatePMT(input)).toBe(-120.14);
    });

    it('should throw error for invalid input', () => {
      const input = {
        value: 1000,
        rate: 0.1,
        periods: -12, // Invalid negative periods
        presentValue: 1000,
        precision: 2
      };
      expect(() => calculatePMT(input)).toThrow(z.ZodError);
    });
  });
});
