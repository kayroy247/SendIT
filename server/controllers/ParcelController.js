import pool from '../databaseConnection/databaseConnection';

class ParcelController {
  static deleteParcel(req, res) {
    const id = parseInt(req.params.id, 10);
    pool.query('DELETE FROM parcels WHERE id = $1', [id],
      (error, results) => {
        if (error) {
          return res.status(500).json({
            status: 500,
            success: false,
            error: 'Unable to delete parcel delivery order'
          });
        }
        return res.status(200).json({
          status: 200,
          message: 'Parcel delivery order successfully deleted',
          data: results.rows[0]
        });
      });
  }

  static createParcel(req, res) {
    const {
      userid,
      weight,
      weightmetric,
      sentOn,
      deliveredOn,
      pickupLocation,
      destination
    } = req.body;
    pool.query('INSERT INTO parcels (userid, weight, weightmetric, senton, deliveredon, pickuplocation, destination) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;',
      [userid, weight, weightmetric, sentOn,
        deliveredOn, pickupLocation, destination], (err, results) => {
        if (err) {
          return res.status(500).json({
            status: 500,
            success: false,
            error: err
          });
        } if (results.rowCount) {
          return res.status(201).json({
            status: 201,
            message: 'Parcel delivery Order successfully created',
            data: results.rows[0]
          });
        }
        return res.status(409).json({
          status: 409,
          success: false,
          error: 'Unable to create Parcel delivery order'
        });
      });
  }

  static cancelParcel(req, res) {
    const id = parseInt(req.params.id, 10);
    pool.query(
      'UPDATE parcels SET status = $1 WHERE id = $2 RETURNING *',
      ['cancelled', id],
      (error, results) => {
        if (error) {
          return res.status(500).json({
            status: 500,
            success: false,
            error: 'Unable to update parcel delivery order'
          });
        }
        return res.status(200).json({
          status: 200,
          message: 'parcel delivery order successfully cancelled',
          data: results.rows
        });
      }
    );
  }

  static updateParcel(req, res) {
    const id = parseInt(req.params.id, 10);
    const {
      destination
    } = req.body;
    pool.query(
      'UPDATE parcels SET destination = $1 WHERE id = $2 RETURNING *',
      [destination, id],
      (error, results) => {
        if (error) {
          return res.status(500).json({
            status: 500,
            success: false,
            error: 'Unable to update parcel delivery order'
          });
        }
        return res.status(200).json({
          status: 200,
          message: 'parcel delivery order Updated successfully',
          data: results.rows
        });
      }
    );
  }

  static updateStatus(req, res) {
    const id = parseInt(req.params.id, 10);
    const {
      status
    } = req.body;
    pool.query(
      'UPDATE parcels SET status = $1 WHERE id = $2 RETURNING *',
      [status, id],
      (error, results) => {
        if (error) {
          return res.status(500).json({
            status: 500,
            success: false,
            error: 'Failed to update status of parcel delivery order'
          });
        }
        return res.status(200).json({
          status: 200,
          message: 'parcel delivery order Updated successfully',
          data: results.rows
        });
      }
    );
  }

  static updateLocation(req, res) {
    const id = parseInt(req.params.id, 10);
    const {
      presentLocation
    } = req.body;
    pool.query(
      'UPDATE parcels SET currentlocation = $1 WHERE id = $2 RETURNING *',
      [presentLocation, id],
      (error, results) => {
        if (error) {
          return res.status(500).json({
            status: 500,
            success: false,
            error: 'Failed to update present Location of parcel delivery order'
          });
        }
        return res.status(200).json({
          status: 200,
          message: 'Present location of parcel delivery order Updated successfully',
          data: results.rows
        });
      }
    );
  }

  static getParcelById(req, res) {
    const id = parseInt(req.params.id, 10);
    const query = `SELECT * FROM parcels WHERE id = ${id}`;
    pool.query(query, (error, results) => {
      if (error) {
        return res.status(500).json({
          status: 500,
          success: false,
          error: 'Unable to get parcel by id'
        });
      }
      if (results.rowCount) {
        return res.status(200).json({
          status: 200,
          success: true,
          message: 'Successfully Fetched parcel by id',
          data: results.rows
        });
      }
      return res.status(404).json({
        status: 404,
        success: false,
        error: 'The parcel with the given id was not found'
      });
    });
  }

  static getAllParcels(req, res) {
    pool.query('SELECT * FROM parcels ORDER BY id ASC', (error, results) => {
      if (error) {
        return res.status(500).json({
          status: 500,
          success: false,
          error: 'Get All Parcels Failed'
        });
      }
      return res.status(200).json({
        status: 200,
        success: true,
        message: 'Successfully Fetched All Parcel Delivery orders',
        data: results.rows
      });
    });
  }
}

export default ParcelController;
