import express from 'express';
import morganLogger from 'morgan';
import { config } from 'dotenv';
import apiVersion1 from './server/apiVersions/apiVersions';

config();

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morganLogger('combined'));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Acess-Control-Allow-Header',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.METHODS === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE')
  }
  next();
});

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to SendIT courier service'
  });
});

/*
Versioning with Routers.
Version 1 uses data structure to store data in memory.
(non-persistent data storage)
*/
app.use('/api/v1', apiVersion1);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Resource Not Found'
  });
});


app.listen(app.get('port'), () => {
  console.log(`Server running on port: ${app.get('port')} ....`);
});

export default app;
