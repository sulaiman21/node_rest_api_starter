import { Sequelize } from "sequelize";
import modals from "../models";

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DATABASE } = process.env;

const sequelize = new Sequelize(DATABASE!, DB_USER!, DB_PASSWORD!, {
	dialect: "mssql",
	host: DB_HOST!,
	port: parseInt(DB_PORT!),
	retry: {
		max: 3,
	},
	dialectOptions: {
		connectTimeout: 6000,
	},
	typeValidation: true,
	logging: true,
	pool: {
		idle: 3000,
	},
});

const tables = modals(sequelize);

type DB = {
	sequelize: Sequelize;
	tables: typeof tables;
};

const db: DB = {
	sequelize: sequelize,
	tables,
};

// DB Connection
sequelize
	.authenticate()
	.then(() => {
		// DB Connection success
		// Sync the tables
		sequelize
			.sync({ force: false })
			.then(() => {
				console.log("> DB Connection successful");
			})
			.catch((error: any) => {
				throw new Error("Unable to sync db tables");
			});
	})
	.catch((error) => {
		// DB Connection failed
		console.log("ERROR ==> ", error);
		throw new Error("Db connection failed!");
	});

export { db };
