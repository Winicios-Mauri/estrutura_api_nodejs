import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
      },
      {
        sequelize,
        name: {
          singular: 'user',
          plural: 'users',
        },
      },
    );

    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        const userCopy = { ...user }; // Criar uma cópia do objeto 'user'
        userCopy.password_hash = await bcrypt.hash(user.password, 8);
        Object.assign(user, userCopy); // Atribuir as propriedades de volta ao objeto original
      }
    });
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
