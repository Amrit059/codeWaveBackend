import { Request, Response, NextFunction } from 'express';
import { UserModel, UserDocument } from '../models/user.model';
import { UtillServices } from '../utill.service';
import * as moment from 'moment';
import { createJsonWebToken } from '../jwt-token.service';


const utillServices: UtillServices = new UtillServices();

export class UserController {
    constructor() {
        console.log('User Controller called');
    }

    async loginUser(req: Request, res: Response, next: NextFunction) {
        try {
            let userModel: UserDocument = req.body;
            userModel = await UserModel.findOne({
                email: userModel.email
            }).exec();
            if (utillServices.decodeBase64(userModel.password) === utillServices.decodeBase64(userModel.password)) {
                userModel.set('token', `Bearer ${createJsonWebToken(userModel)}`, { strict: false });
                res.status(200).send(userModel);
            } else {
                res.status(404).send({ message: 'invalid credential!' });
            }
        } catch (err) {
            console.error(err);
            res.status(500).send({ message: err });
        }
    }

    async getUserList(req: Request, res: Response, next: NextFunction) {
        const page: Number = Number(req.query.page) ? Number(req.query.page) : 1;
        const limit: Number = Number(req.query.limit) ? Number(req.query.limit) : 30;
        const search_term = req.query.search_term;
        const sortedBy: string = req.query.sortedBy ? String(req.query.sortedBy) : "createdAt";
        const orderBy = req.query.orderBy ? Number(req.query.orderBy) : -1;
        let sort = {};
        sort[sortedBy] = orderBy;
        let query = {};
        if (!search_term ||
            search_term === '' ||
            search_term == "undefined" ||
            search_term == null ||
            search_term == 'null'
        ) {
            query = {}
        } else {
            query['$or'] = [
                { name: new RegExp(".*" + search_term + ".*", "i") },
                { phoneNo: new RegExp(".*" + search_term + ".*", "i") },
                { email: new RegExp(".*" + search_term + ".*", "i") },
            ]
        }
        try {
            const userModel: UserDocument[] = await UserModel.find(query, {
                _id: 1, name: 1, email: 1, phoneNo: 1, gender: 1, dob: 1, isActive: 1, about: 1
            }).sort(sort)
                .skip(Number(limit) * (Number(page) - 1))
                .limit(Number(limit)).exec();
            res.status(200).send(userModel);
        } catch (err) {
            console.error(err);
            res.status(500).send({ message: err });
        }
    }

    async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            let userModel: UserDocument = req.body;
            userModel.dob = moment(new Date(userModel.dob), "YYYY-MM-DD").toDate();
            userModel.password = utillServices.encodeBase64(userModel.password)
            userModel = new UserModel(userModel);
            userModel = await userModel.save()
            res.status(200).send(userModel);
        } catch (err) {
            console.error(err);
            res.status(500).send({ message: err });
        }
    }

    async updateUser(req: Request, res: Response, next: NextFunction) {
        try {
            let userModel: UserDocument = req.body;
            userModel = await UserModel.findByIdAndUpdate({ _id: userModel._id }, userModel).exec();
            res.status(200).send(userModel);
        } catch (err) {
            console.error(err);
            res.status(500).send({ message: err });
        }
    }

}