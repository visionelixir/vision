import { DatabaseConfig, DatabaseConnectionTypes } from '@visionelixir/elixir'

const DATABASE_CONFIG: DatabaseConfig = {
  connections: {
    default: {
      type: DatabaseConnectionTypes.PG,
      host: 'localhost',
      database: 'vision_elixir',
      user: 'postgres',
      password: 'postgres',
      port: 5432,
    },
  },
}

export default DATABASE_CONFIG
