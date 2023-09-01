import * as Yup from 'yup';
import { Op } from 'sequelize';
import { parseISO } from 'date-fns';

import Customer from '../models/Customer';
import Contact from '../models/Contact';

const customers = [
  { id: 1, name: 'Rockseat', site: 'http://rockseat.com.br' },
  { id: 2, name: 'DevSamurai', site: 'http://devsamurai.com.br' },
  { id: 3, name: 'DevMedia', site: 'http://devmedia.com.br' },
];

const CustomersController = {
  // Listagem de Customers
  async index(req, res) {
    const {
      name,
      email,
      status,
      createdBefore,
      createdAfter,
      updatedBefore,
      updatedAfter,
      sort,
    } = req.query;

    const page = req.query.page || 1;
    const limit = req.query.limit || 25;

    let where = {};
    const order = [];

    if (name) {
      where = {
        ...where,
        [Op.iLike]: name,
      };
    }

    if (email) {
      where = {
        ...where,
        [Op.iLike]: email,
      };
    }

    if (status) {
      where = {
        ...where,
        [Op.in]: status.split(',').map((item) => item.toUpperCase()),
      };
    }

    if (createdBefore) {
      where = {
        ...where,
        createdAt: {
          [Op.gte]: parseISO(createdBefore),
        },
      };
    }

    if (createdAfter) {
      where = {
        ...where,
        createdAt: {
          [Op.lte]: parseISO(createdAfter),
        },
      };
    }

    if (updatedBefore) {
      where = {
        ...where,
        createdAt: {
          [Op.gte]: parseISO(updatedBefore),
        },
      };
    }

    if (updatedAfter) {
      where = {
        ...where,
        createdAt: {
          [Op.lte]: parseISO(updatedAfter),
        },
      };
    }

    if (sort) {
      order.sort.split(',').map((item) => item.split(':'));
    }

    const data = await Customer.findAll({
      where,
      include: [
        {
          model: Contact,
          attributes: ['id', 'status'],
        },
      ],
      order,
      limit,
      offset: limit * page - limit,
    });

    return res.json(data);
  },

  // Recupera um Custormer
  async show(req, res) {
    const customer = await Customer.findByPk(req.params.id);

    if (!customer) {
      return res.status(404).json();
    }

    return res.json(customer);
  },

  // Cria um Custormer
  async create(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      status: Yup.string().uppercase(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(404).json({ error: 'Error on validate schema' });
    }

    const customer = await Customer.create(req.body);

    return res.status(201).json(customer);
  },

  // Atualiza um Custormer
  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      status: Yup.string().uppercase(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(404).json({ error: 'Error on validate schema' });
    }

    const customer = await Customer.findByPk(req.params.id);

    if (!customer) {
      return res.status(404).json();
    }

    await customer.update(req.body);

    return res.json();
  },

  // Exclui um Custormer
  async destroy(req, res) {
    const customer = await Customer.findByPk(req.params.id);

    if (!customer) {
      return res.status(404).json();
    }

    await customer.destroy();

    return res.json();
  },
};

export default CustomersController;
