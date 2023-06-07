class UserService {
  constructor(db) {
    this.client = db.sequelize;
    this.User = db.User;
  }

  async create(username, firstName, lastName, email, salt, encryptedPassword) {
    return this.User.create({
      Username: username,
      FirstName: firstName,
      LastName: lastName,
      Email: email,
      Salt: salt,
      EncryptedPassword: encryptedPassword,
    });
  }

  async getAll() {
    return this.User.findAll({
      where: {},
    });
  }

  async getOne(userId) {
    return await this.User.findOne({
      where: { id: userId },
    });
  }

  async getOneByEmail(email) {
    return await this.User.findOne({
      where: { email: email },
    });
  }

  async getOneByName(username) {
    return await this.User.findOne({
      where: { Username: username },
    });
  }

  async deleteUser(userId) {
    return this.User.destroy({
      where: { id: userId },
    });
  }
}
module.exports = UserService;
