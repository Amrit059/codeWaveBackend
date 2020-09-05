import * as mongoose from 'mongoose';
import { SERVER } from './environment';

/* mongodb configurations */
class MongooseConfig {
    constructor() {
        console.log('Inside mongodb configuration file')
    }
    init() {
        try {
            console.log('inside init');
            const dbUrl = SERVER.MONGODB_URL
            console.log('inside init before mongo connection');
            mongoose.connect(dbUrl, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false
            });
            const db = mongoose.connection;
            console.log('inside init before mongo debug');
            mongoose.set('debug', true);
            db.on('error', (e) => {
                console.log('error while creating mongodb connection')
                console.error(e)
            })
            db.once('open', () => { console.log('MongoDB connection is created') })
        } catch (error) {
            console.log(error);
        }
    }
}
const mongoConfig = new MongooseConfig();
export default mongoConfig;