import { Router } from 'express';
import parcels from '../routesV1/parcels';
import users from '../routesV1/users';

const apiVersion1 = Router();

apiVersion1.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to SendIT API VERSION 1'
  });
});

apiVersion1.use('/parcels', parcels);
apiVersion1.use('/users', users);

module.exports = apiVersion1;
