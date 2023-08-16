let = customers = [
  { id: 1, name: "Rockseat", site: "http://rockseat.com.br" },
  { id: 2, name: "DevSamurai", site: "http://devsamurai.com.br" },
  { id: 3, name: "DevMedia", site: "http://devmedia.com.br" },
];

class CustormersController {
  // Listagem de Customers
  index(req, res) {
    return res.json(customers);
  }

  // Recupera um Custormer
  show(req, res) {
    const id = parseInt(req.params.id);
    const customer = customers.find((item) => item.id === id);
    const status = customer ? 200 : 404;

    console.log("GET:: /customers/:id", customer);

    return res.status(status).json(customer);
  }

  // Cria um Custormer
  create(req, res) {
    const { name, site } = req.body;
    const id = customers[customers.length - 1].id + 1;

    const newCustomer = { id, name, site };
    customers.push(newCustomer);

    return res.status(201).json(newCustomer);
  }

  // Atualiza um Custormer
  update(req, res) {
    const id = parseInt(req.params.id);
    const { name, site } = req.body;

    const index = customers.findIndex((item) => item.id === id);
    const status = index >= 0 ? 200 : 404;

    if (index >= 0) {
      customers[index] = { id: parseInt(id), name, site };
    }

    return res.status(status).json(customers[index]);
  }

  // Exclui um Custormer
  destroy(req, res) {
    const id = parseInt(req.params.id);
    const index = customers.findIndex((item) => item.id === id);
    const status = index >= 0 ? 200 : 404;

    if (index >= 0) {
      customers.splice(index, 1);
    }

    return res.status(status).json();
  }
}

module.exports = new CustormersController();
