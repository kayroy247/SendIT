import parcels from '../models/parcels';
import users from '../models/users';
import inputValidator from '../validators/inputValidator';

const validateInput = inputValidator;

class ParcelController {
  static deleteParcel(req, res) {
    const { id } = req.params;
    const parcel = parcels.find(element => element.orderId === parseInt(id, 10));
    if (!parcel) {
      return res.status(404).json({
        success: false,
        error: 'The Parcel with the given id was not found.'
      });
    }
    const index = parcels.indexOf(parcel);
    parcels.splice(index, 1);
    return res.status(200).json({
      success: true,
      message: 'Parcel Delivery Order Successfully Deleted',
      data: parcel
    });
  }

  static createParcel(req, res) {
    const { error } = validateInput(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        error: error.details
      });
    }
    const parceldata = parcels;
    const { email } = req.body;
    const owner = users.find(element => element.email === email);
    if (!owner) {
      return res.status(404).json({
        success: true,
        error: 'User Not Found'
      });
    }
    const parcel = {
      orderId: parceldata[parceldata.length - 1].orderId + 1,
      userId: owner.userId,
      description: req.body.description,
      weight: req.body.weight,
      location: req.body.location,
      destination: req.body.destination,
      status: 'new'
    };
    parcels.push(parcel);
    return res.status(201).json({
      success: true,
      message: 'Parcel delivery order successfully created',
      data: parcel
    });
  }

  static cancelParcel(req, res) {
    const { id } = req.params;
    const parcel = parcels.find(element => element.orderId === parseInt(id, 10));
    if (!parcel) {
      return res.status(404).json({
        success: false,
        error: 'The Parcel with the given id was not found.'
      });
    }
    const { error } = validateInput(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        error: error.details[0].message
      });
    }
    const { email } = req.body;
    const user = users.find(c => c.email === email);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User Not Found'
      });
    }
    if (!(parcel.userId === user.userId)) {
      return res.status(403).json({
        success: false,
        error: 'Unauthorized Action, Not Completed'
      });
    }
    parcel.status = 'cancelled';
    return res.status(200).json({
      success: true,
      message: 'Parcel Delivery Order Successfully Cancelled',
      data: parcel
    });
  }

  static updateParcel(req, res) {
    const { id } = req.params;
    const parcel = parcels.find(element => element.orderId === parseInt(id, 10));
    if (!parcel) {
      return res.status(404).json({
        success: false,
        error: 'The Parcel with the given id was not found.'
      });
    }
    const { error } = validateInput(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        error: error.details[0].message
      });
    }
    parcel.destination = req.body.destination;
    parcel.weight = req.body.weight;
    return res.status(200).json({
      success: true,
      message: 'Parcel Delivery Order Successfully Updated',
      data: parcel
    });
  }

  static getParcelById(req, res) {
    const { id } = req.params;
    const parcel = parcels.find(element => element.orderId === parseInt(id, 10));
    if (!parcel) {
      return res.status(404).json({
        success: false,
        error: 'The Parcel with the given id was not found.'
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Parcel successfully fetched by ID',
      data: parcel
    });
  }

  static getAllParcels(req, res) {
    const allParcels = parcels;
    return res.status(200).json({
      success: true,
      message: 'All parcel delivery orders successfully fetched',
      data: allParcels
    });
  }
}

export default ParcelController;
