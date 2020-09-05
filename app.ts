import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Request, Response, NextFunction } from 'express';
import * as cors from 'cors';
import mongoConfig from './configuration/mongodb.config';
import initRoutes from './router/index'
import { SERVER } from './configuration/environment'
import * as path from 'path';

const app = express();

app.set('port', SERVER.PORT);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (request: Request, response: Response, next: NextFunction) => {
  console.log('Server is working perfectly');
  response.send('Server is working perfectly');
});

console.log('before mongodb init');
mongoConfig.init();

/* router index for api call */
app.use(initRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log('inside error handller');
  res.status(500).json({ error: 'Error Handler' });
});

app.listen(app.get('port'), () => {
  console.log(('App is running at http://localhost:%d in %s mode'),
    app.get('port'), app.get('env'));
  console.log('Press CTRL-C to stop\n');
});

export default app;