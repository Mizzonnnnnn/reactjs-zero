import React from "react";

class Displayinfor extends React.Component {
    render() {
        //destructuring array/object
        const { listUsers } = this.props;
        console.log(listUsers)
        //props => viet tac properties
        return (
            <div>
                {listUsers.map((user, index) => {
                    return (
                        <div key={user.id}>
                            <div>My name is {user.name}</div>
                            <div>My age is {user.age}</div>
                            <hr />
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default Displayinfor;