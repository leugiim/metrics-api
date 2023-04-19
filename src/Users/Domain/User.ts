export interface User {
  id: string;
  username: string;
  password: string;
}

export const comparePassword = async (user: User, password: string) => {
  const isMatch = await (password === user.password);
  return isMatch;
};
