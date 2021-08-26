## Description

---

Backend for the Typenote application. Uses MongoDB for the database, and mongoose for connection. Express web framework for handling requests. Currently, I have no plans to expose any end points to the public. Every post method should be JSON.

## Authentication

---

For authentication there are two end points

-   Creating a new account: `/user/sign-up`
-   Signing an existing user: `/user/sign-in`

#### Sign-up

For signing up or creating a new account, `/user/sign-up` path should be used.
Method: **POST**
Format:

```JSON
{
	"username": "exmaple101",
	"password": "thisismypassword"
}
```

ERRORS:

-   `"username" is required`
-   `"password" is required`
-   `"username" length must be at least 3 characters long`
-   `"password" length must be at least 6 characters long`

SUCCESS:

-   If successful, express will set header with key "auth-token" and value as generated and signed JSON Web token.

#### Sign-In

For logging or signing with an existing account, `/user/sign-in` path should be used.
Method: **POST**
Format:

```JSON
{
	"username": "exmaple101",
	"password": "thisismypassword"
}
```

ERRORS:

-   `"username" is required`
-   `"password" is required`
-   `Username does not exist`
-   `Invalid password`

## Authorization

---

Every request should be send with "auth-token" header with valid token. Otherwise `Invalid token` error is sent.

```bash
curl POST --header "auth-token: <token>" ....
```

## Collection

---

Collections are basically array of flashcards that users can type out.

Mongoose Collection Schema:

```js
{
	votes: {
		type: Number,
		default: 1,
	},
	title: {
		type: String,
		default: "Title",
	},
	desc: {
		type: String,
		default: "This collection does not have a description.",
	},
	words: {
		type: Number,
		default: 0,
	},
	public: {
		type: Boolean,
		default: true,
	},
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	cards: [cardSchema],
};
```

Card schema is not saved in saved in mongoDB as stand alone collection for performance reasons.

Mongoose cardSchema:

```js
{
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
}
```

#### Get top _x_ of collections

To get top voted collections , 
`/collection/top/:limit` path should be used.

Method: **GET**
Format:

```js
.../collection/top/10  //To get top 10 by votes
```
