import * as express from 'express';
import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { checkSession } from '../midddlewares/user-check.session';

const newUserController = new UserController();

const router: Router = express.Router();

/* user Api start from here */

/**
* /login/user
* @author Amritpal Singh
* @FinalUrlExample /rest/api/login/user
* @description this route used for login user
*/
router.post(
    '/rest/api/login/user',
    newUserController.loginUser);

/**
* /fetch/user/list
* @author Amritpal Singh
* @FinalUrlExample /rest/api/fetch/user/list
* @description this route used for fetching user list
*/
router.get(
    '/rest/api/fetch/user/list',
    checkSession,
    newUserController.getUserList);

/**
* /update/user
* @author Amritpal Singh
* @FinalUrlExample /rest/api/update/user
* @description this route used for update user
*/
router.put(
    '/rest/api/update/user',
    newUserController.updateUser);

/**
* /create/user
* @author Amritpal Singh
* @FinalUrlExample /rest/api/create/user
* @description this route used for create user
*/
router.post(
    '/rest/api/create/user',
    newUserController.createUser);

/* user Api end here */

export default router;
