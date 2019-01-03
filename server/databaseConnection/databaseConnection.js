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
    password VARCHAR(100),
    registered TIMESTAMP DEFAULT NOW(),
    isadmin Boolean DEFAULT false
);`;

const createParcelsTable = `CREATE TABLE IF NOT EXISTS

  parcels(
    id SERIAL PRIMARY KEY,
    userid INTEGER REFERENCES users(id),
    weight VARCHAR(25) NOT NULL,
    weightmetric VARCHAR(20) NOT NULL,
    sentOn TIMESTAMP default now(),
    deliveredOn TIMESTAMP,
    status  VARCHAR(10),
    pickuplocation VARCHAR(50),
    currentlocation VARCHAR(50),
    destination VARCHAR(50)
);`;


const createAllTables = `${createUsersTable}${createParcelsTable}`;

pool.query(createAllTables, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('connected');
  }
});

export default pool;
