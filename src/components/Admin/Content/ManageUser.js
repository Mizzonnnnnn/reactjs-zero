import ModalCreateUser from "./ModalCreateUser";
import './ManageUser.scss';
import { FcPlus } from "react-icons/fc";
import { useEffect, useState } from "react";
import { getAllUser, getUserWithPaginate } from "../../../services/apiService";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalViewUser from "./ModalViewUser";
import ModalDeleteUser from "./ModalDeleteUser";
import TableUserPaginate from "./TableUserPaginate";


const ManageUser = (props) => {
    const LIMIT_USER = 4;
    const [pageCount, setPaggeCount] = useState(0);
    const [showModalCreateUser, setShowModalCreateUser] = useState(false);
    const [listUser, setListUser] = useState([]);
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
    const [dataUpdate, setDataUpdate] = useState([]);
    const [showModalViewUser, setShowModalViewUser] = useState(false);
    const [dataView, setDataView] = useState([]);
    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false)
    const [dataDelete, setDataDelete] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        // fetchListUser();
        fetchListUserWithPaginate(1);
    }, []) // chạy dunng 1 lan

    const fetchListUser = async () => {
        let res = await getAllUser();
        if (res.EC === 0) {
            console.log("res.dt", res.DT)
            setListUser(res.DT)
        }
    }

    const fetchListUserWithPaginate = async (page) => {
        let res = await getUserWithPaginate(page, LIMIT_USER);
        if (res.EC === 0) {
            console.log("res.dt", res.DT)
            setListUser(res.DT.users);
            setPaggeCount(res.DT.totalPages);
        }
    }
    // button update
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

    // button delete
    const handleClickBtnDelete = (user) => {
        console.log("Delete user: ", user)
        setShowModalDeleteUser(true);
        setDataDelete(user)
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
                    {/* <TableUser listUser={listUser}
                        handleClickBtnUpdate={handleClickBtnUpdate}
                        handleClickbBtnView={handleClickbBtnView}
                        handleClickBtnDelete={handleClickBtnDelete}
                    /> */}
                    <TableUserPaginate
                        listUser={listUser}
                        handleClickBtnUpdate={handleClickBtnUpdate}
                        handleClickbBtnView={handleClickbBtnView}
                        handleClickBtnDelete={handleClickBtnDelete}
                        fetchListUserWithPaginate={fetchListUserWithPaginate}
                        pageCount={pageCount}
                        setCurrentPage={setCurrentPage}
                        currentPage={currentPage}
                    />
                </div>
                <ModalCreateUser
                    show={showModalCreateUser}
                    setShow={setShowModalCreateUser}
                    fetchListUser={fetchListUser}
                    fetchListUserWithPaginate={fetchListUserWithPaginate}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                />

                <ModalUpdateUser
                    show={showModalUpdateUser}
                    setShow={setShowModalUpdateUser}
                    dataUpdate={dataUpdate}
                    fetchListUser={fetchListUser}
                    resetUpdateData={resetUpdateData}
                    fetchListUserWithPaginate={fetchListUserWithPaginate}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                />
                <ModalViewUser
                    show={showModalViewUser}
                    setShow={setShowModalViewUser}
                    dataView={dataView}
                    resetViewData={resetViewData}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                />

                <ModalDeleteUser
                    show={showModalDeleteUser}
                    setShow={setShowModalDeleteUser}
                    handleClickBtnDelete={handleClickBtnDelete}
                    fetchListUser={fetchListUser}
                    fetchListUserWithPaginate={fetchListUserWithPaginate}
                    dataDelete={dataDelete}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                />
            </div>
        </div>
    )
}

export default ManageUser;