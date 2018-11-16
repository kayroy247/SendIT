import users from './users';

const parcels = [{
  orderId: 1,
  userId: users[0].userId,
  description: 'papers',
  weight: '35kg',
  price: '$23',
  destination: 'Abuja',
  status: 'new'
},
{
  orderId: 2,
  userId: users[1].userId,
  description: 'documents',
  weight: '35kg',
  price: '$34.00',
  destination: 'Abuja',
  status: 'cancelled'
},
{
  orderId: 3,
  userId: users[0].userId,
  description: 'official letters',
  weight: '35kg',
  price: '$20',
  destination: 'Abuja',
  status: 'intransition'
}
];
export default parcels;
