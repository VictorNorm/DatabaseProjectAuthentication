module.exports = (sequelize, Sequelize) => {
  const Exercise = sequelize.define("Exercise", {
    name: Sequelize.DataTypes.STRING,
    sets: Sequelize.DataTypes.INTEGER,
    reps: Sequelize.DataTypes.INTEGER,
    weight: Sequelize.DataTypes.INTEGER,
  });
  Exercise.associate = function (models) {
    Exercise.belongsTo(models.Workout);
    Exercise.belongsTo(models.ExerciseList);
  };
  return Exercise;
};
