const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
	question: {
		type: String,
		default: "Untitled",
		require: true,
	},
	best: {
		wpm: {
			type: Number,
			default: 0,
		},
		accuracy: {
			type: Number,
			default: 0,
		},
		timesFinished: {
			type: Number,
			default: 0,
		},
	},
	answer: {
		type: String,
		default: "Blank",
		require: true,
	},
});

const collectionSchema = new mongoose.Schema(
	{
		votes: {
			type: Number,
			default: 1,
		},
		title: {
			type: String,
			default: "Unnamed",
		},
		cards: [cardSchema],
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Collection", collectionSchema);
