import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import Password from '../helpers/cryptPassword';
import pool from '../databaseConnection/databaseConnection';

config();

const jwtKey = process.env.JWT_KEY;

class AuthController {
  static signUp(req, res) {
    const {
      firstname,
      lastname,
      email,
      username,
      password
    } = req.body;
    const hashedPassword = Password.hashPassword(password);
    pool.query('INSERT INTO users (firstname, lastname, email, username, password) VALUES ($1, $2, $3, $4, $5) RETURNING id, firstname, lastname, email, isadmin',
      [firstname, lastname, email, username, hashedPassword], (error, results) => {
        if (error) {
          return res.status(409).json({
            status: 409,
            success: false,
            error: 'Email Already exist'
          });
        }
        return res.status(201).json({
          status: 201,
          success: true,
          message: 'User Account successfully created',
          data: results.rows
        });
      });
  }

  static login(req, res) {
    const {
      email,
      password
    } = req.body;
    pool.query('SELECT * FROM users WHERE email = $1', [email], (error, results) => {
      if (error) {
        return res.status(404).json({
          status: 404,
          error: 'The email does not exist'
        });
      }
      const { id, isadmin } = results.rows[0];
      const dbEmail = results.rows[0];
      const hashedPassword = results.rows[0].password;
      if (results) {
        const comparePassword = Password.comparePassword(password, hashedPassword);
        if (comparePassword) {
          const jwtToken = jwt.sign({ id, dbEmail, isadmin }, jwtKey, { expiresIn: '24h' });
          return res.status(200).json({
            status: 200,
            success: true,
            message: 'Authentication successful',
            data: {
              userId: id,
              userEmail: email
            },
            token: jwtToken
          });
        }
        return res.status(401).json({
          status: 401,
          success: false,
          error: 'Login Failed, wrong password'
        });
      }
      return res.status(401).json({
        status: 401,
        success: false,
        error: 'The email does not exist'
      });
    });
  }
}

export default AuthController;
