import { useEffect, useState } from "react"
import { getAllQuizForAdmin } from "../../../../services/apiService";

const TableQuiz = (props) => {
    const [listQuizz, setListQuizz] = useState([]);

    useEffect(() => {
        fetchQuiz()
    }, [])

    const fetchQuiz = async () => {
        let res = await getAllQuizForAdmin();
        console.log('check res, ', res)
        if (res && res.EC === 0) {
            setListQuizz(res.DT);
        }
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
                                    <button className="btn btn-outline-warning mx-3" >Edit</button>
                                    <button className="btn btn-outline-danger" >Delete</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table >
        </>
    )
}

export default TableQuiz;