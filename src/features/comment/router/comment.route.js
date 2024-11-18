import express from 'express';
import CommentController from '../controller/comment.controller.js';
// ALL varible initialization
let commentRouter = express.Router({ mergeParams: true });
let commentcontroller = new CommentController();

// all routes
commentRouter.get('/',commentcontroller.getAllComment);
commentRouter.post('/',commentcontroller.addComment);
commentRouter.put('/:commentId',commentcontroller.updateComment);
commentRouter.delete('/:commentId',commentcontroller.deleteComment);


// exporting to main index file
export default commentRouter;