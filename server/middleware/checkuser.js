import pool from '../databaseConnection/databaseConnection';

const checkUser = (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  const queryUsers = `SELECT * FROM users WHERE id = ${id}`;
  pool.query(queryUsers, (error, results) => {
    if (error) {
      return res.status(500).json({
        status: 500,
        success: false,
        error: 'Failed get user by id'
      });
    }
    if (!results.rows[0]) {
      return res.status(404).json({
        status: 404,
        success: false,
        error: 'The User with the given id was not found'
      });
    }
    return next();
  });
};

export default checkUser;
