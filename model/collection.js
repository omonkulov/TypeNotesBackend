const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
	question: {
		type: String,
		default: "Untitled",
		require: true,
	},
	answer: {
		type: String,
		default: "Blank",
		require: true,
	},
	numOfWords: {
		type: Number,
		required: true,
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
		desc: {
			type: String,
			default: "This collection does not have a description.",
		},
		cards: [cardSchema],
		public: {
			type: Boolean,
			default: true,
		},
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Collection", collectionSchema);
