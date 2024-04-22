// class component
// function component

import React from "react";
import Userinfor from "./Userinfor";
import Displayinfor from "./Displayinfor";

class MyComponent extends React.Component {


    // jsx
    render() {
        const myInfor = ['ab', 'bc']
        return (
            <div>
                <Userinfor></Userinfor>
                <Displayinfor name="Toan" age={myInfor}></Displayinfor>
            </div>
        )

    };


}

export default MyComponent;