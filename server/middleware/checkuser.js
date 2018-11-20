import pool from '../databaseConnection/databaseConnection';

const checkuser = (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  const queryusers = `SELECT * FROM users WHERE id = ${id}`;
  pool.query(queryusers, (error, results) => {
    if (error) {
      return res.status(500).json({
        status: 500,
        success: false,
        error: 'Unable to get user by id'
      });
    }
    if (!results.rowCount) {
      return res.status(404).json({
        status: 404,
        success: false,
        error: 'The User with the given id was not found'
      });
    }
    return next();
  });
};

export default checkuser;
