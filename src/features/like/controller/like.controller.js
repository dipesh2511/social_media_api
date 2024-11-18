import LikeModel from "../model/like.model.js";
export default class LikeController {
    getAllLikes(req, res) {
        let post_id = req.params.post_id;
        let result = LikeModel.allLike(post_id);
        res.status(200).send(result)
    }
    addingLike(req, res) {
        let post_id = req.params.post_id;
        let result = LikeModel.like(post_id, req.user.user_id);
        res.status(201).send(result)
    }
    removingLike(req, res) {
        let post_id = req.params.post_id;
        let result = LikeModel.dislike(post_id, req.user.user_id);
        res.status(201).send(result)
    }
}