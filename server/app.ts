import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose'
import router from './src/routes'
import { json } from 'body-parser'

import { dbConfig } from './src/config/db.config'
import { corsMiddleware } from './src/middlewares/cors.middleware'
import { HttpError } from './src/utils/http-error';


const app = express();
app.use(json())
if (process.env.NODE_ENV !== 'production') {
    app.use(corsMiddleware);
}

app.use(router)
app.use((error: HttpError, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
        return next(error)
    }
    res.status(error.code || 500);
    res.json({ message: error.message || 'An unknown error occurred!' })

});
mongoose.connect(dbConfig.url).then(() => {
    app.listen(process.env.PORT || 3200);
}).catch((error: any) => {
    console.log(error)
})


