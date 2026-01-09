import { DataSource } from 'typeorm';
import { User } from './users/users.entity';
import { Tasks } from './tasks/tasks.entity';

export const ConnectionProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const connection = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'example',
        database: 'tasker',
        schema: 'public',
        entities: [User, Tasks],
      });
      return connection.initialize();
    },
  },
];
