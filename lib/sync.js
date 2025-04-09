import { sequelize } from "./models/index.js";

const syncDatabase = async () => {
    try {
        await sequelize.sync({ alter: true }); // Sync models
        console.log("✅ Tables synchronized successfully.");
    } catch (error) {
        console.error("❌ Database sync failed:", error);
    }
};
syncDatabase();
