import React, { Component } from 'react'

export class Home extends Component {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <div>
                <h1>{this.props.role}</h1>
            </div>
        )
    }
}

export default Home;
