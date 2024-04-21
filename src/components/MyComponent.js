// class component
// function component

import React from "react";

class MyComponent extends React.Component {

    state = {
        name: "Mizzon",
        age: 19,
        address: "HCM"
    }
    // jsx
    render() {
        return (
            <div>
                My name is {this.state.name}
            </div>
        )
    }
}

export default MyComponent;