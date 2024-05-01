import ModalCreateUser from "./ModalCreateUser";
import './ManageUser.scss';
import { FcPlus } from "react-icons/fc";
import TableUser from "./TableUser";
import { useEffect, useState } from "react";
import { getAllUser } from "../../../services/apiService";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalViewUser from "./ModalViewUser";


const ManageUser = (props) => {
    const [showModalCreateUser, setShowModalCreateUser] = useState(false);
    const [listUser, setListUser] = useState([]);
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
    const [dataUpdate, setDataUpdate] = useState([]);
    const [showModalViewUser, setShowModalViewUser] = useState(false);
    const [dataView, setDataView] = useState([]);


    useEffect(() => {
        fetchListUser();
    }, []) // chạy dunng 1 lan

    const fetchListUser = async () => {
        let res = await getAllUser();
        if (res.EC === 0) {
            setListUser(res.DT)
        }
    }
    const setShow = () => {
        setShowModalCreateUser(true)
    }

    const handleClickBtnUpdate = (user) => {
        console.log("Check user: ", user)
        setShowModalUpdateUser(true)
        setDataUpdate(user)
    }

    const resetUpdateData = () => {
        setDataUpdate({})
    }

    // button view
    const handleClickbBtnView = (user) => {
        console.log("Check view user: ", user)
        setShowModalViewUser(true);
        setDataView(user);
    }
    const resetViewData = () => {
        setDataView({})
    }
    return (
        <div className="manage-users-container">
            <div className="title">
                Manage user
            </div>
            <div className="users-content">
                <div className="btn-add-new">
                    <button
                        onClick={setShow}>
                        <FcPlus /> Add new user
                    </button>
                </div>
                <div className="table-users-container">
                    <TableUser listUser={listUser}
                        handleClickBtnUpdate={handleClickBtnUpdate}
                        handleClickbBtnView={handleClickbBtnView}
                    />
                </div>
                <ModalCreateUser
                    show={showModalCreateUser}
                    setShow={setShowModalCreateUser}
                    fetchListUser={fetchListUser}
                />
                <ModalUpdateUser
                    show={showModalUpdateUser}
                    setShow={setShowModalUpdateUser}
                    dataUpdate={dataUpdate}
                    fetchListUser={fetchListUser}
                    resetUpdateData={resetUpdateData}
                />
                <ModalViewUser
                    show={showModalViewUser}
                    setShow={setShowModalViewUser}
                    dataView={dataView}
                    resetViewData={resetViewData}
                />
            </div>
        </div>
    )
}

export default ManageUser;