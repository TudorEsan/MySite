const jwt = require("jsonwebtoken");
const { default: UserLogic } = require("../functions/UserLogic");

module.exports = async function (req, res, next) {
    const authorizaton = req.header("Authorization");
    if (!authorizaton) {
        return res.status(401).json({ message: "Tokens required!"})
    }
    const [token, refreshToken] = authorizaton.split(" ");
	try {
		if (!token) return res.status(404).json({ message: "Access Denied!" });
		const verifyToken = jwt.verify(token, process.env.TOKEN_SECRET);
		if (verifyToken) {
			const [
				newToken,
				newRefreshToken,
			] = await UserLogic.regenerateTokenAndRefreshToken(
				req.body.user,
				refreshToken
			);
			res.header("Authorization", newToken + " " + newRefreshToken);
			next();
		}
	} catch (e) {
		if (e.name === "TokenExpiredError") {
			try {
				const [
					newToken,
					newRefreshToken,
				] = await UserLogic.regenerateTokenAndRefreshToken(
					req.body.user,
					refreshToken
				);
				res.header("Authorization", newToken + " " + newRefreshToken);
				next();
			} catch (e) {
				if (e.message === "401") {
					return res.status(401).json("Unauthorized");
				} else {
					return res.status(400).json({ message: e.message });
				}
			}
			if (!refreshToken) {
				return res
					.status(404)
					.json({ message: "Refresh Token missing" });
			}
		} else {
			return res.status(400).json({ message: e.message });
		}
	}
};
