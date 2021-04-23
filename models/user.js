'use strict';
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize) => {
    class User extends Model {}
    User.init({
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "A first name is required"
                },
                notEmpty: {
                    msg: "Please provide a first name"
                }
            }
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "A last name is required"
                },
                notEmpty: {
                    msg: "Please provide a last name"
                }
            }
        },
        emailAddress: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "An email address is required"
                },
                notEmpty: {
                    msg: "Please provide an email address"
                },
                isEmail: true, // extra credit: valid email format check
                unique: { // extra credit: unique constraint check
                    msg: 'The email you entered already exists'
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'A password is required'
                },
                notEmpty: {
                    msg: 'Please provide a passoword'
                },
                len: {
                    args: [10, 15],
                    msg: 'Choose a password that is between 10-15 characters long'
                },
            },
            set(val) {
                if (val === this.password) {
                    const hashedPassword = bcrypt.hashSync(val, 10);
                    this.setDataValue('password', hashedPassword);
                }
            }
        }
    }, { sequelize });

    User.associate = (models) => {
        // add associations
        User.hasMany(models.Course, {
            as: 'instructor',
            foreignKey: {
                fieldName: 'userId',
                allowNull: false
            }
        });
    };

    return User;
};