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
            error: 'Failed to delete user Account'
          });
        }
        return res.status(201).json({
          status: 201,
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
    pool.query('INSERT INTO users (firstname, lastname, email, username, password, isadmin) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, firstname, lastname, email, isadmin',
      [firstname, lastname, email, username, hashedPassword, true], (error, results) => {
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

  static updateUser(req, res) {
    const id = parseInt(req.params.id, 10);
    const {
      firstname,
      lastname
    } = req.body;
    pool.query(
      'UPDATE users SET firstname= $1, lastname = $2 WHERE id = $3 RETURNING id,firstname,lastname;',
      [firstname, lastname, id],
      (error, results) => {
        if (error) {
          return res.status(500).json({
            status: 500,
            success: false,
            error: 'Failed to update user information'
          });
        }
        return res.status(200).json({
          status: 200,
          message: 'User information Updated successfully',
          data: results.rows
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
          error: 'Failed to get User parcels'
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
        error: 'The user has no parcel delivery order'
      });
    });
  }

  static getUserById(req, res) {
    const id = parseInt(req.params.id, 10);
    const query = `SELECT id, firstname, lastname, email, username  FROM users WHERE id = ${id}`;
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
    pool.query('SELECT id, firstname, lastname, email, username, isadmin  FROM users ORDER BY id ASC', (error, results) => {
      if (error) {
        return res.status(500).json({
          status: 500,
          success: false,
          error: 'Failed to Get all users'
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
