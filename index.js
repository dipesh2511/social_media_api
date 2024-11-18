// all third party exports are here
import express, { json } from 'express';
import path from 'path';
import swagger from 'swagger-ui-express';
import swaggerdocs from './swagger.json' assert {type: 'json'};

// all user defined imports
import userRouter from './src/features/user/router/user.router.js';
import postRouter from './src/features/post/router/post.router.js';
import commentRouter from './src/features/comment/router/comment.route.js';
import likeRouter from './src/features/like/router/like.route.js';
import loggermiddleware from './src/middleware/winstonlogger.middleware.js'
import errorloggermiddleware from "./src/middleware/errorLogger.middleware.js"

import ApplicationError from './src/middleware/errorHandler.middleware.js';
import jwtVerificationMiddleware from './src/middleware/jwtVerification.middleware.js';
import { type } from 'os';

// variable declaration
let server = express();

// for static file 
server.use(express.static((path.join(path.resolve(), 'public', 'postImages'))))

// middleware for parsing the data in readahle formate
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

// routes are defined here
server.use('/api/user', userRouter);
server.use('/api-docs', swagger.serve, swagger.setup(swaggerdocs));
server.use('/api/post', jwtVerificationMiddleware, loggermiddleware, postRouter);
server.use('/api/post/:post_id/comment', jwtVerificationMiddleware, loggermiddleware, commentRouter);
server.use('/api/post/:post_id/like', jwtVerificationMiddleware, loggermiddleware, likeRouter);


// error handler middleware
server.use((err, req, res, next) => {
    if (err instanceof ApplicationError) {
        res.status(err.code).send(err.message);
    }
    errorloggermiddleware(err,req,res,next);
    console.log(err)
    res.status(500).send("Something went wrong sorry for inconvinence")
})

// default request when no url matches
server.use((req, res) => {
    res.status(404).redirect('/api-docs')
})
export default server;