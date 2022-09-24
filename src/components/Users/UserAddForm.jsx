import 'antd/dist/antd.css';

import { Button, Modal } from 'antd';
import usersApi from 'api/usersApi';
import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useRecoilState } from 'recoil';
import { userInfoState } from 'store/userList';
import styled from 'styled-components';

import UserAddInput from './UserAddInput';

const UserAddForm = () => {
  const [newUserInfo, setNewUserInfo] = useRecoilState(userInfoState);

  const [isOpen, setIsOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('');

  const queryClient = useQueryClient();

  const modalContent = (
    <Content>
      <UserAddInput required label={'고객명'} name={'name'} />
      <UserAddInput label={'성별코드'} name={'gender_origin'} />
      <UserAddInput required label={'이메일'} name={'email'} />
      <UserAddInput required label={'패스워드'} name={'password'} type={'password'} />
      <UserAddInput label={'보유 계좌수'} name={'account_count'} />
      <UserAddInput label={'생년월일'} name={'birth_date'} />
      <UserAddInput required label={'휴대폰 번호'} name={'phone_number'} />
      <UserAddInput label={'가입일'} name={'created_at'} />
      <UserAddInput required label={'활성화'} name={'is_active'} type={'toggle'} />
      <UserAddInput required label={'임직원 계좌 보유'} name={'is_staff'} type={'toggle'} />
      <UserAddInput label={'최근 로그인'} name={'last_login'} />
      <UserAddInput required label={'혜택 수신 동의'} name={'allow_marketing_push'} type={'toggle'} />
    </Content>
  );

  useEffect(() => {
    setModalText(modalContent);
  }, []);

  // const addNewUserData = (newUserInfo) => axios.post('/users', newUserInfo);

  const { mutate } = useMutation((newUserInfo) => usersApi.addNewUserData(newUserInfo), {
    onSuccess: () => {
      queryClient.invalidateQueries('users');
      setNewUserInfo('');
    },
    enabled: false,
  });

  const showModal = () => setIsOpen(true);
  const handleCancel = () => setIsOpen(false);

  const handleOk = () => {
    setConfirmLoading(true);
    mutate(newUserInfo);

    setTimeout(() => {
      setIsOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  return (
    <>
      <Button
        onClick={showModal}
        type="primary"
        style={{
          marginBottom: 16,
        }}
      >
        새로운 고객 등록
      </Button>

      {isOpen && (
        <Modal
          title="새로운 고객 등록"
          open={isOpen}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
          {modalText}
        </Modal>
      )}
    </>
  );
};
const Content = styled.section`
  display: flex;
  flex-direction: column;
`;

export default UserAddForm;
