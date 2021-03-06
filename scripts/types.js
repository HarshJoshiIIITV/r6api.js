const index = require('../index');
const { writeFileSync } = require('fs');
const { join } = require('path');
const constants = (new index()).constants;

/** Creates a string that corresponds to the declaration of a union type with the supplied elements
 * @param {(string|number)[]} elements The elements to create the string with
 * @param {boolean} noQuotes Whether to avoid putting quotes to create string union types (false by default)
 */

const createUnionType = (elements, noQuotes = false) =>
  noQuotes ? elements.join(' | ') : `'${elements.join("' | '")}'`;

const oldRankNumber = createUnionType(Object.keys(constants.OLD_RANKS), true);
const rankNumber = createUnionType(Object.keys(constants.RANKS), true);

const oldSeasonNumber = createUnionType(Object.keys(constants.OLD_SEASONS), true);
const seasonNumber = createUnionType(Object.keys(constants.SEASONS), true);

const operator = createUnionType(constants.OPERATORS.map(op => op.name).sort());

const weaponName = createUnionType(constants.WEAPONS.map(wp => wp.name).sort());
const weaponType = createUnionType(Object.values(constants.WEAPONTYPES).sort());

const file = `// This file is generated automatically by scripts/types-generate.ts, any edit to this file will be erased automatically
export type oldRankNumber = ${oldRankNumber}
export type rankNumber = ${rankNumber}

export type oldSeasonNumber = ${oldSeasonNumber}
export type seasonNumber = ${seasonNumber}

export type operator = ${operator}

export type weaponName = ${weaponName}
export type weaponType = ${weaponType}
`;

writeFileSync(join(__dirname, '../typings/autogen.ts'), file);
console.log('Type definitions have been updated.');

module.exports = {
  createUnionType
};
