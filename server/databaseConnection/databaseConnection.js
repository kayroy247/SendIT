import { Pool } from 'pg';
import { config } from 'dotenv';

config();
const connectionUrl = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString: connectionUrl
});

pool.on('connect', () => {
  console.log('Server connected to database');
});

const createUsersTable = `CREATE TABLE IF NOT EXISTS

  users(
    id SERIAL PRIMARY KEY NOT NULL,
    firstname VARCHAR(25) NOT NULL,
    lastname VARCHAR(25) NOT NULL,
    email VARCHAR(30) UNIQUE NOT NULL,
    username VARCHAR UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    registered TIMESTAMP DEFAULT NOW(),
    isadmin Boolean DEFAULT false NOT NULL
);`;

const createParcelsTable = `CREATE TABLE IF NOT EXISTS

  parcels (
    id SERIAL PRIMARY KEY,
    userid INTEGER REFERENCES users(id) NOT NULL,
    weight VARCHAR(25) NOT NULL,
    weightmetric VARCHAR(20) NOT NULL,
    sentOn TIMESTAMP default now(),
    deliveredOn TIMESTAMP NOT NULL,
    status  VARCHAR(10) NOT NULL,
    pickuplocation VARCHAR(50) NOT NULL,
    currentlocation VARCHAR(50) NOT NULL,
    destination VARCHAR(50) NOT NULL
);`;


const createAllTables = `${createUsersTable}${createParcelsTable}`;

pool.query(createAllTables)
  .catch((err) => {
    console.log(err);
  });

export default pool;
