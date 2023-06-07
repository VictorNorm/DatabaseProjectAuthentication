module.exports = (sequelize, Sequelize) => {
  const Role = sequelize.define(
    "Role",
    {
      title: Sequelize.DataTypes.STRING,
      readPlan: Sequelize.DataTypes.BOOLEAN,
      createPlan: Sequelize.DataTypes.BOOLEAN,
      updatePlan: Sequelize.DataTypes.BOOLEAN,
      deletePlan: Sequelize.DataTypes.BOOLEAN,
    },
    {
      timestamps: false,
    }
  );
  Role.associate = function (models) {
    Role.hasOne(models.User, { foreignKey: "roleId", as: "user" });
  };
  return Role;
};
