// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgress://localhost/nba_dev'
  },
  test: {
    client: 'pg',
    connection: 'postgress://localhost/nba_test'
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
  }
};
