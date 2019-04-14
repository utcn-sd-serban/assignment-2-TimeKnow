
import { EventEmitter } from "events";
import seed from '../seeder/seed'
import {permissionAdmin} from './UserModel'
const typeQuestion = "QUESTION";
const typeAnswer = "ANSWER";

class PostModel extends EventEmitter {
    constructor() {
        super();
        this.state = {
            postList:[

            ],
            newPost:{
                tags: [],
                title: "",
                body: ""
            },
            editedPost:{
                id:-1,
                body:""
            },
            currentPost: null,
            currentPostAnswers: [],
            ownerEditablePosts : [],
        };
        this.propertyContentMapper = {
            tags: "tags",
            title: "title",
            body: "body"
        };
        this.importFromSeed();
    }

    importFromSeed(){
        this.state = {
            ...this.state,
            postList: this.state.postList.concat(seed.seedPostList),
        };
        this.emit("change", this.state);
    }

    votePost(voteType, id){
        const postReference = this.state.postList.filter(x=>x.id===id)[0];

        if(postReference===null)
            return;

        postReference[voteType] += 1;

        postReference.score = postReference.upVotes-postReference.downVotes;

        this.emit("change", this.state);
    }

    changeCurrentPost(id){
        this.state.currentPost = this.state.postList.filter(x=>x.type===typeQuestion && x.id===id)[0];
        this.state.currentPostAnswers = this.state.postList.filter(x=>x.type===typeAnswer && x.parent===this.state.currentPost);
        this.emit("change", this.state);
    }

    changeOwnerPosts(user){
        if(user.permission!==permissionAdmin) {
            this.state.ownerEditablePosts = this.state.postList.filter(x => x.type === typeAnswer && x.author === user);
        }
        else {
            this.state.ownerEditablePosts = this.state.postList;

        }
        this.emit("change", this.state);
    }

    clearNewPost() {
        this.state.newPost = {
            type: null,
            author: null,
            parent: null,
            tags: [],
            date:"",
            title: "",
            body: ""
        };
        this.emit("change", this.state);
    }

    deletePost(id){
        this.state.postList = this.state.postList.filter(x=>x.id!==id);
        this.state.ownerEditablePosts = this.state.ownerEditablePosts.filter(x=>x.id!==id);
        this.emit("change", this.state);
    }

    createPost(type,title, body, author, parent, tags){

        const newId = this.state.postList.map(x=>x.id).reduce((maxId, x)=>Math.max(maxId, x), -1) + 1;
        const currentDate = new Date().toJSON().slice(0,10).replace(/-/g,'/');
        const summary = body.substr(0, 40);
        this.state = {
            ...this.state,
            postList: this.state.postList.concat([{
                id: newId,
                type: type,
                author: author,
                parent: parent,
                tags: tags,
                date: currentDate,
                title: title,
                summary: summary,
                body: body,
                upVotes: 0,
                downVotes: 0,
                score: 0,
            }])
        };
        this.emit("change", this.state);
    }

    refreshEditingPostContent(id){
        const post = this.state.postList.filter(x=>x.id===id)[0];
        if(post===null)
            return;
        this.state.editedPost = {
            id:post.id,
            body:post.body
        };
        this.emit("change", this.state);
    }

    editPost(postId, property, value){
        const post = this.state.postList.filter(x=>x.id===postId)[0];

        if(post===null)
            return;

        post[property]=value;

        this.emit("change", this.state);
    }

    updateSummary(postId){
        const post = this.state.postList.filter(x=>x.id===postId)[0];

        if(post===null)
            return;

        post.summary = post.body.substr(0, 40);
    }

    changeEditedPostProperty(property, value){
        this.state = {
            ...this.state,
            editedPost:{
                ...this.state.editedPost,
                [property]: value
            }
        };
        this.emit("change", this.state);
    }

    changeNewPostProperty(property, value) {
        this.state = {
            ...this.state,
            newPost: {
                ...this.state.newPost,
                [property]: value
            }
        };
        this.emit("change", this.state);
    }

}

const postModel = new PostModel();

export default postModel;
export {typeQuestion, typeAnswer};