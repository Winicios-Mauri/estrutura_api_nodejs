import Customer from '../models/Customer';

const customers = [
  { id: 1, name: 'Rockseat', site: 'http://rockseat.com.br' },
  { id: 2, name: 'DevSamurai', site: 'http://devsamurai.com.br' },
  { id: 3, name: 'DevMedia', site: 'http://devmedia.com.br' },
];

const CustomersController = {
  // Listagem de Customers
  // async index(req, res) {
  //   const data = await Customer.findAll({
  //     limit: 1000,
  //   });
  //   return res.json(data);
  // },

  async index(req, res) {
    try {
      const customers = await Customer.findAll();
      return res.json(customers);
    } catch (error) {
      console.error('Error fetching customers:', error);
      return res
        .status(500)
        .json({ error: 'An error occurred while fetching customers.' });
    }
  },

  // Recupera um Custormer
  show(req, res) {
    const id = parseInt(req.params.id, 10);
    const customer = customers.find((item) => item.id === id);
    const status = customer ? 200 : 404;

    console.log('GET:: /customers/:id', customer);

    return res.status(status).json(customer);
  },

  // Cria um Custormer
  create(req, res) {
    const { name, site } = req.body;
    const id = customers[customers.length - 1].id + 1;

    const newCustomer = { id, name, site };
    customers.push(newCustomer);

    return res.status(201).json(newCustomer);
  },

  // Atualiza um Custormer
  update(req, res) {
    const id = parseInt(req.params.id, 10);
    const { name, site } = req.body;

    const index = customers.findIndex((item) => item.id === id);
    const status = index >= 0 ? 200 : 404;

    if (index >= 0) {
      customers[index] = { id: parseInt(id, 10), name, site };
    }

    return res.status(status).json(customers[index]);
  },

  // Exclui um Custormer
  destroy(req, res) {
    const id = parseInt(req.params.id, 10);
    const index = customers.findIndex((item) => item.id === id);
    const status = index >= 0 ? 200 : 404;

    if (index >= 0) {
      customers.splice(index, 1);
    }

    return res.status(status).json();
  },
};

export default CustomersController;
