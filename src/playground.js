import { Op } from 'sequelize';

import './database';
import Customer from './app/models/Customer';
import Contact from './app/models/Contact';

// Pesquisar Registro
// class Playground {
//   static async play() {
//     // const customers = await Customer.findAll({
//     //   attributes: { exclude: ['id'] },
//     // });
//     // const customers = await Customer.findOne({
//     //   attributes: { exclude: ['id'] },
//     // });
//     // const customers = await Customer.findByPk(2);

//     const customers = await Customer.findAll({
//       // attributes: { exclude: ['status'] },
//       // include: [Contact],
//       where: {
//         status: {
//           [Op.in]: ['ACTIVE', 'ARCHIVED'],
//         },
//         // name: {
//         //   [Op.like]: 'Win%',
//         // },
//       },
//       order: ['name'],
//       limit: 3,
//     });

//     console.log(JSON.stringify(customers, null, 2));
//   }
// }

// Criar Registro
// class Playground {
//   static async play() {
//     const customer = await Customer.create({
//       name: 'Joa',
//       email: 'joao@eample.com',
//     });

//     console.log(JSON.stringify(customer, null, 2));
//   }
// }

// Atualizar Registro
// class Playground {
//   static async play() {
//     const customer = await Customer.findByPk(2);
//     console.log('Antes: ', JSON.stringify(customer, null, 2));
//     const newCustomer = await customer.update({ name: 'Patricia' });
//     console.log('Depois: ', JSON.stringify(newCustomer, null, 2));
//   }
// }

// Exclusão Registro
class Playground {
  static async play() {
    const customer = await Customer.findByPk(6);
    customer.destroy();
  }
}

Playground.play();

// findAll = Busca todos
// findOne = Busca o Primeiro registro
// findByPk = Busca pelo o ID passado
