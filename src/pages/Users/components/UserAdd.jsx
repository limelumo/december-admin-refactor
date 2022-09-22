import 'antd/dist/antd.css';

import { Button } from 'antd';
import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { useRecoilValue } from 'recoil';

import { isModalOpenState, userInfoState } from '../../../utils/userListStore';

const UserAdd = () => {
  // const [isModalOpen, setIsModalOpen] = useRecoilState(isModalOpenState);
  const newUserInfo = useRecoilValue(userInfoState);

  const queryClient = useQueryClient();

  const addNewUserData = (newUserInfo) => axios.post('/users', newUserInfo);

  const { mutate } = useMutation(addNewUserData, {
    onSuccess: () => queryClient.invalidateQueries('usersData'),
    enabled: false,
  });

  const handleAdd = () => mutate(newUserInfo);

  return (
    <Button
      onClick={handleAdd}
      type="primary"
      style={{
        marginBottom: 16,
      }}
    >
      새로운 고객 등록
    </Button>
  );
};

export default UserAdd;