import ApplicationError from "../../../middleware/errorHandler.middleware.js";

export default class PostModel {
    constructor(post_id, content, author_id, createdAt, likes, comments, imageAddress, views) {
        this.post_id = `post_${post_id}`;
        this.content = content;
        this.author_id = author_id;
        this.createdAt = createdAt;
        this.likes = likes;
        this.comments = comments;
        this.imageAddress = imageAddress;
        this.views = views;
    }

    static all() {
        return Posts_db;
    }
    static postById(post_id) {
        // checking wether post_id exist or not
        post_id = `post_${post_id}`;
        let find_post = Posts_db.find((post) => {
            return post.post_id == post_id;
        })
        if (!find_post) {
            throw new ApplicationError("No such requested post found", 400);
        }
        return find_post;
    }
    static postByUser(user_id) {
        let find_user_Post = Posts_db.filter((post) => {
            return post.author_id == user_id;
        });
        if (!find_user_Post) {
            throw new ApplicationError("Not Posted Yet", 204);
        }
        return find_user_Post;
    }
    static createPost(content, image, createdAt, user_id) {
        let lastpostid = Posts_db[Posts_db.length - 1].post_id;
        lastpostid = lastpostid.split('_')[1];

        let new_post = new PostModel(
            parseInt(lastpostid) + 1,
            content,
            user_id,
            createdAt,
            {
                totalLikes: 0,
                likedBy: []
            },
            [],
            image,
            0
        )
        Posts_db.push(new_post);
        return new_post;
    }
    static delete(post_id, user_id) {
        post_id = `post_${post_id}`;
        let post = Posts_db.find((p) => {
            return post_id == p.post_id;
        });
        if(!post){
            throw new ApplicationError('No Such post is present' ,404);
        }
        if(post.author_id != user_id){
            throw new ApplicationError('Unauthorized Request',401);
        }
        let postIndex = Posts_db.findIndex((p) => {
            return post_id == p.post_id && user_id == p.author_id;
        });
        Posts_db.splice(postIndex,1);
        return;
    }
    static update(post_id, user_id,content,image,updatedAt) {
        post_id = `post_${post_id}`;
        let post = Posts_db.find((p) => {
            return post_id == p.post_id;
        });
        if(!post){
            throw new ApplicationError('No Such post is present' ,404);
        }
        if(post.author_id != user_id){
            throw new ApplicationError('Unauthorized Request',401);
        }
        let postIndex = Posts_db.findIndex((p) => {
            return post_id == p.post_id && user_id == p.author_id;
        });
        Posts_db[postIndex].content = content;
        Posts_db[postIndex].imageAddress= image;
        if(!Posts_db[postIndex].updatedAt){
            Posts_db[postIndex].updatedAt = updatedAt;
        }
        return;
    }
}


// post dummy database
let Posts_db = [
    new PostModel(
        '1',
        "Exploring JavaScript Closures: An In-Depth Guide",
        'user_1',
        new Date('2024-01-10').toISOString(),
        { totalLikes: 2, likedBy: ['user_2', 'user_3'] },
        [
            { commentId: 1, user_id: 'user_2', content: "Great post!", timestamp: new Date('2024-01-11').toISOString() },
            { commentId: 2, user_id: 'user_3', content: "Very informative, thanks!", timestamp: new Date('2024-01-12').toISOString() }
        ],
        ["https://example.com/js-closures.jpg"],
        150
    ),
    new PostModel(
        '2',
        "Understanding React Hooks and Functional Components",
        'user_2',
        new Date('2024-02-15').toISOString(),
        { totalLikes: 3, likedBy: ['user_1', 'user_5', 'user_6'] },
        [
            { commentId: 3, user_id: 'user_5', content: "This was really helpful!", timestamp: new Date('2024-02-16').toISOString() },
            { commentId: 4, user_id: 'user_6', content: "I needed this, thank you!", timestamp: new Date('2024-02-17').toISOString() }
        ],
        ["https://example.com/react-hooks.jpg"],
        220
    ),
    new PostModel(
        '3',
        "CSS Grid vs. Flexbox: Which One Should You Use?",
        'user_1',
        new Date('2024-03-05').toISOString(),
        { totalLikes: 2, likedBy: ['user_2', 'user_4'] },
        [
            { commentId: 5, user_id: 'user_4', content: "Clear and concise, thanks!", timestamp: new Date('2024-03-06').toISOString() }
        ],
        ["https://example.com/css-grid-flexbox.jpg"],
        85
    ),
    new PostModel(
        '4',
        "Getting Started with Node.js and Express",
        'user_4',
        new Date('2024-03-20').toISOString(),
        { totalLikes: 3, likedBy: ['user_2', 'user_3', 'user_5'] },
        [
            { commentId: 6, user_id: 'user_3', content: "Node is awesome!", timestamp: new Date('2024-03-21').toISOString() }
        ],
        ["https://example.com/node-express.jpg"],
        175
    ),
    new PostModel(
        '5',
        "Top 10 Tips for Writing Clean Code",
        'user_5',
        new Date('2024-04-01').toISOString(),
        { totalLikes: 4, likedBy: ['user_1', 'user_3', 'user_4', 'user_6'] },
        [
            { commentId: 7, user_id: 'user_1', content: "Really useful tips!", timestamp: new Date('2024-04-02').toISOString() }
        ],
        ["https://example.com/clean-code.jpg"],
        290
    ), new PostModel(
        '6',
        "Building Scalable Applications with Node.js",
        'user_6',
        new Date('2024-05-05').toISOString(),
        { totalLikes: 2, likedBy: ['user_1', 'user_2'] },
        [
            { commentId: 8, user_id: 'user_1', content: "Fantastic insights on scalability!", timestamp: new Date('2024-05-06').toISOString() }
        ],
        ["https://example.com/scalable-apps.jpg"],
        310
    ),
    new PostModel(
        '7',
        "A Deep Dive into TypeScript: Benefits and Use Cases",
        'user_6',
        new Date('2024-06-10').toISOString(),
        { totalLikes: 3, likedBy: ['user_2', 'user_3', 'user_5'] },
        [
            { commentId: 9, user_id: 'user_3', content: "TypeScript has changed my coding style for the better!", timestamp: new Date('2024-06-11').toISOString() },
            { commentId: 10, user_id: 'user_5', content: "Great post, thanks for sharing!", timestamp: new Date('2024-06-12').toISOString() }
        ],
        ["https://example.com/typescript-guide.jpg"],
        420
    ),
    new PostModel(
        '8',
        "Understanding Asynchronous Programming in JavaScript",
        'user_6',
        new Date('2024-07-15').toISOString(),
        { totalLikes: 3, likedBy: ['user_1', 'user_4', 'user_2'] },
        [
            { commentId: 11, user_id: 'user_4', content: "Asynchronous programming can be tricky, great breakdown!", timestamp: new Date('2024-07-16').toISOString() }
        ],
        ["https://example.com/async-programming.jpg"],
        500
    )
];

export {Posts_db};