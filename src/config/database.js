module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: '123',
  database: 'banco-nodejs',
  define: {
    timestamp: true, // cria duas colunas: createdAt e UpdateAt
    underscored: true, // troca a nomeclatura camelcase
    underscoredAll: true,
  },
};
