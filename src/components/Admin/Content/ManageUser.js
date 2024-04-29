import ModalCreateUser from "./ModalCreateUser";
import './ManageUser.scss';

const ManageUser = (props) => {
    return (
        <div className="manage-users-container">
            <div className="title">
                manage user
            </div>
            <div className="users-content">
                <div>
                    <button>Add new user</button>
                </div>
                <div>
                    table users
                </div>
                <ModalCreateUser />
            </div>

        </div>
    )
}

export default ManageUser;