import axios from 'axios';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { isModalOpenState, usersDataState } from '../../../utils/userListStore';

const UserMenu = () => {
  const [searchKeyword, setSearchKeyword] = useState('');

  const [usersData, setUsersData] = useRecoilState(usersDataState);
  const setIsModalOpen = useSetRecoilState(isModalOpenState);

  const getSearchData = async (searchKeyword) => {
    const { data } = await axios.get('/users', { params: { q: searchKeyword } });
    return data;
  };

  const { refetch } = useQuery(['search-user-data', searchKeyword], () => getSearchData(searchKeyword), {
    onSuccess: (data) => {
      setUsersData(data);
      setSearchKeyword('');
    },
    enabled: false,
  });

  const handleKeyworkChange = ({ target }) => setSearchKeyword(target.value);

  const handleUserSearch = (e) => {
    e.preventDefault();
    refetch();
  };

  const handleAddUser = () => setIsModalOpen(true);

  const handleRemoveUser = (targetId) => {
    // 전체 리스트에서 checkbox checked 된것만 삭제
    usersData.filter((it) => it.id !== targetId);
  };

  return (
    <>
      <section>
        <form onSubmit={handleUserSearch}>
          <input type="text" value={searchKeyword} onChange={handleKeyworkChange} />
          <button>검색</button>
        </form>

        <select>
          <option value="활성 고객">활성 고객</option>
          <option value="임직원 계좌 고객">임직원 계좌 고객</option>
        </select>

        <button onClick={handleAddUser}>새로운 고객 등록</button>
        <button onClick={handleRemoveUser}>선택 고객 삭제</button>
      </section>
    </>
  );
};

export default UserMenu;
