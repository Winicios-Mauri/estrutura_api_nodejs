import { Router } from 'express';

import auth from './app/middlewares/auth';
import sessions from './app/controllers/SessionsController';
import customers from './app/controllers/CustomersController';
import contacts from './app/controllers/ContactsController';
import users from './app/controllers/UsersController';

const routes = new Router();

// Sessions
routes.post('/sessions', sessions.create);

// Controla o acesso desse ponto
routes.use(auth);

// Customers
routes.get('/customers', customers.index);
routes.get('/customers/:id', customers.show);
routes.post('/customers', customers.create);
routes.put('/customers/:id', customers.update);
routes.delete('/customers/:id', customers.destroy);

//  Contact
routes.get('/customers/:customersId/contacts', contacts.index);
routes.get('/customers/:customersId/contacts/:id', contacts.show);
routes.post('/customers/:customersId/contacts', contacts.create);
routes.put('/customers/:customersId/contacts/:id', contacts.update);
routes.delete('/customers/:customersId/contacts/:id', contacts.destroy);

// Users
routes.get('/users', users.index);
routes.get('/users/:id', users.show);
routes.post('/users', users.create);
routes.put('/users/:id', users.update);
routes.delete('/users/:id', users.destroy);

export default routes;
