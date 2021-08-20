const router = require("express").Router();
//JSON Web Token provider
const jwt = require("jsonwebtoken");
//Bcrytp helps hashing passwords
const bcrypt = require("bcrypt");
//Mongoose Schema
const User = require("../model/user");
const Collection = require("../model/collection");
//JOI Validaton, throws descriptive errors if request is wrong
const { registerValidation, loginValidation } = require("../validation");

//Saling rounds
const bcryptSaltRounds = 10;

//Sign up
router.post("/sign-up", async (req, res) => {
	//Validate Data
	const registerValidate = registerValidation(req.body);
	if (registerValidate.error) return res.status(400).send(registerValidate.error.details[0].message);

	//Check if username is already in the database
	const usernameExist = await User.findOne({ username: req.body.username });
	if (usernameExist) return res.status(400).send("username already exist");

	//Hashing the password
	const salt = await bcrypt.genSalt(bcryptSaltRounds);
	const hashedPassword = await bcrypt.hash(req.body.password, salt);

	//Default Collection
	const collection = new Collection({
		cards: [{ question: "Something", answer: "Sjos" }],
	});

	//Create New User Ojb
	const user = new User({
		username: req.body.username,
		hashedPassword: hashedPassword,
		collections: collection,
	});

	try {
		//Try Save to database
		await collection.save();
		const savedUser = await user.save();
		//Generate Token
		const token = jwt.sign({ _id: savedUser._id }, process.env.TOKEN_SECRET);
		//Set Client's headr auth-token with the jwt token
		res.header("auth-token", token).send({ id: user._id, username: user.username });
	} catch (error) {
		console.log(error);
		res.status(400).send(error);
	}
});

//Sign in
router.post("/sign-in", async (req, res) => {
	res.send(error.BadParamsError);
});

//Change Password
router.patch("/change-password", (red, res) => {
	res.send("Change Password");
});

module.exports = router;
