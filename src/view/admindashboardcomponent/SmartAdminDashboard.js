import React, { Component } from "react";
import userModel from '../../model/UserModel'
import userManagementPresenter from "../../presenter/UserManagementPresenter"
import AdminDashboard from "./AdminDashboard";


const mapModelStateToComponentState = modelState => ({
    userList : modelState.userList
});


export default class SmartCreatePostForm extends Component {

    constructor(props){
        super(props);
        this.onActionEvent = userManagementPresenter.banUser;
        this.state = mapModelStateToComponentState(userModel.state);
        this.headerList = ["Id", "Username", "Email", "Status","Banned", "Action"];
        this.listener = modelState => this.setState(mapModelStateToComponentState(modelState));
        userModel.addListener("change", this.listener);
        debugger;
    }

    componentWillUnmount() {
        userModel.removeListener("change", this.listener);
    }

    render() {
        return (
            <AdminDashboard
                tableHeader={this.headerList}
                tableContent={this.state.userList}
                onActionEvent={this.onActionEvent}
            />
        )
    }
}