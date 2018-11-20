import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:practice@127.0.0.1:5432/sendit'
});

pool.on('connnect', () => {
  console.log('Server connected to database');
});

const createUsersTable = `CREATE TABLE IF NOT EXISTS

  users(
    id SERIAL PRIMARY KEY NOT NULL,
    firstname VARCHAR(25) NOT NULL,
    lastname VARCHAR(25) NOT NULL,
    email VARCHAR(30) UNIQUE NOT NULL,
    username VARCHAR NOT NULL,
    password VARCHAR(100),
    registered TIMESTAMP DEFAULT NOW(),
    isAdmin Boolean DEFAULT false
);`;

const createParcelsTable = `CREATE TABLE IF NOT EXISTS

  parcels(
    id SERIAL PRIMARY KEY,
    userId INTEGER REFERENCES users(id),
    weight VARCHAR(25) NOT NULL,
    weightmetric VARCHAR(20) NOT NULL,
    sentOn TIMESTAMP default now(),
    deliveredOn TIMESTAMP,
    status  VARCHAR(10),
    from_where VARCHAR(50),
    to_where VARCHAR(50)
);`;

const createAllTables = `${createUsersTable}${createParcelsTable}`;

pool.query(createAllTables, (err, result) => {
  if (err) {
    console.error(err);
  } else {
    console.log(result);
  }
});

export default pool;
