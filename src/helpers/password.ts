import * as bcrypt from 'bcrypt';

export const hashPassword = async (password: string) =>
  await bcrypt.hash(password, 12);

export const comparePasswords = async (
  entry: string,
  test: string,
): Promise<boolean> => {
  return await bcrypt.compare(entry, test);
};
