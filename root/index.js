import bcrypt from "bcrypt";
import { generateJwt } from "../utils/generateJwt.js";
import { User } from "../models/user.js";
import { Tweet } from "../models/tweet.js";

export const root = {
	addTweet: async ({ input }) => {
		const { author, tweetText, userId } = input;
		console.log("AAAAAAAAAA", author, tweetText, userId);
		if (tweetText == "") {
			throw new Error("Напишите твит");
		}
		const newTweet = await Tweet.create({
			author,
			tweetText,
			userId,
		});
		await newTweet.save();
		return {
			id: newTweet.id,
			author: newTweet.author,
			tweetText: newTweet.tweetText,
		};
	},
	getAllTweets: async () => {
		const tweets = await Tweet.findAll();
		return tweets;
	},
	registerUser: async ({ input }) => {
		const { name, email, password, password2 } = input;
		if (password !== password2) {
			throw new Error("Пароли не совпадают");
		}
		const candidate = await User.findOne({ where: { email: email } });
		if (candidate) {
			throw new Error("Пользователь уже существует");
		}
		const hashPassword = await bcrypt.hash(password.toString(), 5);
		const newUser = new User({
			name: name,
			email: email,
			password: hashPassword.toString(),
		});
		await newUser.save();
		const token = generateJwt(newUser.id, newUser.name, newUser.email);
		return { id: newUser.id, name: newUser.name, email: newUser.email, token };
	},
	loginUser: async ({ input }) => {
		const { email, password } = input;
		const findUser = await User.findOne({ where: { email: email } });
		if (!findUser) {
			throw new Error("Пользователь не найден");
		}
		const isMatch = await bcrypt.compare(
			password.toString(),
			findUser.password
		);
		if (!isMatch) {
		}
		const token = generateJwt(findUser.id, findUser.name, findUser.email);
		return {
			id: findUser.id,
			name: findUser.name,
			email: findUser.email,
			token,
		};
	},
};
