import { EventEmitter } from "events";
import postModel, {typeQuestion} from './PostModel'
import tagModel from "./TagModel";

const searchTypeTitle = "By Title";
const searchTypeTag = "By Tag";

class SearchModel extends EventEmitter {
    constructor() {
        super();
        this.state = {
            suggestionList : [],
            filteredPosts : [],
            currentSearch : "",
            searchType : searchTypeTitle
        };

        this.propertyContentMapper = {
            suggestionList : "suggestionList",
            currentSearch : "currentSearch",
            searchType : "searchType"
        };
    }

    clear(){
        this.state = {
            suggestionList : [],
            filteredPosts : [],
            currentSearch : "",
            searchType : searchTypeTitle
        };
        this.emit("change", this.state);
    }

    filterSearch(){

        const searchList = (this.state.searchType===searchTypeTag)?
            tagModel.state.tagList : postModel.state.postList.filter(x=>x.type===typeQuestion);
        const postList = postModel.state.postList;
        const searchObject = this.state.currentSearch.toLowerCase();

        if(this.state.searchType===searchTypeTag) {
            this.state.filteredPosts = postList.filter(x => x.tags.filter(x => x.toLowerCase()
                .search(searchObject) !== -1).length > 0);
            this.state.suggestionList = searchList.filter(x=>x.title.toLowerCase().search(searchObject)!==-1).map(x=>x.title);
        }
        else {
            this.state.filteredPosts = postList.filter(x => x.title.toLowerCase().search(searchObject) !== -1);
            this.state.suggestionList = this.state.filteredPosts.map(x=>x.title);
        }


        this.emit("change", this.state);
    }

    changeProperty(property, value) {
        this.state = {
            ...this.state,
            [property]: value
        };
        this.emit("change", this.state);
    }

}

const searchModel = new SearchModel();

export default searchModel;