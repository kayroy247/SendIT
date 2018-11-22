import bcrypt from 'bcrypt';

class Password {
  static async hashPassword(password) {
    const hash = await bcrypt.hashSync(password, 10);
    return hash;
  }

  static async comparePassword(password, hashedPassword) {
    const result = await bcrypt.compareSync(password, hashedPassword);
    return result;
  }
}
export default Password;
