import postModel, {typeAnswer, typeQuestion} from '../model/PostModel'
import userModel from '../model/UserModel'
import tagModel from '../model/TagModel'

class PostManagementPresenter{
    onChangeTagsEvent(tagsString){
        postModel.changeNewPostProperty(postModel.propertyContentMapper.tags, tagsString.split(',')
            .map(x=>x.replace(" ", "")));
    }

    onChangePropertyEvent(property, value){
        postModel.changeNewPostProperty(property, value);
    }

    onCreateQuestionEvent(){
        tagModel.createByTagList(postModel.state.newPost.tags);
        postModel.createPost(
            typeQuestion,
            postModel.state.newPost.title,
            postModel.state.newPost.body,
            userModel.state.currentUser,
            null,
            postModel.state.newPost.tags);
        postModel.clearNewPost();
        window.location.assign("#/");
    }

    onCreateAnswerEvent(){
        postModel.createPost(
            typeAnswer,
            "",
            postModel.state.newPost.body,
            userModel.state.currentUser,
            postModel.state.currentPost,
            []);
        postModel.changeCurrentPost(postModel.state.currentPost.id);
        postModel.clearNewPost();
    }

    onUpVoteEvent(id){
        postModel.votePost("upVotes", id);
    }

    onDownVoteEvent(id){
        postModel.votePost("downVotes", id);
    }

    refreshOwnerPostList(){
        postModel.changeOwnerPosts(userModel.state.currentUser);
    }

    refreshEditedPost(id){
        postModel.refreshEditingPostContent(parseInt(id));
    }

    onChangeEditedPostContentEvent(value){
        postModel.changeEditedPostProperty(postModel.propertyContentMapper.body, value);
    }

    onEditPostFinishedEvent(){
        postModel.editPost(postModel.state.editedPost.id, postModel.propertyContentMapper.body, postModel.state.editedPost.body);
        postModel.updateSummary(postModel.state.editedPost.id);
        postModel.changeEditedPostProperty(postModel.propertyContentMapper.body, "");
        postModel.changeEditedPostProperty(postModel.propertyContentMapper.id, -1);
        const url = "#/dashboard";
        window.location.assign(url);
    }

    editPostEvent(id){
        const url = "#/dashboard/edit/" + id;
        window.location.assign(url);
    }

    deletePostEvent(id){
        postModel.deletePost(parseInt(id));
    }

    mapCurrentPostEvent(id){
        postModel.changeCurrentPost(parseInt(id));
    }
}

const postManagementPresenter = new PostManagementPresenter();

export default postManagementPresenter;