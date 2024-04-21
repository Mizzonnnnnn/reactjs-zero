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
        console.log(this.state.name)
    }
    handleOnMoverOver(event) {
        console.log(event.pageX)
    }

    // jsx
    render() {
        return (
            <div>
                My name is {this.state.name}
                <button onClick={this.handleClick}>Click me</button>
                <button onMouseOver={this.handleOnMoverOver}>Mover me</button>
            </div>
        )
    }
}

export default MyComponent;