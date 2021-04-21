'use strict';
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize) => {
    class Course extends Model {}
    Course.init({
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'A title for the course is required'
                },
                notEmpty: {
                    msg: 'Please provide course title'
                }
            }
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'A description of the course is required'
                },
                notEmpty: {
                    msg: 'Please provide course description'
                }
            }
        },
        estimatedTime: {
            type: DataTypes.STRING
        },
        materialsNeeded: {
            type: DataTypes.TEXT
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