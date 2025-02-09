/**
 * Financial Calculations Utility
 * Provides core financial calculations with TypeScript support and validation.
 */

import { all, create } from 'mathjs';
import { z } from 'zod';

// Initialize math.js with all functions
const math = create(all);

// Type definitions for financial calculations
export interface FinancialInput {
  value: number;
  precision?: number;
}

export interface NPVInput extends FinancialInput {
  rate: number;
  cashFlows: number[];
}

export interface IRRInput extends FinancialInput {
  cashFlows: number[];
  guess?: number;
}

export interface PMTInput extends FinancialInput {
  rate: number;
  periods: number;
  presentValue: number;
  futureValue?: number;
  type?: 0 | 1; // 0: end of period, 1: beginning of period
}

// Validation schemas
export const financialInputSchema = z.object({
  value: z.number().positive(),
  precision: z.number().int().min(0).max(10).optional().default(2),
});

export const npvInputSchema = financialInputSchema.extend({
  rate: z.number().min(-1),
  cashFlows: z.array(z.number()).min(1),
});

export const irrInputSchema = financialInputSchema.extend({
  cashFlows: z.array(z.number()).min(2),
  guess: z.number().optional().default(0.1),
});

export const pmtInputSchema = financialInputSchema.extend({
  rate: z.number().min(-1),
  periods: z.number().int().positive(),
  presentValue: z.number(),
  futureValue: z.number().optional().default(0),
  type: z.union([z.literal(0), z.literal(1)]).optional().default(0),
});

/**
 * Rounds a number to specified decimal places
 * @param value - The number to round
 * @param precision - Number of decimal places (default: 2)
 */
export const round = (value: number, precision: number = 2): number => {
  return Number(math.round(value, precision));
};

/**
 * Calculates Net Present Value (NPV)
 * @param input - NPV calculation parameters
 * @returns Rounded NPV value
 */
export const calculateNPV = (input: NPVInput): number => {
  const { rate, cashFlows, precision = 2 } = npvInputSchema.parse(input);

  let npv = 0;
  for (let i = 0; i < cashFlows.length; i++) {
    npv += cashFlows[i] / Math.pow(1 + rate, i);
  }

  return round(npv, precision);
};

/**
 * Calculates Internal Rate of Return (IRR)
 * @param input - IRR calculation parameters
 * @returns Rounded IRR value
 */
export const calculateIRR = (input: IRRInput): number => {
  const { cashFlows, guess = 0.1, precision = 2 } = irrInputSchema.parse(input);

  // Newton-Raphson method for IRR calculation
  let rate = guess;
  const maxIterations = 100;
  const tolerance = 1e-7;

  for (let i = 0; i < maxIterations; i++) {
    let npv = 0;
    let derivative = 0;

    for (let j = 0; j < cashFlows.length; j++) {
      const factor = Math.pow(1 + rate, j);
      npv += cashFlows[j] / factor;
      if (j > 0) {
        derivative -= (j * cashFlows[j]) / (factor * (1 + rate));
      }
    }

    const newRate = rate - npv / derivative;
    if (Math.abs(newRate - rate) < tolerance) {
      return round(newRate, precision);
    }
    rate = newRate;
  }

  throw new Error('IRR calculation did not converge');
};

/**
 * Calculates Payment Amount (PMT)
 * @param input - PMT calculation parameters
 * @returns Rounded payment amount
 */
export const calculatePMT = (input: PMTInput): number => {
  const {
    rate,
    periods,
    presentValue,
    futureValue = 0,
    type = 0,
    precision = 2
  } = pmtInputSchema.parse(input);

  if (rate === 0) {
    return round(-1 * (presentValue + futureValue) / periods, precision);
  }

  const pvif = Math.pow(1 + rate, periods);
  let pmt = (rate * (presentValue * pvif + futureValue)) / (pvif - 1);

  if (type === 1) {
    pmt = pmt / (1 + rate);
  }

  return round(pmt, precision);
};

// Export utility functions
export const financialUtils = {
  round,
  calculateNPV,
  calculateIRR,
  calculatePMT,
};

export default financialUtils;
