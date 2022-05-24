import mongoose from "mongoose";

export const dbConnection = () => {
	try {
		const conSting = process.env.MONGO_CLIENT
		const con = mongoose.connect(conSting);

		con && console.log("Connected to MongoDB");
	} catch (error) {
		console.log(error);
	}
};
