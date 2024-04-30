import ModalCreateUser from "./ModalCreateUser";
import './ManageUser.scss';
import { FcPlus } from "react-icons/fc";
import { useState } from "react";
import TableUser from "./TableUser";

const ManageUser = (props) => {
    const [showModalCreateUser, setShowModalCreateUser] = useState(false);

    return (
        <div className="manage-users-container">
            <div className="title">
                Manage user
            </div>
            <div className="users-content">
                <div className="btn-add-new" onClick={() => setShowModalCreateUser(true)}>
                    <button><FcPlus /> Add new user</button>
                </div>
                <div className="table-users-container">
                    
                    <TableUser />
                </div>
                <ModalCreateUser
                    show={showModalCreateUser}
                    setShow={setShowModalCreateUser}
                />
            </div>

        </div>
    )
}

export default ManageUser;