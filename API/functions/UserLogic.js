const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const Token = require("../models/Token");
const jwt = require("jsonwebtoken");

class UserLogic {
	static generateRefreshToken = async (user) => {
		const random = crypto.randomBytes(36).toString();
		const refreshToken = await bcrypt.hash(random, 10);
		const token = await Token.findOne({ user: user });
		if (token) {
			token._doc.refreshToken = refreshToken;
			token.markModified("refreshToken");
			await token.save();
		} else {
			const newToken = new Token({
				user: user,
				refreshToken: refreshToken,
			});
			await newToken.save();
		}
		return refreshToken;
	};

	static validateRefreshToken = async (user, refreshToken) => {
		const token = await Token.findOne({
			user: user,
			refreshToken: refreshToken,
		});
		return !!token;
	};

	static generateToken = async (user) =>
		jwt.sign({ user: user }, process.env.TOKEN_SECRET, {
			expiresIn: "1m",
		});

	static generateTokenAndRefreshToken = async (user) => {
		const token = await this.generateToken(user);
		const refreshToken = await this.generateRefreshToken(user);
		return [
			token,
			refreshToken
		];
	};

	static regenerateRefreshToken = async (user, refreshToken) => {
		const isValid = await this.validateRefreshToken(user, refreshToken);
		if (!isValid) {
			throw new Error("401");
		}
		return this.generateRefreshToken(user, refreshToken);
	};

	static regenerateTokenAndRefreshToken = async (user, refreshToken) => [
		await this.generateToken(user),
		await this.regenerateRefreshToken(user, refreshToken),
	];
}

exports.default = UserLogic;
