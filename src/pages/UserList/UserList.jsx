import axios from 'axios';
import { useQuery } from 'react-query';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import {
  currentPageState,
  dataPerPageState,
  dataTotalCountState,
  isModalOpenState,
  usersDataState,
} from '../../utils/userListStore';
import User from './components/User';
import UserAddModal from './components/UserAddModal';
import UserListPagination from './components/UserListPagination';
import UserMenu from './components/UserMenu';

const UserList = () => {
  const [usersData, setUsersData] = useRecoilState(usersDataState);

  const currentPage = useRecoilValue(currentPageState);
  const dataPerPage = useRecoilValue(dataPerPageState);
  const isModalOpen = useRecoilValue(isModalOpenState);

  const setDataTotalCount = useSetRecoilState(dataTotalCountState);

  const getUsersData = async (currentPage) => {
    const response = await axios.get('/users', {
      params: {
        _limit: dataPerPage,
        _page: `${currentPage}`,
      },
    });
    return response;
  };

  // TODO: 상황별 예외처리
  useQuery(['usersData', currentPage], () => getUsersData(currentPage), {
    onSuccess: (res) => {
      setUsersData(res.data);
      setDataTotalCount(res.headers['x-total-count']);
    },
    keepPreviousData: true,
    staleTime: 5000,
  });

  return (
    <>
      {isModalOpen && <UserAddModal />}

      <UserMenu />

      {usersData.map((user) => (
        <table key={user.id}>
          <User {...user} />
        </table>
      ))}

      <UserListPagination />
    </>
  );
};

export default UserList;
