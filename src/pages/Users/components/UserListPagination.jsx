import 'antd/dist/antd.css';

import { Pagination } from 'antd';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { currentPageState, dataTotalCountState } from '../../../utils/userListStore';

const UserListPagination = () => {
  const dataTotalCount = useRecoilValue(dataTotalCountState);
  const [currentPage, setCurrentPage] = useRecoilState(currentPageState);

  const handlePageButton = (page) => setCurrentPage(page);

  return (
    <PaginationContainer>
      <Pagination current={currentPage} total={dataTotalCount} onChange={handlePageButton} />
    </PaginationContainer>
  );
};

const PaginationContainer = styled.div`
  margin-top: 3em;
  text-align: center;

  .ant-pagination-options {
    display: none;
  }
`;

export default UserListPagination;
