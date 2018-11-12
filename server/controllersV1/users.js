import parcels from '../modelsV1/parcles';
import users from '../modelsV1/users';
import userValidator from '../validatorsV1/userValidator';

const validateInput = userValidator;

class UserController {
  static deleteUser(req, res) {
    const user = users.find(x => x.userId === parseInt(req.params.id, 10));
    if (!user) {
      res.status(404).json({
        error: 'The User with the given id was not found.'
      });
      return;
    }
    const index = users.indexOf(user);
    users.splice(index, 1);
    res.status(200).json({
      message: 'User Successfully Deleted',
      data: user
    });
  }

  static createUser(req, res) {
    const { error } = validateInput(req.body);
    if (error) {
      res.status(400).json({
        error: error.details[0].message,
        message: 'Bad Request'
      });
      return;
    }
    const allUsers = users;
    const newUser = users.find(c => c.email === req.body.email);
    if (newUser) {
      res.status(404).json({
        error: 'User Already Exist'
      });
      return;
    }
    const user = {
      userId: allUsers.length + 1,
      email: req.body.email,
      address: req.body.address
    };
    users.push(user);
    res.status(201).json({
      message: 'User Account Successfully Created',
      data: user
    });
  }

  static updateUser(req, res) {
    const user = users.find(x => x.orderId === parseInt(req.params.id, 10));
    if (!user) {
      res.status(404).json({
        error: 'The User with the given id was not found.'
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
    user.name = req.body.name;
    user.address = req.body.address;
    res.json({
      message: 'User Successfully Updated',
      data: user
    });
  }

  static getUserParcels(req, res) {
    const user = users.find(x => x.userId === parseInt(req.params.id, 10));
    if (!user) {
      res.status(404).json({
        error: 'The User With the given id was not found.'
      });
      return;
    }
    const userParcels = parcels.filter(c => c.userId === parseInt(user.userId, 10));
    res.status(200).json({
      message: 'Parcel Order delivery by user',
      data: userParcels
    });
  }

  static getUserById(req, res) {
    const user = users.find(x => x.userId === parseInt(req.params.id, 10));
    if (!user) {
      res.status(404).json({
        error: 'The User With the given id was not found.'
      });
      return;
    }
    res.status(200).json({
      message: 'User by ID',
      data: user
    });
  }

  static getAllUsers(req, res) {
    const allUsers = users;
    res.status(200).json({
      message: 'All Users',
      data: allUsers
    });
  }
}

export default UserController;
