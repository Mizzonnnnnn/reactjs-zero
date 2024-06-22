import { useEffect, useState } from "react"
import { getAllQuizForAdmin } from "../../../../services/apiService";
import ModalUpdateQuiz from "./ModalUpdateQuiz";
import ModalDeleteQuiz from "./ModalDeleteQuiz";
const TableQuiz = (props) => {
    const [listQuizz, setListQuizz] = useState([]);
    const [isShowModalUpdate, setIsShowModalUpdate] = useState(false);
    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [dataUpdate, setDataUpdate] = useState({});
    const [dataDelete, setDataDelete] = useState({});

    useEffect(() => {
        fetchQuiz()
    }, [])

    const fetchQuiz = async () => {
        setDataDelete({});
        setDataUpdate({});
        let res = await getAllQuizForAdmin();
        if (res && res.EC === 0) {
            setListQuizz(res.DT);
        }
    }
    const handleUpdateQuiz = (quiz) => {
        setIsShowModalUpdate(true);
        setDataUpdate(quiz);
    }

    const handleDelQuiz = (quiz) => {
        setIsShowModalDelete(true)
        setDataDelete(quiz)
    }
    return (
        <>
            <div className="mt-2">List Quizzes: </div>
            <table className="table table-hover table-bordered mt-3">
                <thead>
                    <tr>
                        <th scope="col">id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Type</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listQuizz && listQuizz.map((item, index) => {
                        return (
                            <tr key={`table-quiz-${index}`}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.description}</td>
                                <td>{item.difficulty}</td>
                                <td>
                                    <button className="btn btn-outline-warning mx-3" onClick={() => handleUpdateQuiz(item)}>Edit</button>
                                    <button className="btn btn-outline-danger" onClick={() => handleDelQuiz(item)}>Delete</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table >
            <ModalUpdateQuiz
                show={isShowModalUpdate}
                setShow={setIsShowModalUpdate}
                dataUpdate={dataUpdate}
                fetchQuiz={fetchQuiz}
                setDataUpdate={setDataUpdate}
            />

            <ModalDeleteQuiz
                show={isShowModalDelete}
                setShow={setIsShowModalDelete}
                dataDelete={dataDelete}
                setDataDelete={setDataDelete}
                fetchQuiz={fetchQuiz}
            />
        </>
    )
}

export default TableQuiz;