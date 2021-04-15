'use strict';
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize) => {
    class Course extends Model {}
    Course.init({
        title: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.TEXT
        },
        estimatedTime: {
            type: DataTypes.STRING
        },
        materialsNeeded: {
            type: DataTypes.STRING
        }
    }, { sequelize });

    Course.associate = (models) => {
        // add associations
        Course.belongsTo(models.User, {
            as: 'instructor',
            foreignKey: {
                fieldName: 'userId',
                // allowNull: false
            }
        });
    };

    return Course;
};