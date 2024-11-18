// all imports
import express from 'express';
import PostController from '../controller/post.controller.js';
import uploadPostMiddleware from '../../../middleware/postMulter.middleware.js';

// ALL varible initialization
let postRouter = express.Router();
let postcontroller = new PostController();

// all routes
postRouter.get('/all',postcontroller.getAllPost);
postRouter.get('/:post_id',postcontroller.getPost);
postRouter.get('/',postcontroller.getUserPost);
postRouter.post('/',uploadPostMiddleware.array('image',5),postcontroller.uploadPost);
postRouter.delete('/:post_id',postcontroller.deletePost);
postRouter.put('/:post_id',uploadPostMiddleware.array('image',5),postcontroller.updatePost);
// exporting to main index file
export default postRouter;