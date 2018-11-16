import parcels from '../models/parcels';
import users from '../models/users';
import userValidator from '../validators/userValidator';

const validateInput = userValidator;


class UserController {
  static deleteUser(req, res) {
    const { id } = req.params;
    const user = users.find(element => element.userId === parseInt(id, 10));
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'The User with the given id was not found.'
      });
    }
    const index = users.indexOf(user);
    users.splice(index, 1);
    return res.status(200).json({
      success: true,
      message: 'User Successfully Deleted',
      data: user
    });
  }

  static createUser(req, res) {
    const allUsers = users;
    const { email } = req.body;
    const newUser = users.find(c => c.email === email);
    if (newUser) {
      return res.status(404).json({
        success: false,
        error: 'User Already Exist'
      });
    }
    const { error } = validateInput(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        error: error.details[0].message
      });
    }
    const user = {
      userId: allUsers.length + 1,
      email: req.body.email,
      address: req.body.address
    };
    users.push(user);
    return res.status(201).json({
      success: true,
      message: 'User Account Successfully Created',
      data: user
    });
  }

  static updateUser(req, res) {
    const { id } = req.params;
    const user = users.find(element => element.orderId === parseInt(id, 10));
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'The User with the given id was not found.'
      });
    }
    const { error } = validateInput(req.body);
    if (error) {
      return res.status(400).json({
        sucess: false,
        error: error.details[0].message
      });
    }
    user.name = req.body.name;
    user.address = req.body.address;
    return res.json({
      success: true,
      message: 'User Successfully Updated',
      data: user
    });
  }

  static getUserParcels(req, res) {
    const { id } = req.params;
    const user = users.find(element => element.userId === parseInt(id, 10));
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'The User With the given id was not found.'
      });
    }
    const { userId } = user;
    const userParcels = parcels.filter(c => c.userId === parseInt(userId, 10));
    return res.status(200).json({
      success: true,
      message: 'Parcel delivery order by user',
      data: userParcels
    });
  }

  static getUserById(req, res) {
    const { id } = req.params;
    const user = users.find(element => element.userId === parseInt(id, 10));
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'The User With the given id was not found.'
      });
    }
    return res.status(200).json({
      success: true,
      message: 'User successfully fetched by Id',
      data: user
    });
  }

  static getAllUsers(req, res) {
    const allUsers = users;
    return res.status(200).json({
      success: true,
      message: 'All Users fetched successfully',
      data: allUsers
    });
  }
}

export default UserController;
