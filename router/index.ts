import * as express from 'express';
import { Router } from 'express';
import UserRoutes from './users.router';

const router: Router = express.Router();

const routePagePath = [].concat(
    UserRoutes
);

/* Rest Api with version*/

router.use(routePagePath);

export default router;
