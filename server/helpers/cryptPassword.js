import bcrypt from 'bcrypt';

class Password {
  static hashPassword(password) {
    const hash = bcrypt.hashSync(password, 10);
    return hash;
  }

  static comparePassword(password, hashedPassword) {
    const result = bcrypt.compareSync(password, hashedPassword);
    return result;
  }
}
export default Password;
