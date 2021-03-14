const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// Validation
const {
	registerValidation,
	loginValidation,
} = require("../Validation/AuthValidation");
const { default: UserLogic } = require("../functions/UserLogic");

router.post("/register", async (req, res) => {
	const { error } = registerValidation(req.body);

	if (error)
		return res.status(400).json({ message: error.details[0].message });

	const user = await User.findOne({ email: req.body.user });
	if (user) return res.status(400).json({ message: "User already exists" });
	try {
		const hashedPassword = await bcrypt.hash(req.body.password, 10);
		const newUser = new User({
			user: req.body.user,
			password: hashedPassword,
		});
		await newUser.save();
		const [
			token,
			refreshToken,
		] = await UserLogic.generateTokenAndRefreshToken(req.body.user);
		console.log(token, refreshToken, "\n\n\n\n\n");
		return res
			.status(200)
			.header("Authorization", token + " " + refreshToken)
			.json({ id: newUser._id });
	} catch (e) {
		return res.status(400).json({ message: e.message });
	}
});

router.post("/login", async (req, res) => {
	const { error } = loginValidation(req.body);

	if (error) return res.status(400).send(error.details[0].message);
	const user = await User.findOne({ email: req.body.email });
	if (!user)
		return res.status(401).json({ message: "Email or Password is wrong" });

	const validPassword = await bcrypt.compare(
		req.body.password,
		user.password
	);
	if (!validPassword)
		return res
			.status(401)
			.json({ message: "Username or Password is wrong" });

	try {
		const [token, refreshToken] = await UserLogic.generateTokenAndRefreshToken(
			req.body.user
		);
		return res
			.status(200)
			.header("Authorization", token + " " + refreshToken)
			.json({ user: user });
	} catch (e) {
		return res.status(400).json({ message: e.message });
	}
});

router;

module.exports = router;
