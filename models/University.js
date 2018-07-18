module.exports = (sequelize, DataTypes) => {
    const University = sequelize.define('University', {
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        externalId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    });

    University.associate = (models) => {
        University.hasMany(models.Abiturient, {foreignKey: 'UniversityId'});
    };

    return University;
};