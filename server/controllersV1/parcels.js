import parcels from '../modelsV1/parcles';
import users from '../modelsV1/users';
import inputValidator from '../validatorsV1/inputValidator';

const validateInput = inputValidator;

class ParcelController {
  static deleteParcel(req, res) {
    const parcel = parcels.find(x => x.orderId === parseInt(req.params.id, 10));
    if (!parcel) {
      res.status(404).json({
        error: 'The Parcel with the given id was not found.'
      });
      return;
    }
    const index = parcels.indexOf(parcel);
    parcels.splice(index, 1);
    res.status(200).json({
      message: 'Parcel Delivery Order Successfully Deleted',
      data: parcel
    });
  }

  static createParcel(req, res) {
    const { error } = validateInput(req.body);
    if (error) {
      res.status(400).json({
        error: error.details[0].message,
        message: 'Bad Request'
      });
      return;
    }
    const parceldata = parcels;
    const owner = users.find(c => c.email === req.body.email);
    if (!owner) {
      res.status(404).json({
        error: 'User Not Found'
      });
      return;
    }
    const parcel = {
      orderId: parceldata.length + 1,
      userId: owner.userId,
      description: req.body.description,
      weight: req.body.weight,
      location: req.body.location,
      destination: req.body.destination,
      status: 'new'
    };
    parcels.push(parcel);
    res.status(201).json({
      message: 'Parcel delivery order successfully created',
      data: parcel
    });
  }

  static cancelParcel(req, res) {
    const parcel = parcels.find(x => x.orderId === parseInt(req.params.id, 10));
    if (!parcel) {
      res.status(404).json({
        error: 'The Parcel with the given id was not found.'
      });
      return;
    }
    const { error } = validateInput(req.body);
    if (error) {
      res.status(400).json({
        error: error.details[0].message,
        message: 'Bad Request'
      });
      return;
    }
    const user = users.find(c => c.email === req.body.email);
    if (!user) {
      res.status(404).json({
        error: 'User Not Found'
      });
      return;
    }
    if (!(parcel.userId === user.userId)) {
      res.status(401).json({
        error: 'Unauthorized Action, Not Completed'
      });
      return;
    }
    parcel.status = 'cancelled';
    res.status(200).json({
      message: 'Parcel Delivery Order Successfully Cancelled',
      data: parcel
    });
  }

  static updateParcel(req, res) {
    const parcel = parcels.find(x => x.orderId === parseInt(req.params.id, 10));
    if (!parcel) {
      res.status(404).json({
        error: 'The Parcel with the given id was not found.'
      });
      return;
    }
    const { error } = validateInput(req.body);
    if (error) {
      res.status(400).json({
        error: error.details[0].message,
        message: 'Bad Request'
      });
      return;
    }
    parcel.destination = req.body.destination;
    parcel.weight = req.body.weight;
    res.status(200).json({
      message: 'Parcel Delivery Order Successfully Updated',
      data: parcel
    });
  }

  static getParcelById(req, res) {
    const parcel = parcels.find(x => x.orderId === parseInt(req.params.id, 10));
    if (!parcel) {
      res.status(404).json({
        error: 'The Parcel with the given id was not found.'
      });
      return;
    }
    res.status(200).json({
      message: 'Parcel by ID',
      data: parcel
    });
  }

  static getAllParcels(req, res) {
    const allParcels = parcels;
    res.status(200).json({
      message: 'These are parcel delivery orders',
      data: allParcels
    });
  }
}

export default ParcelController;
