const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
			min: 3,
			max: 255,
		},
		hashedPassword: {
			type: String,
			required: true,
			max: 1024,
			min: 6,
		},
		date: {
			type: Date,
			default: Date.now,
		},
		best: {
			wpm: { type: Number, default: 0 },
			accuracy: { type: Number, default: 0 },
			timeSecs: { type: Number, default: 0 },
		},
		collections: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Collection",
			},
		],
	},
	{
		timestamps: true,
		toObject: {
			// remove `hashedPassword` field when we call `.toObject`
			transform: (_doc, user) => {
				delete user.hashedPassword;
				return user;
			},
		},
	}
);
module.exports = mongoose.model("User", userSchema);
