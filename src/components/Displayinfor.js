import React from "react";

class Displayinfor extends React.Component {
    render() {
        const { age, name } = this.props;
        //props => viet tac properties
        return (
            <div>
                <div>My name is {name}</div>
                <div>My age is {age}</div>
            </div>
        )
    }
}

export default Displayinfor;