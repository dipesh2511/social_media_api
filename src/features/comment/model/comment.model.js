import { Posts_db } from "../../post/model/post.model.js";
import ApplicationError from "../../../middleware/errorHandler.middleware.js";



export default class CommentModel {

    constructor(commentId, user_id, content, timestamp) {
        this.commentId = commentId;
        this.user_id = user_id;
        this.content = content;
        this.timestamp = timestamp;
    }
    static getAll(post_id) {
        post_id = `post_${post_id}`;
        let find_post = Posts_db.find((post) => {
            return post.post_id == post_id;
        })
        // no requested post is availale
        if (!find_post) {
            throw new ApplicationError("No such post is present", 400);
        }
        if (find_post.comments.length <= 0) {
            return "No Comments yet";
        }
        return find_post.comments;
    }

    static add(post_id, content, createdAt, user_id) {
        post_id = `post_${post_id}`;
        let post_index = Posts_db.findIndex((post) => {
            return post.post_id == post_id;
        })
        // no requested post is availale
        if (post_index == -1) {
            throw new ApplicationError("No such post is present", 400);
        }

        let lastCommentId = Comment_db[Comment_db.length - 1].commentId;
        let newComment = new CommentModel(
            parseInt(lastCommentId) + 1,
            user_id,
            content,
            new Date(createdAt).toISOString()
        );
        console.log(newComment)
        Comment_db.push(newComment);
        Posts_db[post_index].comments.push(newComment);
        return newComment;
    }

    static update(post_id, content, commentId, user_id) {
        //   checking if comment with commentId present or not
        post_id = `post_${post_id}`;
        let find_comment = Comment_db.find((comment) => {
            return comment.commentId == commentId;
        })

        if (!find_comment) {
            throw new ApplicationError('No such comment is present', 400);
        }

        if (find_comment.user_id != user_id) {
            throw new ApplicationError('You do not have access to update comment not posted by you', 400);
        }
        // updating comment in data base
        let updateAt = new Date().toISOString();
        find_comment.content = content;
        find_comment.updateAt = updateAt;

        // updating updated comment in post id as well
        let find_post = Posts_db.find((post) => {
            return post.post_id == post_id;
        });

        if (!find_post) {
            throw new ApplicationError("No such post is present", 400);
        }

        let comment_obj = find_post.comments.find((comment) => {
            return comment.commentId == commentId;
        });
        comment_obj.content = content;
        comment_obj.updateAt = updateAt;
        return comment_obj;
    }
    static delete(post_id, commentId, user_id) {
        post_id = `post_${post_id}`;
        let find_comment_index = Comment_db.findIndex((comment) => {
            return comment.commentId == commentId;
        })

        if (find_comment_index <= 0) {
            throw new ApplicationError("no such comment is presnt", 400)
        }

        if (Comment_db[find_comment_index].user_id != user_id) {
            throw new ApplicationError("Comment not Posted by you can't delete", 401);
        }

        Comment_db.splice(find_comment_index, 1);

        let find_post = Posts_db.find((post) => {
            return post.post_id == post_id;
        });

        if (!find_post) {
            throw new ApplicationError('No such post is available', 404);
        }

        let comment_index = find_post.comments.findIndex((comment) => {
            return comment.commentId == commentId
        })
        find_post.comments.splice(comment_index, 1);
        return "successfully deleted the comment";


    }

}

let Comment_db = [
    { commentId: 1, user_id: 'user_2', content: "Great post!", timestamp: new Date('2024-01-11').toISOString() },
    { commentId: 2, user_id: 'user_3', content: "Very informative, thanks!", timestamp: new Date('2024-01-12').toISOString() },
    { commentId: 3, user_id: 'user_5', content: "This was really helpful!", timestamp: new Date('2024-02-16').toISOString() },
    { commentId: 4, user_id: 'user_6', content: "I needed this, thank you!", timestamp: new Date('2024-02-17').toISOString() },
    { commentId: 5, user_id: 'user_4', content: "Clear and concise, thanks!", timestamp: new Date('2024-03-06').toISOString() },
    { commentId: 6, user_id: 'user_3', content: "Node is awesome!", timestamp: new Date('2024-03-21').toISOString() },
    { commentId: 7, user_id: 'user_1', content: "Really useful tips!", timestamp: new Date('2024-04-02').toISOString() },
    { commentId: 8, user_id: 'user_1', content: "Fantastic insights on scalability!", timestamp: new Date('2024-05-06').toISOString() },
    { commentId: 9, user_id: 'user_3', content: "TypeScript has changed my coding style for the better!", timestamp: new Date('2024-06-11').toISOString() },
    { commentId: 10, user_id: 'user_5', content: "Great post, thanks for sharing!", timestamp: new Date('2024-06-12').toISOString() },
    { commentId: 11, user_id: 'user_4', content: "Asynchronous programming can be tricky, great breakdown!", timestamp: new Date('2024-07-16').toISOString() }
]