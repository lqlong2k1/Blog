import { Request, Response, NextFunction } from 'express';
import { ValidationError } from 'express-validation';
import userRouter from './user.routes';
import blogRouter from './blog.routes';
import swaggerRoutes from './swagger.routes';

function route(app: any): void {
    app.use('/swagger', swaggerRoutes);
    app.use('/users', userRouter);
    app.use('/blogs', blogRouter);
    app.use((req: Request, res: Response) => {
        res.status(404).send({
            'Message': 'ERROR: Page not found'
        });
    });
    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
        console.log(err);
        if (err instanceof ValidationError) {
            console.log(err);
            res.status(400).send(err.details[0]);
        }
        res.status(err.statusCode).send({
            'Message': 'ERROR: Something has broken'
        });
    })
}

export default route;