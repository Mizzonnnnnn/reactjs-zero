import React, { useState } from "react";
import './DisplayInfor.scss';

// class DisplayInfor extends React.Component {
//     // stateless vs statefull
//     render() {
//         console.log(">>> Call me render")
//         //destructuring array/object
//         const { listUsers } = this.props;
//         // console.log(">>>> check props:: ", this.props)
//         //props => viet tac properties
//         return (
//             <div className="display-infor-container">

//                 {
//                    true &&
//                     <>
//                         {listUsers.map((user, index) => {
//                             return (
//                                 <div key={user.id} className={+user.age < 17 ? "green" : "red"}>
//                                     <div>
//                                         <div>My name is {user.name}</div>
//                                         <div>My age is {user.age}</div>
//                                     </div>

//                                     <div>
//                                         <button onClick={() => { this.props.handleDeleteUser(user.id) }}>de lét </button>
//                                     </div>
//                                 </div>


//                             )
//                         })}
//                     </>
//                 }
//             </div>
//         )
//     }
// }

const DisplayInfor = (props) => {
    const { listUsers } = props;
    const [isShowHideListUser, setShowHideListUser] = useState(true);

    const handleShowHideListUser = () => {
        setShowHideListUser(!isShowHideListUser)
    }
    return (
        <div className="display-infor-container">
            <div>
                <span onClick={() => handleShowHideListUser()}>

                    {isShowHideListUser === true ? "Hide list Users" : "Show list Users"}
                </span>
            </div>
            {isShowHideListUser &&
                <>
                    {listUsers.map((user, index) => {
                        return (
                            <div key={user.id} className={+user.age < 17 ? "green" : "red"}>
                                <div>
                                    <div>My name is {user.name}</div>
                                    <div>My age is {user.age}</div>
                                </div>
                                <div>
                                    <button onClick={() => { props.handleDeleteUser(user.id) }}>de lét </button>
                                </div>
                            </div>
                        )
                    })}
                </>
            }
        </div>
    )
};
export default DisplayInfor;