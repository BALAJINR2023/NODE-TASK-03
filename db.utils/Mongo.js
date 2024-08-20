import { MongoClient } from "mongodb";
import dotenv from 'dotenv';

dotenv.config();

// const dbCluster="localhost:27017";    
const dbCluster = process.env.DB_CULSTER||"task03.3a5m5.mongodb.net";
const dbName = process.env.DB_NAME|| "";
const dbUserName = process.env.DB_USERNAME|| "";
const dbPassword = process.env.DB_PASSWORD|| "";
// const localuri=`mongodb://${dbCluster}/${dbName}`;
const coludUri= `mongodb+srv://${dbUserName}:${dbPassword}@${dbCluster}/${dbName}?retryWrites=true&w=majority&appName=TASK03`;

const client = new MongoClient(coludUri);
const db = client.db(dbName);

const connectDB = async () => {
    try {
        await client.connect();
        console.log('Connected to MongoDB...');
        
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
};
export {db};
export default connectDB;