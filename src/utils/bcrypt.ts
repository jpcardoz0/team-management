import * as bcrypt from 'bcrypt';

export const encodePassword = (rawPassword: string): string => {
  const SALT = bcrypt.genSaltSync();
  return bcrypt.hashSync(rawPassword, SALT);
};

export const comparePassword = (rawPassword: string, hash: string): boolean => {
  return bcrypt.compareSync(rawPassword, hash);
};
