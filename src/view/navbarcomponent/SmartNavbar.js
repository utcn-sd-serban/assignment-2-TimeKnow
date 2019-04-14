import React, { Component } from "react";
import navigationManagementPresenter from '../../presenter/NavigationManagementPresenter'
import Navbar from "./Navbar";

export default class SmartForm extends Component {

    constructor(props){
        super(props);
        this.onGotoRegisterEvent = navigationManagementPresenter.gotoRegistration;
        this.onGotoPostEvent = navigationManagementPresenter.gotoPostQuestion;
        this.onGotoLoginEvent = navigationManagementPresenter.gotoLogin;
        this.onGotoHomeEvent = navigationManagementPresenter.gotoHome;
        this.onGotoDashboardEvent = navigationManagementPresenter.gotoDashboard;
    }

    render() {
        return (
            <Navbar
                onGotoRegisterEvent={this.onGotoRegisterEvent}
                onGotoPostEvent={this.onGotoPostEvent}
                onGotoLoginEvent={this.onGotoLoginEvent}
                onGotoDashboardEvent={this.onGotoDashboardEvent}
                onGotoHomeEvent={this.onGotoHomeEvent}
            />
        )
    }
}