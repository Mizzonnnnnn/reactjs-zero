// class component
// function component

import React, { useState } from "react";
import AddUserinfor from "./AddUserinfor";
import Displayinfor from "./Displayinfor";

// class MyComponent extends React.Component {
//     state = {
//         listUsers: [
//             { id: 1, name: "Toan", age: "12" },
//             { id: 2, name: "Thien", age: "17" },
//             { id: 3, name: "Mizon", age: "19" }
//         ]
//     }

//     handleAddNewUser = (usersObj) => {
//         console.log("check data from parent >>>: ", usersObj)
//         this.setState({
//             listUsers: [usersObj, ...this.state.listUsers]
//         })
//     }

//     handleDeleteUser = (userId) => {
//         let listUsersClone = [...this.state.listUsers];
//         listUsersClone = listUsersClone.filter(item => item.id !== userId);
//         this.setState({
//             listUsers: listUsersClone
//         })
//     }
//     // jsx
//     // DRY: don't repeat yourselft
//     render() {

//         return (
//             <>
//                 < br />
//                 <div className="a">
//                     <AddUserinfor handleAddNewUser={this.handleAddNewUser} />
//                     <br />
//                     <Displayinfor
//                         listUsers={this.state.listUsers}
//                         handleDeleteUser={this.handleDeleteUser}
//                     />
//                 </div>

//                 <div className="b">

//                 </div>
//             </>
//         )
//     };
// }

const MyComponent = (props) => {

    const [listUsers, setListUser] = useState(
        [
            { id: 1, name: "Toan", age: "12" },
            { id: 2, name: "Thien", age: "17" },
            { id: 3, name: "Mizon", age: "19" }
        ]
    )
    const handleAddNewUser = (usersObj) => {
        setListUser([usersObj, ...listUsers]);
    };

    const handleDeleteUser = (userId) => {
        let listUsersClone = listUsers;
        listUsersClone = listUsersClone.filter(item => item.id !== userId);
        setListUser(listUsersClone);
    }
    return (
        <>
            < br />
            <div className="a">
                <AddUserinfor handleAddNewUser={handleAddNewUser} />
                <br />
                <Displayinfor
                    listUsers={listUsers}
                    handleDeleteUser={handleDeleteUser}
                />
            </div>

            <div className="b">

            </div>
        </>
    )
}

export default MyComponent;