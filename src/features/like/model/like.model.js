import ApplicationError from "../../../middleware/errorHandler.middleware.js";
import { Posts_db } from "../../post/model/post.model.js";
import { Users_db } from "../../user/model/user.model.js";

export default class LikeModel {
    static allLike(post_id) {
        post_id = `post_${post_id}`;
        let find_post = Posts_db.find((post) => {
            return post.post_id == post_id;
        })
        if (!find_post) {
            throw new ApplicationError("No requested Post is present", 400);
        }
        let users = [];
        for (let liked_by_id of find_post.likes.likedBy) {
            Users_db.filter((user) => {
                if (liked_by_id == user.user_id) {
                    users.push(user.name)
                }
            })
        }
        console.log(users)
        if (!users) {
            return "No Likes"
        }
        return {
            totalLikes: find_post.likes.totalLikes,
            likedBy: users
        };
    }
    static like(post_id, user_id) {
        post_id = `post_${post_id}`;
        let find_post = Posts_db.find((post) => {
            return post.post_id == post_id;
        })
        if (!find_post) {
            throw new ApplicationError("No requested Post is present", 400);
        }
        let find_user = Users_db.find((user) => {
            return user.user_id == user_id;
        })
        if (!find_user) {
            throw new ApplicationError("No Such user is present", 400);
        }

        let liked_by_find_user = find_post.likes.likedBy.find((id) => {
            return user_id == id;
        })
        if (liked_by_find_user) {
            throw new ApplicationError("User Already liked the post", 200);
        } else {
            find_post.likes.likedBy.push(user_id);
            find_post.likes.totalLikes = parseInt(find_post.likes.totalLikes) + 1;
            return find_post.likes;
        }
    }
    static dislike(post_id, user_id) {
        post_id = `post_${post_id}`;
        let find_post = Posts_db.find((post) => {
            return post.post_id == post_id;
        })
        if (!find_post) {
            throw new ApplicationError("No requested Post is present", 400);
        }
        let find_user = Users_db.find((user) => {
            return user.user_id == user_id;
        })
        if (!find_user) {
            throw new ApplicationError("No Such user is present", 400);
        }

        let liked_by_find_user = find_post.likes.likedBy.findIndex((id) => {
            return user_id == id;
        })
        if (liked_by_find_user != -1) {
            find_post.likes.likedBy.splice(liked_by_find_user,1);
            find_post.likes.totalLikes = parseInt(find_post.likes.totalLikes) - 1;
            return find_post.likes;
        } else {
            throw new ApplicationError("User not liked the post", 200);
       
        }
    }
}
