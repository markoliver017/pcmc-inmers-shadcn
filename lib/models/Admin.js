import bcrypt from "bcryptjs";
const saltRounds = 10;

const AdminModel = (sequelize, DataTypes) => {
    const Admin = sequelize.define(
        "Admin",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            first_name: {
                type: DataTypes.STRING(50),
                allowNull: false,
                set(value) {
                    const formatted = value
                        .toLowerCase()
                        .split(" ")
                        .map(
                            (word) =>
                                word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" ");

                    this.setDataValue("first_name", formatted);
                },
                validate: {
                    notEmpty: {
                        msg: "First Name field is required.",
                    },
                    is: {
                        args: /^[A-Za-z\s]+$/, // Allows only letters and spaces
                        msg: "First Name can only contain letters and spaces.",
                    },
                },
            },
            last_name: {
                type: DataTypes.STRING(50),
                allowNull: false,
                set(value) {
                    const formatted = value
                        .toLowerCase()
                        .split(" ")
                        .map(
                            (word) =>
                                word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" ");

                    this.setDataValue("last_name", formatted);
                },
                validate: {
                    notEmpty: {
                        msg: "Last Name field is required.",
                    },
                    is: {
                        args: /^[A-Za-z\s]+$/, // Allows only letters and spaces
                        msg: "Last Name can only contain letters and spaces.",
                    },
                },
            },
            gender: {
                type: DataTypes.ENUM("male", "female"),
                allowNull: false,
                defaultValue: "male",
                validate: {
                    isIn: {
                        args: [["male", "female"]],
                        msg: "Invalid gender type.",
                    },
                },
            },
            is_active: {
                type: DataTypes.TINYINT,
                allowNull: false,
                defaultValue: 1,
            },
            email: {
                type: DataTypes.STRING(250),
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: {
                        msg: "Email field must be a valid email.",
                    },
                },
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: {
                        args: [8, 255],
                        msg: "Password must be atleast 8 characters long.",
                    },
                    notEmpty: {
                        msg: "Password field is required.",
                    },
                },
                set(value) {
                    if (value.length >= 8) {
                        const hashedPassword = bcrypt.hashSync(
                            value,
                            saltRounds
                        );
                        this.setDataValue("password", hashedPassword);
                    } else {
                        this.setDataValue("password", value);
                    }
                },
            },
        },
        { timestamps: true, tableName: "admins" }
    );

    Admin.prototype.validPassword = async function (password) {
        const currentPass = this.password;
        // const isValid = await bcrypt.compare(password, currentPass);
        return await bcrypt.compare(password, currentPass);
    };

    /* Define associations in the `associate` method
     ** your associations here .. sample codes below
     */
    return Admin;
};

export default AdminModel;

// Admin.associate = (models) => {
//     Admin.belongsTo(models.Role, {
//         foreignKey: "role_id",
//         onDelete: "RESTRICT",
//     });
//     Admin.belongsTo(models.File, {
//         foreignKey: "photo_id",
//         onDelete: "SET NULL",
//     });
// };
