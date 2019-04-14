import React, { Component } from "react";
import SmartSearchBar from './SmartSearchBar'
import HomeContent from "./HomeContent";

export default class SmartHome extends Component {

    render() {
        return (
            <div>
                <SmartSearchBar/>
                <HomeContent/>
            </div>
        )
    }
}