import 'antd/dist/antd.css';

import { Button, Modal } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { userInfoState } from 'utils/userListStore';

import UserAddInput from './UserAddInput';

const UserAddForm = () => {
  const [newUserInfo, setNewUserInfo] = useRecoilState(userInfoState);

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('');

  const queryClient = useQueryClient();

  const modalContent = (
    <Content>
      <UserAddInput required label={'고객명'} name={'name'} />
      <UserAddInput label={'성별코드'} name={'gender_origin'} />
      <UserAddInput required label={'이메일'} name={'email'} />
      <UserAddInput required type={'password'} label={'패스워드'} name={'password'} />
      <UserAddInput label={'보유 계좌수'} name={'account_count'} />
      <UserAddInput label={'생년월일'} name={'birth_date'} />
      <UserAddInput required label={'휴대폰 번호'} name={'phone_number'} />
      <UserAddInput label={'가입일'} name={'created_at'} />
      <UserAddInput required label={'활성화'} name={'is_active'} />
      <UserAddInput required label={'임직원 계좌 보유'} name={'is_staff'} />
      <UserAddInput label={'최근 로그인'} name={'last_login'} />
      <UserAddInput required label={'혜택 수신 동의'} name={'allow_marketing_push'} />
    </Content>
  );

  useEffect(() => {
    setModalText(modalContent);
  }, []);

  const addNewUserData = (newUserInfo) => axios.post('/users', newUserInfo);

  const { mutate } = useMutation(addNewUserData, {
    onSuccess: () => {
      queryClient.invalidateQueries('users');
      setNewUserInfo('');
    },
    enabled: false,
  });

  const showModal = () => setOpen(true);
  const handleCancel = () => setOpen(false);

  const handleOk = () => {
    setConfirmLoading(true);
    mutate(newUserInfo);

    setTimeout(() => {
      setOpen(false);
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

      <Modal
        title="새로운 고객 등록"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Content>{modalText}</Content>
      </Modal>
    </>
  );
};
const Content = styled.section`
  display: flex;
  flex-direction: column;
`;

export default UserAddForm;
