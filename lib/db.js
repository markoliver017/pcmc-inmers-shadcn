import { Sequelize } from "sequelize";
import mysql2 from "mysql2";

const sequelize = new Sequelize("inmers", "root", "root", {
    host: "localhost",
    dialect: "mysql", // Use 'mysql' for MySQL databases
    dialectModule: mysql2,
    bencmark: true,
    logging: false, // Disable SQL query logging in console
    // logging: (...msg) => console.log(msg),
});

(async () => {
    try {
        await sequelize.authenticate(); // Check DB connection
        console.log("✅ Database connected successfully.");

        await sequelize.sync({ alter: true });
    } catch (error) {
        console.error("❌ Database authentication failed:", error);
    }
})();
export default sequelize;
