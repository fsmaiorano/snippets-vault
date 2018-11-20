// import 'reflect-metadata';
import {createConnection, ConnectionOptions} from 'typeorm';
import {User} from './entity/User';

// const options: ConnectionOptions = {
//   type: 'mysql',
//   host: 'localhost',
//   port: 3306,
//   username: 'root',
//   password: '123456',
//   database: 'snippetfy',
//   synchronize: true,
//   logging: ['query', 'error'],
//   entities: [User]
// };

createConnection()
  .then(async connection => {
    let user = new User();
    user.name = 'fabio';
    user.email = 'email@fabio.com';
    user.password = 'pass';

    let userRepository = connection.getRepository(User);

    await userRepository.save(user);
    await connection.close();
  })
  .catch(error => console.log(error));
