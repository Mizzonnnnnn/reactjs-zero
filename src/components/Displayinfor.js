import React, { useEffect, useState } from "react";
import './DisplayInfor.scss';

const DisplayInfor = (props) => {
    const { listUsers } = props;
    const [isShowHideListUser, setShowHideListUser] = useState(true);

    const handleShowHideListUser = () => {
        setShowHideListUser(!isShowHideListUser)
    }

    console.log(">>> call me render")

    useEffect(
        () => {
            if (listUsers.length === 0) {
                alert('you delete all users')
            }
            console.log(">>> call me useEffect")
        }, [listUsers] // chỉ chạy 1 lần  thôi

    )
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