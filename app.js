import express from 'express';
import morganLogger from 'morgan';
import bodyParser from 'body-parser';
import apiVersion1 from './server/apiVersions/apiVersion1';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morganLogger('combined'));

app.get('/', (req, res) => {
  res.status(200).json({
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
    message: 'Resource Not Found'
  });
});


app.listen(port, () => {
  console.log(`Server running on port: ${port} ....`);
});
