/**
 * Pads any number below 10 above -1 with a zero before it.
 * @param {*} n
 * @returns
 */
export const padLeft = (n) => (n < 10 && n >= 0 ? `0${n || 0}` : n);
