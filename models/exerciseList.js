module.exports = (sequelize, Sequelize) => {
  const ExerciseList = sequelize.define("ExerciseList", {});
  ExerciseList.associate = function (models) {
    ExerciseList.hasMany(models.Exercise);
  };
  return ExerciseList;
};
