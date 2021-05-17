import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { sequelize } from "./db.js";
import { graphqlHTTP } from "express-graphql";
import { schema } from "./schema.js";
import { root } from "./root/index.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(
	"/graphql",
	graphqlHTTP({
		graphiql: true,
		schema,
		rootValue: root,
	})
);

const PORT = process.env.PORT || 3001;
const start = async () => {
	try {
		await sequelize.sync();
		app.listen(PORT, () => console.log(`server start to port is ${PORT}`));
	} catch (err) {
		console.log(err);
	}
};

start();
