import { sequelize } from "../db.js";
import Sequelize from "sequelize";
import { Tweet } from "./tweet.js";

export const User = sequelize.define("users", {
	id: {
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		type: Sequelize.INTEGER,
	},
	name: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false,
	},
});
User.hasMany(Tweet);
Tweet.belongsTo(User);
