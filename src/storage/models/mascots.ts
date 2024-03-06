/**
 * Mascot model
 * @property {number} mascot_id - The ID of the mascot
 * @property {string} name - The name of the mascot
 * @property {string} organization - The organization the mascot represents
 * @property {number} birth_year - The year the mascot was created
 */
export default interface Mascot {
  mascot_id?: number;
  name: string;
  organization: string;
  birth_year: number;
}