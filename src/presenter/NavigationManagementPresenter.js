class NavigationManagementPresenter{

    gotoRegistration(){
        window.location.assign("#/register");
    }

    gotoLogin(){
        window.location.assign("#/login");
    }

    gotoPostQuestion(){
        window.location.assign("#/questions/create");
    }

    gotoHome(){
        window.location.assign("#/");
    }

    gotoDashboard(){
        window.location.assign("#/dashboard");
    }
}

const navigationManagementPresenter = new NavigationManagementPresenter();

export default navigationManagementPresenter;