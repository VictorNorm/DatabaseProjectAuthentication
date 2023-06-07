module.exports = (sequelize, Sequelize) => {
  const Plan = sequelize.define("Plan", {
    startDate: Sequelize.DataTypes.DATE,
    endDate: Sequelize.DataTypes.DATE,
    createdBy: Sequelize.DataTypes.INTEGER,
    updatedBy: Sequelize.DataTypes.INTEGER,
  });
  Plan.associate = function (models) {
    Plan.belongsTo(models.User);
    Plan.hasMany(models.Workout);
  };
  return Plan;
};
