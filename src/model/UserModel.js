
import { EventEmitter } from "events";
import seed from "../seeder/seed";

const permissionAdmin = "ADMIN";
const permissionUser = "USER";

class UserModel extends EventEmitter {
    constructor() {
        super();
        this.state = {
            userList:[

            ],

            newUser:{
                email: "",
                username: "",
                password: ""
            },
            currentUser : null
        };
        this.propertyContentMapper = {
            email : "email",
            username : "username",
            password : "password",
            banned: "banned",
            score : "score"
        };
        this.importFromSeed();
    }

    clearNewUser(){
        userModel.state.newUser={
            email: "",
            username: "",
            password: ""
        };
        this.emit("change", this.state);
    }

    importFromSeed(){
        this.state = {
            ...this.state,
            userList: this.state.userList.concat(seed.seedUserList),
            currentUser: seed.seedUserList[0]
        };
        this.emit("change", this.state);
    }

    registerUser(email, username, password){
        const newId = this.state.userList.map(x=>x.id).reduce((maxId, x)=>Math.max(maxId, x), -1) + 1;

        this.state = {
            ...this.state,
            userList: this.state.userList.concat([{
                id: newId,
                email: email,
                username : username,
                password : password,
                banned: false,
                permission : permissionUser
            }])
        };
        this.emit("change", this.state);
    }

    banUser(id){
        const user = this.state.userList.filter((x)=>x.id===id)[0];
        if(user===null)
            return;
        user.banned = true;
    }

    loginUser(username, password){
        const user = this.state.userList.filter((x)=>x.username===username && x.password===password)[0];
        if(user===null)
            return false;
        if(user.banned)
            return false;
        this.state.currentUser = user;
        this.emit("change", this.state);
        return true;
    }

    changeProperty(property, value) {
        this.state = {
            ...this.state,
            newUser: {
                ...this.state.newUser,
                [property]: value
            }
        };
        this.emit("change", this.state);
    }

}

const userModel = new UserModel();

export default userModel;
export {permissionAdmin, permissionUser};