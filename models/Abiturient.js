module.exports = (sequelize, DataTypes) => {
    const Abiturient = sequelize.define('Abiturient', {
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        priority: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        points: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        olimp: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        coefficient: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        uidSpeciality: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });

    Abiturient.associate = (models) => {
        Abiturient.hasMany(models.AbiturientSubjects, {foreignKey: 'AbiturientId'});
        Abiturient.belongsTo(models.University);
    };

    return Abiturient;
};