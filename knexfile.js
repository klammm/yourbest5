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
};
