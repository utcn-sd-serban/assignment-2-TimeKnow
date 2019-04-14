import React, { Component } from "react";
import searchModel from '../../model/SearchModel'
import searchManagementPresenter from "../../presenter/SearchManagementPresenter"
import Table from './Table'

const mapModelStateToComponentState = modelState => ({
    filteredPosts : modelState.filteredPosts,
});

const mapURLToState = props => {
    searchManagementPresenter.onChangeEvent(searchModel.propertyContentMapper.currentSearch,
        props.match.params.term.replace("+", " "));
    searchManagementPresenter.onChangeEvent(searchModel.propertyContentMapper.searchType,
        props.match.params.searchType.replace("+", " "));

};

export default class SmartTable extends Component {

    constructor(props){
        super(props);
        mapURLToState(this.props);
        this.state = mapModelStateToComponentState(searchModel.state);
        this.tableHeader = ["Title", "Summary", "Upvotes", "Downvotes", "Author"];
        this.onContentSelected=searchManagementPresenter.onSelectEvent;
        debugger;
        this.listener = modelState => this.setState(mapModelStateToComponentState(modelState));
        searchModel.addListener("change", this.listener);
    }

    componentDidUpdate(prev) {
        if (prev.match.params.term !== this.props.match.params.term) {
            mapURLToState(this.props);
        }
    }

    componentWillUnmount() {
        searchModel.removeListener("change", this.listener);
    }

    render() {
        return (
            <Table
                tableHeader={this.tableHeader}
                tableContent={this.state.filteredPosts}
                onContentSelected={this.onContentSelected}
            />
        )
    }
}