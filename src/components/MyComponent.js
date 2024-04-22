// class component
// function component

import React from "react";
import Userinfor from "./Userinfor";
import Displayinfor from "./Displayinfor";

class MyComponent extends React.Component {
    state = {
        listUsers: [
            { id: 1, name: "Toan", age: "12" },
            { id: 2, name: "Thien", age: "17" },
            { id: 3, name: "Mizon", age: "19" }
        ]
    }



    // jsx
    // DRY: don't repeat yourselft
    render() {

        return (
            <div>
                <Userinfor />
                <Displayinfor listUsers={this.state.listUsers} />
            </div>
        )

    };


}

export default MyComponent;