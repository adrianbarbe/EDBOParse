const Abiturient = require('../models').Abiturient;

module.exports = (sequelize, DataTypes) => {
    const AbiturientSubjects = sequelize.define('AbiturientSubjects', {
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        points: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    });

    AbiturientSubjects.associate = (models) => {
        AbiturientSubjects.belongsTo(models.Abiturient, {foreignKey: 'AbiturientId'});
    };

    return AbiturientSubjects;
};