// class component
// function component

import React from "react";

class MyComponent extends React.Component {

    state = {
        name: "Mizzon",
        age: 19,
        address: "HCM"
    }
    handleClick(event) {
        console.log("Click me my button")
        console.log("Random ", Math.floor((Math.random() * 100) + 1))

        this.setState({
            name: "Toan",
            age: Math.floor((Math.random() * 100) + 1)
        })
    }
    handleOnMoverOver(event) {
        console.log(event.pageX)

    }

    // jsx
    render() {
        return (
            <div>
                My name is {this.state.name} and I'm {this.state.age}
                <button onClick={(event) => { this.handleClick(event) }}>Click me</button>
                <button onMouseOver={this.handleOnMoverOver}>Mover me</button>
            </div>
        )
    }
}

export default MyComponent;