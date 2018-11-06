import users from './users';

const parcels = [{
  orderID: 1,
  userId: users[0].userId,
  description: 'papers',
  weight: '35kg',
  location: 'Edo',
  destionation: 'Abuja',
  status: 'new'
},
{
  orderID: 1,
  userId: users[1].userId,
  description: 'documents',
  weight: '35kg',
  location: 'Edo',
  destionation: 'Abuja',
  status: 'canceled'
},
{
  orderID: 1,
  userId: users[0].userId,
  description: 'official letters',
  weight: '35kg',
  location: 'Edo',
  destionation: 'Abuja',
  status: 'intransition'
}
];
module.exports = parcels;
