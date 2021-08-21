const router = require("express").Router();
//JSON Web Token provider
const jwt = require("jsonwebtoken");
//Mongoose Schema
const User = require("../model/user");
const Collection = require("../model/collection");

//Verify Tokens
const verify = require("./verify-token");

//Top collections by votes (limit = 50)
router.get("/top/:limit", verify, async (req, res) => {
	let limit = parseInt(req.params.limit);
	//max is 50
	limit = limit > 50 ? 50 : Math.abs(limit);
	if (limit) {
		const topCollections = await Collection.find({ public: true }).sort({ votes: -1 }).limit(limit);
		res.send(topCollections);
	} else {
		res.send({ limit: limit });
	}
});

//Search Collection
router.post("/search", verify, async (req, res) => {
	res.send("Nice");
});

//Create Collection
router.post("/create", verify, async (req, res) => {
	let title = req.body.title;
	let desc = req.body.desc;
	let cards = req.body.cards;
	if (!title) {
		res.status(400).send('"title" is required');
		return;
	}
	//Check if user exists before creating collection
	//User could have been deleted from database or by user's choice
	const user = await User.findOne({ _id: req.user._id });
	if (!user) {
		res.status(400).send("user does not exist");
		return;
	}
	const collection = new Collection({
		title: title,
		desc: desc ? desc : "This collection does not have a description.",
		cards: cards ? [...cards] : [],
		owner: req.user._id,
	});
	user.collections.push(collection);
	await collection.save();
	await user.save();
	res.send("");
});

//Add a card or cards to existing collection
router.post("/add", verify, async (req, res) => {
	if (!req.body.collectionId) {
		res.send("No collection Id");
		return;
	}
	if (!req.body.cards || req.body.cards.length === 0) {
		res.send("No cards");
		return;
	}
	const collection = await Collection.findById(req.body.collectionId);
	collection.cards = collection.cards.concat(req.body.cards);
	await collection.save();
	res.send("Found it");
});

//Remove a card or cards in an existing collection
router.post("/remove", verify, async (req, res) => {
	if (!req.body.collectionID) {
		res.send("No collection Id");
		return;
	}
	if (!req.body.cardIDs || req.body.cardIDs.length === 0) {
		res.send("No cards");
		return;
	}
	const collection = await Collection.findById(req.body.collectionID);
	collection.cards = collection.cards.filter((obj, i) => {
		console.log(req.body.cardIDs.includes(obj._id + ""));
		return !req.body.cardIDs.includes(obj._id + "");
	});

	await collection.save();
	res.send("Found it");
});

//Edit card
router.post("/edit", async (req, res) => {
	const collection = await Collection.findById(req.body.collectionID);
	const index = collection.cards.findIndex((obj) => obj._id + "" === req.body.cardID);
	let test = collection.cards[index];
	test.answer = req.body.answer;
	test.question = req.body.question;
	collection.cards[index] = test;
	await collection.save();
	res.send("Found it");
});

module.exports = router;

/**
 * - Search Collection
 * - Create Collection
 * - Edit Collection
 * - Add Flashcard
 * - Edit Flashcard
 * - Delete Collection
 * - NewBest collection
 * -  TODO: REMOVE numOfWords
 */
