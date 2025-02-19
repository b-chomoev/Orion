import {NextFunction, Request, Response} from "express";
import {RequestWithUser} from "./auth";

const permit = (...roles: string[]) => {
    return (expressRequest: Request, res: Response, next: NextFunction) => {
        const request = expressRequest as RequestWithUser;

        if (!request.user) {
            res.status(401).send({error: 'Unauthenticated'});
            return;
        }

        if (!roles.includes(request.user.role)) {
            res.status(403).send({error: 'Unauthorized'});
            return;
        }

        next();
    }
};

export default permit;