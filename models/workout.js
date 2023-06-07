module.exports = (sequelize, Sequelize) => {
  const Workout = sequelize.define("Workout", {
    name: Sequelize.DataTypes.STRING,
  });
  Workout.associate = function (models) {
    Workout.belongsTo(models.Plan);
    Workout.hasMany(models.Exercise);
  };
  return Workout;
};
