import { useRecoilValue, useSetRecoilState } from 'recoil';

import { isModalOpenState, usersDataState } from '../../../utils/userListStore';

const UserMenu = () => {
  const setIsModalOpen = useSetRecoilState(isModalOpenState);

  const usersData = useRecoilValue(usersDataState);

  const handleUserSearch = (e) => {};
  const handleAddUser = () => setIsModalOpen(true);

  return (
    <>
      <section>
        <form onSubmit={() => handleUserSearch(e)}>
          <input type="text" />
          <button>검색</button>
        </form>

        <select>
          <option value="">활성 고객</option>
          <option value="">임직원 계좌 고객</option>
        </select>

        <button onClick={handleAddUser}>고객 등록</button>
      </section>
    </>
  );
};

export default UserMenu;
