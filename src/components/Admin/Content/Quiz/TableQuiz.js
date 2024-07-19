import { useEffect, useState } from "react"
import { getAllQuizForAdmin } from "../../../../services/apiService";
import ModalUpdateQuiz from "./ModalUpdateQuiz";
import ModalDeleteQuiz from "./ModalDeleteQuiz";
import { useTranslation } from "react-i18next";
const TableQuiz = (props) => {
    const [listQuizz, setListQuizz] = useState([]);
    const [isShowModalUpdate, setIsShowModalUpdate] = useState(false);
    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [dataUpdate, setDataUpdate] = useState({});
    const [dataDelete, setDataDelete] = useState({});
    const { t } = useTranslation()
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
    const convertLanType = (item) => {
        if (item === 'EASY') {
            return t('tablequiz.type.easy');
        }

        if (item === 'MEDIUM') {
            return t('tablequiz.type.medium');
        }

        if (item === 'HARD') {
            return t('tablequiz.type.hard');
        }

        return item; // Trả về giá trị gốc nếu không khớp
    }
    return (
        <>
            <div className="mt-2">{t('tablequiz.title')} </div>
            <table className="table table-hover table-bordered mt-3">
                <thead>
                    <tr>
                        <th scope="col">{t('tablequiz.title1')}</th>
                        <th scope="col">{t('tablequiz.title2')}</th>
                        <th scope="col">{t('tablequiz.title3')}</th>
                        <th scope="col">{t('tablequiz.type.title')}</th>
                        <th scope="col">{t('tablequiz.action.titleaction')}</th>
                    </tr>
                </thead>
                <tbody>
                    {listQuizz && listQuizz.map((item, index) => {
                        return (
                            <tr key={`table-quiz-${index}`}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.description}</td>
                                <td>{convertLanType(item.difficulty)}</td>
                                <td>
                                    <button className="btn btn-outline-warning mx-3" onClick={() => handleUpdateQuiz(item)}>{t('tablequiz.action.edit')}</button>
                                    <button className="btn btn-outline-danger" onClick={() => handleDelQuiz(item)}>{t('tablequiz.action.delete')}</button>
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