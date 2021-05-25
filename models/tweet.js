import { sequelize } from "../db.js";
import Sequelize from "sequelize";

export const Tweet = sequelize.define("tweets", {
	id: {
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		type: Sequelize.INTEGER,
	},
	author: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	tweetText: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	pictureTweet: {
		type: Sequelize.STRING,
		allowNull: false,
		defaultValue: "",
	},
	countLikes: {
		type: Sequelize.INTEGER,
		allowNull: false,
		defaultValue: 0,
	},
	countRetweets: {
		type: Sequelize.INTEGER,
		allowNull: false,
		defaultValue: 0,
	},
	countComments: {
		type: Sequelize.INTEGER,
		allowNull: false,
		defaultValue: 0,
	},
});
