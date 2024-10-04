import bcrypt from "bcryptjs";

export const saltAndHashPassword = async (
  password: string,
): Promise<string> => {
  const salt = await bcrypt.genSalt(12);
  const hash = await bcrypt.hash(password, salt);

  return hash;
};
