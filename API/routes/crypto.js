const Crypto = require("./../models/Crypto");
require("dotenv/config");
const router = require("express").Router();
const {
	getIconAndName,
	addAmount,
	getCryptoKeys,
	calcStatistics,
	verifyType,
	verifyAmount,
	sellCrypto,
	checkBallance,
} = require("../functions/cryptoFunctions");
const { validateBallance } = require("../Validation/CryptoValidation");
const verifyToken = require("./verifyToken");

router.post("/", verifyToken, async (req, res) => {
	const user = await Crypto.findOne({ user: req.body.user }, (err, resp) => {
		if (!resp) {
			res.status(404).send("User not found");
		}
		return resp;
	});
	const [icon, name] = await getIconAndName(req.body.type);
	if (icon === undefined) {
		return res.status(400).send("invalid abbreviation");
	}
	if (!checkBallance(user, req.body)) {
		return res.status(400).json({ message: "Not enough funds" });
	}
	//update ballace
	user._doc.ballance = user._doc.ballance - req.body.usd;
	user.markModified("ballance");
	await user.save();
	req.body.icon = icon;
	req.body.name = name;
	const resp = await addAmount(user, req.body);
	if (resp) {
		return res.status(400).json({ message: resp });
	}
	res.status(200).json(user);
});

router.post("/setBallance", verifyToken, async (req, res) => {
	const { error } = validateBallance();
	if (error) {
		return res.status(400).send(error.details[0].message);
	}
	const crypto = await Crypto.findOne({ user: req.body.user });
	if (!crypto) {
		return res.status(404).json({ message: "User not found" });
	}
	crypto.ballance = req.body.ballance;
	await crypto.save();
	return res.json(crypto);
});

router.get("/", async (req, res) => {
	try {
		const user = await Crypto.findOne({ user: "Tudor" });
		const keys = getCryptoKeys(user);
		const statistics = await calcStatistics(user, keys);

		return res.status(200).json({ ...statistics });
	} catch (er) {
		return res.status(400).json({ message: er.message });
	}
});

router.post("/sell", verifyToken, async (req, res) => {
	if (!verifyType(req.body.type)) {
		return res.status(400).json({ message: "Invalid type" });
	}
	const user = await Crypto.findOne({ user: "Tudor" });
	if (!user) {
		return res.status(404).json({ message: "User not found" });
	}
	if (!verifyAmount(user, req.body.type, req.body.amount)) {
		return res.status(400).json({ message: "Not enough funds" });
	}
	const resp = await sellCrypto(user, req.body);
	if (!resp) {
		return res.status(200).json({ message: "Successfull" });
	}
	return res.status(400).json({ message: resp });
});

router.get("/reset", verifyToken, async (req, res) => {
	let crypto = await Crypto.findOne({ user: req.body.user });
	try {
		const keys = getCryptoKeys(crypto);
		const obj = crypto.toObject();
		await crypto.remove();
		for (key of keys) {
			delete obj[key];
		}
		const newCrypto = new Crypto(obj);
		await newCrypto.save();
		return res.json(newCrypto);
	} catch (e) {
		return res.json({ message: e.message });
	}
});

router.delete("/", verifyToken, async (req, res) => {
	const user = await Crypto.findOne({ user: "Tudor" });
	if (!user) {
		return res.status(404).json({ message: "User not found" });
	}
	user._doc[req.body.type].amount =
		user._doc[req.body.type].amount - req.body.amount;
	user._doc[req.body.type].usd = user._doc[req.body.type].usd - req.body.usd;
	user._doc[req.body.type].transactions = user._doc[
		req.body.type
	].transactions.filter((val) => val.amount != req.body.amount);
	user.markModified(req.body.type);
	await user.save();
	return res.status(400).json(user);
});
router.get("/user", async (req, res) => {
	const user = await Crypto.findOne({ user: "Tudor" });
	res.send(user);
});

router.post("/updateField", async (req, res) => {
	try {
		const user = await Crypto.findOne({ user: req.body.user });
		user._doc[req.body.type][req.body.field] = req.body.value;
		user.markModified(req.body.type);
		await user.save();
		return res.status(200).send(user);
	} catch (e) {
		res.status(400).send(e.message);
	}
});

module.exports = router;
