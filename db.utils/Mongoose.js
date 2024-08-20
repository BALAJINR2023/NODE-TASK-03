import mongoose from "mongoose";
// const dbCluster="localhost:27017";    
const dbCluster = process.env.DB_CULSTER||"task03.3a5m5.mongodb.net";
const dbName = process.env.DB_NAME|| "";
const dbUserName = process.env.DB_USERNAME|| "";
const dbPassword = process.env.DB_PASSWORD|| "";
// const localuri=`mongodb://${dbCluster}/${dbName}`;
const coludUri= `mongodb+srv://${dbUserName}:${dbPassword}@${dbCluster}/${dbName}?retryWrites=true&w=majority&appName=TASK03`;

const MongooseconnectDB = async () => {
    try {
        await mongoose.connect(coludUri);
        console.log('Connected to MongooseDB...');
    } catch (error) {
        console.error('Error connecting to MongooseDB:', error.message);
        process.exit(1);
    }
};

export default MongooseconnectDB;