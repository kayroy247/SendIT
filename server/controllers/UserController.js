import pool from '../databaseConnection/databaseConnection';
import Password from '../helpers/cryptPassword';

class UserController {
  static deleteUser(req, res) {
    const id = parseInt(req.params.id, 10);
    pool.query('DELETE FROM users WHERE id = $1', [id],
      (error, results) => {
        if (error) {
          return res.status(500).json({
            status: 500,
            success: false,
            error: 'Unable to delete user Account'
          });
        }
        return res.status(200).json({
          status: 200,
          message: 'User Account successfully deleted',
          data: results.rows[0]
        });
      });
  }

  static createUser(req, res) {
    const {
      firstname,
      lastname,
      email,
      username,
      password
    } = req.body;

    const hashedPassword = Password.hashPassword(password);
    pool.query('INSERT INTO users (firstname, lastname, email, username, password) VALUES ($1, $2, $3, $4, $5)',
      [firstname, lastname, email, username, hashedPassword], (error, results) => {
        if (error) {
          return res.status(500).json({
            status: 500,
            success: false,
            error: 'Internal server error'
          });
        } if (results.rowCount) {
          return res.status(201).json({
            status: 201,
            message: 'User Account successfully created',
            data: results.rows[0]
          });
        }
        return res.status(409).json({
          status: 409,
          success: false,
          error: 'Unable to create User account'
        });
      });
  }

  static updateUser(req, res) {
    const id = parseInt(req.params.id, 10);
    const {
      firstname,
      lastname
    } = req.body;
    pool.query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3',
      [firstname, lastname, id],
      (error, results) => {
        if (error) {
          return res.status(500).json({
            status: 500,
            success: false,
            error: 'Internal server error'
          });
        }
        return res.status(200).json({
          status: 204,
          message: 'User information Updated successfully',
          data: results.rows[0]
        });
      }
    );
  }

  static getUserParcels(req, res) {
    const id = parseInt(req.params.id, 10);
    const query = `SELECT * FROM parcels WHERE userid = ${id}`;
    pool.query(query, (error, results) => {
      if (error) {
        return res.status(500).json({
          status: 500,
          success: false,
          error: 'Internal server error'
        });
      }
      if (results.rowCount) {
        return res.status(200).json({
          status: 200,
          success: true,
          message: 'Successfully Fetched all parcels by user',
          data: results.rows
        });
      }
      return res.status(404).json({
        status: 404,
        success: false,
        error: 'The parcels by the user was not found'
      });
    });
  }

  static getUserById(req, res) {
    const id = parseInt(req.params.id, 10);
    const query = `SELECT * FROM users WHERE id = ${id}`;
    pool.query(query, (error, results) => {
      if (error) {
        return res.status(500).json({
          status: 500,
          success: false,
          error: 'Unable to get user by id'
        });
      }
      if (results.rowCount) {
        return res.status(200).json({
          status: 200,
          success: true,
          message: 'Successfully Fetched user by id',
          data: results.rows
        });
      }
      return res.status(404).json({
        status: 404,
        success: false,
        error: 'The User with the given id was not found'
      });
    });
  }

  static getAllUsers(req, res) {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
      if (error) {
        return res.status(500).json({
          status: 500,
          success: false,
          error: 'Get All Users Failed'
        });
      }
      return res.status(200).json({
        status: 200,
        success: true,
        message: 'Successfully Fetched All Users',
        data: results.rows
      });
    });
  }
}

export default UserController;
