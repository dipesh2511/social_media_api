
import CommentModel from "../model/comment.model.js";
export default class CommentController {
    getAllComment(req, res) {
        let post_id = req.params.post_id;
        let result = CommentModel.getAll(post_id);
        res.status(200).send(result);
    }
    addComment(req, res) {
        let { content } = req.body;
        let post_id = req.params.post_id;
        let createdAt = new Date().toISOString().split('T')[0];
        let result = CommentModel.add(post_id, content, createdAt, req.user.user_id);
        res.status(201).send(result)
    }
    updateComment(req, res) {
        let { content } = req.body;
        let {post_id,commentId} = req.params;
        let result = CommentModel.update(post_id,content,commentId,req.user.user_id);
        res.status(200).send(result)

    }
    deleteComment(req, res) {
        let {post_id,commentId} = req.params;
        let result = CommentModel.delete(post_id,commentId,req.user.user_id);
        res.status(200).send(result)
    }
}