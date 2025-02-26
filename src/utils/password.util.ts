/* eslint-disable no-console */
import * as bcrypt from 'bcrypt';

/**
 * Password class provides methods for hashing and comparing passwords using the bcrypt library.
 * @link https://docs.nestjs.com/security/encryption-and-hashing
 * @link https://www.npmjs.com/package/bcrypt
 */
class PasswordUtil {
  private saltRounds: number = 10; // Go through 2^saltRounds hashing iterations
  private salt: string = bcrypt.genSaltSync(this.saltRounds);

  /**
   * Hashes a plain text password.
   * @param {string} password - The plain text password to hash.
   */
  hash(password: string): string {
    try {
      return bcrypt.hashSync(password, this.salt);
    } catch (error) {
      console.error(error);
      throw new Error('Can not hash password.');
    }
  }

  /**
   * Compare/check a plain text password with a hashed password.
   *
   * @param {string} password - The plain text password to compare.
   * @param {string} hash - The hashed password to compare against. (get from database)
   */
  isMatch(password: string, hash: string): boolean {
    try {
      return bcrypt.compareSync(password, hash);
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}

export const passwordUtil = new PasswordUtil();
