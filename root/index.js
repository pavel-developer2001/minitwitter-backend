import bcrypt from "bcrypt";
import { generateJwt } from "../utils/generateJwt.js";
import { User } from "../models/user.js";

export const root = {
	registerUser: async ({ input }) => {
		const { name, email, password, password2 } = input;
		console.log(name, email, password, password2);
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
			password: hashPassword,
		});
		await newUser.save();
		const token = generateJwt(newUser.id, newUser.name, newUser.email);
		const data = { newUser, token };
		return data;
	},
	loginUser: async ({ input }) => {
		console.log(input);
	},
};
