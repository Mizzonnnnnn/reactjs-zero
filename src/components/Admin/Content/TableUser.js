import { useEffect, useState } from "react";
import { getAllUser } from "../../../services/apiService";


const TableUser = (props) => {

    const [listUser, setListUser] = useState([])


    // nó sẽ đc chạy khi hàm return chay
    // khong nen goi truc tiep asyn 
    useEffect(() => {
        fetchListUser();
    }, []) // chạy dunng 1 lan

    const fetchListUser = async () => {
        let res = await getAllUser();
        console.log(res);
        if (res.EC === 0) {
            setListUser(res.DT)
        }
    }

    console.log("rendere view")
    return (
        <>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr >
                        <th scope="col">No</th>
                        <th scope="col">Username</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listUser && listUser.length > 0 &&
                        listUser.map((item, index) => {
                            return (
                                <tr key={`table-users-${index}`} >
                                    <td>{index + 1}</td>
                                    <td>{item.email}</td>
                                    <td>{item.username}</td>
                                    <td>{item.role}</td>
                                    <td>
                                        <button class="btn btn-outline-success">View</button>
                                        <button class="btn btn-outline-warning mx-3">Update</button>
                                        <button class="btn btn-outline-danger">Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    {listUser && listUser.length === 0 &&
                        <tr>
                            <td colSpan={4}>
                                Not found data
                            </td>
                        </tr>}
                </tbody>
            </table >
        </>
    )
}



export default TableUser;