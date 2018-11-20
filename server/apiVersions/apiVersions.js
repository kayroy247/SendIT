import { Router } from 'express';
import parcels from '../routes/parcels';
import users from '../routes/users';
import auth from '../routes/auth';

const apiVersion1 = Router();

apiVersion1.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to SendIT API VERSION 1'
  });
});

apiVersion1.use('/parcels', parcels);
apiVersion1.use('/users', users);
// apiVersion1.use('/autho', auth)

export default apiVersion1;
