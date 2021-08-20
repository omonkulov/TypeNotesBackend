const jwt = require("jsonwebtoken");

//Verify token
module.exports = function (req, res, next) {
	//Grab auth token from request's header
	const token = req.header("auth-token");
	//If token doesn't exist respond with an error
	if (!token) return res.status(401).send("Access Denied");

	try {
		//If token does exists, verify
		const verified = jwt.verify(token, process.env.TOKEN_SECRET);
		//If token is good, assign it to req's user
		req.user = verified;
	} catch (error) {
		//If it an invalid token, catch will capture the error
		//and send and invalid toke message
		res.status(400).send("Invalid Token");
	}
	//Continue the pipeline
	next();
};
