const mongoose = require('mongoose');
const { set, connect } = mongoose;

const server = `localhost:27017`;
const database = 'klumie';

const connectDB = async () => {
    try {
	    set("strictQuery", true);

        await connect(`mongodb://${server}/${database}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('MongoDB connected!!');
    } catch (err) {
        console.log('Failed to connect to MongoDB', err);
    }
};

connectDB();

module.exports = mongoose; 