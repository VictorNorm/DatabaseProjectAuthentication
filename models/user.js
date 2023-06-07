module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "User",
    {
      FirstName: Sequelize.DataTypes.STRING,
      LastName: Sequelize.DataTypes.STRING,
      Username: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      Email: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      EncryptedPassword: {
        type: Sequelize.DataTypes.BLOB,
        allowNull: false,
      },
      Salt: {
        type: Sequelize.DataTypes.BLOB,
        allowNull: false,
      },
      Role: {
        type: Sequelize.DataTypes.STRING,
        defaultValue: "user",
      },
    },
    {
      timestamps: false,
    }
  );
  User.associate = function (models) {
    User.belongsTo(models.Role, { as: "role" });
    User.hasMany(models.Plan);
  };
  return User;
};
