//Read Environment Variables
require("dotenv").config();
//Express
const express = require("express");
//Express Object
const app = express();
//Enable Cross Origin Resource Sharing
const cors = require("cors");
//Mongoos: MongoDB object modeling for node.js & Driver
const mongoose = require("mongoose");
//Routes
const userRoute = require("./routes/user_routes");

//Middleware
app.use(cors({ exposedHeaders: "auth-token" }));
app.use(express.json());
app.use(
	express.urlencoded({
		extended: true,
	})
);

//Middleware Routes
app.use("/user", userRoute);

//Connect to DB
const mongooseOptions = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true,
};
mongoose.connect(process.env.DB_URI, mongooseOptions, () => {
	console.log("Server connected to the database");
});

//Port
const PORT = 3001;
app.listen(PORT, () => console.log(`Server is up and running at port ${PORT}`));
