// class component
// function component

import React from "react";
import AddUserinfor from "./AddUserinfor";
import Displayinfor from "./Displayinfor";

class MyComponent extends React.Component {
    state = {
        listUsers: [
            { id: 1, name: "Toan", age: "12" },
            { id: 2, name: "Thien", age: "17" },
            { id: 3, name: "Mizon", age: "19" }
        ]
    }

    handleAddNewUser = (usersObj) => {
        console.log("check dat from parent >>>: ", usersObj)
        this.setState({
            listUsers: [usersObj, ...this.state.listUsers]
        })
    }

    // jsx
    // DRY: don't repeat yourselft
    render() {

        return (
            <div>
                <AddUserinfor
                    handleAddNewUser={this.handleAddNewUser}
                />
                <br />
                <Displayinfor listUsers={this.state.listUsers} />
            </div>
        )
    };
}

export default MyComponent;