module.exports = {
  default: {
    client: 'mysql',
    pool: { min: 1, max: 7 },
    connection: {
      host: '127.0.0.1',
      user: 'root',
      database: 'scrawl',
      charset: 'utf8'
    },
    migrations: {
      directory: __dirname + '/migrations'
    },
    seeds: {
      directory: __dirname + '/db/seeds/default'
    }
  },
  test: {
    client: 'mysql',
    pool: { min: 1, max: 7 },
    connection: {
      host: '127.0.0.1',
      user: 'root',
      database: 'scrawl_test',
      charset: 'utf8'
    },
    migrations: {
      directory: __dirname + '/migrations'
    },
    seeds: {
      directory: __dirname + '/db/seeds/default'
    }
  },
  production: {
    client: 'mysql',
    pool: { min: 1, max: 7 },
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: __dirname + '/migrations'
    },
    seeds: {
      directory: __dirname + '/db/seeds/production'
    }
  }
};
