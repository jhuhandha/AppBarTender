import React, { Component } from 'react'

export class Home extends Component {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <div style={{display:'flex', flex: 1, justifyContent:'center', alignItems:'center', height: 500}}>
                <h3 className="text-muted" >Comienza a realizar pedidios con un solo click</h3>
            </div>
        )
    }
}

export default Home;
