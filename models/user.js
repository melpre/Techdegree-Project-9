'use strict';
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize) => {
    class User extends Model {}
    User.init({
        firstName: {
            type: DataTypes.STRING
            // allowNull: false,
            // validate: {
            //     notNull: {
            //         msg: "A first name is required"
            //     },
            //     notEmpty: {
            //         msg: "Please provide a first name"
            //     }
            // }
        },
        lastName: {
            type: DataTypes.STRING
            // allowNull: false,
            // validate: {
            //     notNull: {
            //         msg: "A last name is required"
            //     },
            //     notEmpty: {
            //         msg: "Please provide a last name"
            //     }
            // }
        },
        emailAddress: {
            type: DataTypes.STRING
            // allowNull: false,
            // validate: {
            //     notNull: {
            //         msg: "An email address is required"
            //     },
            //     notEmpty: {
            //         msg: "Please provide an email address"
            //     }
            // }
        },
        password: {
            type: DataTypes.STRING
        }
    }, { sequelize });

    User.associate = (models) => {
        // add associations
        User.hasMany(models.Course, {
            as: 'instructor',
            foreignKey: {
                fieldName: 'userId',
                // allowNull: false
            }
        });
    };

    return User;
};