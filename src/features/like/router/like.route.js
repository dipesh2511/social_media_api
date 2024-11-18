import express from 'express';
import LikeController from '../controller/like.controller.js';
// ALL varible initialization
let likeRouter = express.Router({ mergeParams: true });
let likecontroller = new LikeController();
// all routes
likeRouter.get('/',likecontroller.getAllLikes);
likeRouter.post('/',likecontroller.addingLike);
likeRouter.put('/',likecontroller.removingLike);



// exporting to main index file
export default likeRouter;