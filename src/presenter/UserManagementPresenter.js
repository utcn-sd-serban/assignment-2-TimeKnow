import userModel from '../model/UserModel'

class UserManagementPresenter{

    onCreate(){
        userModel.registerUser(userModel.state.newUser.email, userModel.state.newUser.username, userModel.state.newUser.password);
        userModel.clearNewUser();
        window.location.assign("#/login");
    }

    onLogin(){
        if(userModel.loginUser(userModel.state.newUser.username, userModel.state.newUser.password))
            window.location.assign("#/");
    }

    onChange(property, value){
        userModel.changeProperty(property, value);
    }

    banUser(id){
        userModel.banUser(parseInt(id));
    }

}

const userManagementPresenter = new UserManagementPresenter();

export default userManagementPresenter;