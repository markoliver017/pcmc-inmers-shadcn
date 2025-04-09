import { DataTypes } from "sequelize";
import sequelize from "../db.js";
import AdminModel from "./Admin.js";
import ReportModel from "./Report.js";

// Import models
const Admin = AdminModel(sequelize, DataTypes);
const Report = ReportModel(sequelize, DataTypes);

const models = {
    Admin,
    Report,
};

// Set up associations by calling associate methods
Object.values(models).forEach((model) => {
    if (model.associate) {
        model.associate(models);
    }
});

// const authDatabase = async () => {
//     try {
//         await sequelize.authenticate(); // Check DB connection
//         console.log("✅ Database connected successfully.");
//     } catch (error) {
//         console.error("❌ Database authentication failed:", error);
//     }
// };

// authDatabase();

process.on("SIGINT", async () => {
    try {
        await sequelize.close();
        console.log("✅ Database connection closed gracefully.");
        process.exit(0);
    } catch (error) {
        console.error("❌ Error closing database connection:", error);
        process.exit(1);
    }
});

// Export models and sequelize instance
export { sequelize, Admin, Report };
