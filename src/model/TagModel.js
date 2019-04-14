
import { EventEmitter } from "events";
import seed from "../seeder/seed";

class TagModel extends EventEmitter {
    constructor() {
        super();
        this.state = {
            tagList:[
            ],

            newTag:{
                id: -1,
                title: ""
            }
        };
        this.propertyContentMapper={
            title : "title"
        };

        this.importFromSeed();
    }
    importFromSeed(){
        this.state = {
            ...this.state,
            tagList: this.state.tagList.concat(seed.seedTagList)
        };
        this.emit("change", this.state);
    }

    clearNewTag(){
        this.state.newTag = {
            id: -1,
            title: ""
        };
        this.emit("change", this.state);
    }

    createByTagList(tagTitleList){
        tagTitleList.forEach((title)=>{
            if(this.state.tagList.filter(x=>x.title.search(title)!==-1).length <= 0)
                this.createTag(title);
        });

    }

    createTag(title){
        const newId = this.state.tagList.map(x=>x.id).reduce((maxId, x)=>Math.max(maxId, x), -1) + 1;

        this.state = {
            ...this.state,
            tagList: this.state.tagList.concat([{
                id: newId,
                title: title
            }])
        };
        this.emit("change", this.state);
    }

    changeProperty(property, value) {
        this.state = {
            ...this.state,
            newTag: {
                ...this.state.newTag,
                [property]: value
            }
        };
        this.emit("change", this.state);
    }

}

const tagModel = new TagModel();

export default tagModel;