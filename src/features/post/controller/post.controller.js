import PostModel from '../model/post.model.js'
export default class PostController {
    // gettin all post
    getAllPost(req, res) {
        let result = PostModel.all();
        res.status(200).send(result);
    }
    // post serched by id
    getPost(req, res) {
        let { post_id } = req.params;
        let post = PostModel.postById(post_id);
        res.status(200).send(post);
    }
    // post based on user credetials
    getUserPost(req, res) {
        let result = PostModel.postByUser(req.user.user_id);
        res.status(200).send(result);
    }
    // uploadpost
    uploadPost(req, res) {
        let { content } = req.body;
        let image = req.files.map((file) => {
            return file.filename;
        });
        let createdAt = new Date().toLocaleString().split('T')[0];
        let result = PostModel.createPost(content, image, createdAt, req.user.user_id);
        res.status(201).send(result);
    }
    // deleteing post
    deletePost(req,res){
        let {post_id} = req.params;
        PostModel.delete(post_id,req.user.user_id);
        res.status(200).send("Successfully Removed the post");
    }

    // updatind post
    updatePost(req,res){
        let { content } = req.body;
        let {post_id} = req.params;
        let image = req.files.map((file) => {
            return file.filename;
        });
        let updatedAt = new Date().toLocaleString().split('T')[0];
        let result = PostModel.update(post_id,req.user.user_id,content, image, updatedAt);
        res.status(201).send("Successfully Updated the post");
    } 
  
 }