import React from 'react';
import ReactPaginate from 'react-paginate';
import { useTranslation } from 'react-i18next';

const TableUserPaginate = (props) => {
    const { listUser, pageCount } = props;
    const { t } = useTranslation();
    const handlePageClick = (event) => {
        props.fetchListUserWithPaginate(+event.selected + 1)
        props.setCurrentPage(+event.selected + 1)
        console.log(`User requested page number ${event.selected}`);
    };

    return (
        <>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr >
                        <th scope="col">{t("tableuserpaginate.title1")}</th>
                        <th scope="col">{t("tableuserpaginate.title2")}</th>
                        <th scope="col">{t("tableuserpaginate.title3")}</th>
                        <th scope="col">{t("tableuserpaginate.role.title")}</th>
                        <th scope="col">{t("tableuserpaginate.action.titleaction")}</th>
                    </tr>
                </thead>
                <tbody>
                    {listUser && listUser.length > 0 &&
                        listUser.map((item, index) => {
                            return (
                                <tr key={`table-users-${index}`} >
                                    <td>{item.id}</td>
                                    <td>{item.email}</td>
                                    <td>{item.username}</td>
                                    <td>{item.role === "USER" ? t('tableuserpaginate.role.user') : t('tableuserpaginate.role.admin')}</td>
                                    <td>
                                        <button className="btn btn-outline-success" onClick={() => props.handleClickbBtnView(item)} >{t("tableuserpaginate.action.view")}</button>
                                        <button className="btn btn-outline-warning mx-3" onClick={() => props.handleClickBtnUpdate(item)}>{t("tableuserpaginate.action.update")}</button>
                                        <button className="btn btn-outline-danger" onClick={() => { props.handleClickBtnDelete(item) }}>{t("tableuserpaginate.action.delete")}</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    {listUser && listUser.length === 0 &&
                        <tr>
                            <td colSpan={4}>
                                {t('tableuserpaginate.title4')}
                            </td>
                        </tr>}
                </tbody >
            </table >
            <div className='page-users'>
                <ReactPaginate
                    nextLabel={t('tableuserpaginate.title5')}
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    // setCurrentPage={1}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel={t('tableuserpaginate.title6')}
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                    forcePage={props.currentPage - 1}
                />
            </div>

        </>
    )
}



export default TableUserPaginate;