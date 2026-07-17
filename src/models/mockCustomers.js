import { CustomerStatus } from './Customer';

/**
 * Sample mock customers for development / offline use.
 * Mirrors the 10 seed records in CustomerRepository.cs.
 */
const mockCustomers = [
  { id: 1,  name: 'Alice Martin',   email: 'alice.martin@example.com',   status: CustomerStatus.ACTIVE },
  { id: 2,  name: 'Bob Johnson',    email: 'bob.johnson@example.com',    status: CustomerStatus.PREMIUM },
  { id: 3,  name: 'Carol White',    email: 'carol.white@example.com',    status: CustomerStatus.INACTIVE },
  { id: 4,  name: 'David Lee',      email: 'david.lee@example.com',      status: CustomerStatus.ACTIVE },
  { id: 5,  name: 'Emma Davis',     email: 'emma.davis@example.com',     status: CustomerStatus.PREMIUM },
  { id: 6,  name: 'Frank Brown',    email: 'frank.brown@example.com',    status: CustomerStatus.ACTIVE },
  { id: 7,  name: 'Grace Wilson',   email: 'grace.wilson@example.com',   status: CustomerStatus.INACTIVE },
  { id: 8,  name: 'Henry Taylor',   email: 'henry.taylor@example.com',   status: CustomerStatus.PREMIUM },
  { id: 9,  name: 'Isla Anderson',  email: 'isla.anderson@example.com',  status: CustomerStatus.ACTIVE },
  { id: 10, name: 'Jack Thompson',  email: 'jack.thompson@example.com',  status: CustomerStatus.ACTIVE },
];

export default mockCustomers;
