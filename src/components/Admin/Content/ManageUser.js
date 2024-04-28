import ModalCreateUser from "./ModalCreateUser";


const ManageUser = (props) => {
    return (
        <div classNameName="manage-users-container">
            <div classNameName="title">
                manage user
            </div>
            <div classNameName="users-content">
                <div>
                    <button>Add new user</button>
                </div>
                <div>
                    table users
                    <ModalCreateUser />
                </div>
            </div>
        </div>
    )
}

export default ManageUser;