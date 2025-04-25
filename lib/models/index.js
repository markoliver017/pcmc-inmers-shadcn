import { DataTypes } from "sequelize";
import sequelize from "../db.js";
import AdminModel from "./Admin.js";
import ReportModel from "./Report.js";
import ErrorTypeModel from "./ErrorType.js";
import FileModel from "./FileModel.js";

// Import models
const Admin = AdminModel(sequelize, DataTypes);
const Report = ReportModel(sequelize, DataTypes);
const ErrorType = ErrorTypeModel(sequelize, DataTypes);
const File = FileModel(sequelize, DataTypes);

const models = {
    Admin,
    Report,
    ErrorType,
    File,
};

// Set up associations by calling associate methods
Object.values(models).forEach((model) => {
    if (model.associate) {
        model.associate(models);
    }
});

// Export models and sequelize instance
export { sequelize, Admin, Report, ErrorType, File };
