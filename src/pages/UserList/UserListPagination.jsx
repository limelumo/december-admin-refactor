import { useRecoilState, useRecoilValue } from 'recoil';

import { currentPageState, dataPerPageState, dataTotalCountState } from '../../utils/userListStore';

const UserListPagination = () => {
  const dataTotalCount = useRecoilValue(dataTotalCountState);
  const dataPerPage = useRecoilValue(dataPerPageState);

  const [currentPage, setCurrentPage] = useRecoilState(currentPageState);

  const totalPage = Math.ceil(dataTotalCount / dataPerPage);
  const pageList = new Array(totalPage).fill();

  const handlePageButton = (pageNum) => setCurrentPage(pageNum);

  const renderPageList = () => {
    return (
      <>
        {pageList.map((_, i) => {
          const pageNum = i + 1;

          return (
            <span key={pageNum} onClick={() => handlePageButton(pageNum)} active={(pageNum === currentPage).toString()}>
              {pageNum}
            </span>
          );
        })}
      </>
    );
  };

  return (
    <div>
      <button disabled={currentPage <= 0} onClick={() => setCurrentPage(currentPage - 1)}>
        &lt;
      </button>

      <span>{renderPageList()}</span>

      <button disabled={currentPage >= totalPage - 1} onClick={() => setCurrentPage(currentPage + 1)}>
        &gt;
      </button>
    </div>
  );
};

export default UserListPagination;
