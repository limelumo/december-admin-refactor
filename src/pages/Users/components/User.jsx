import 'antd/dist/antd.css';

import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Popconfirm } from 'antd';
import usersApi from 'api/usersApi';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const User = (user) => {
  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState(user.name);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: removeMutate } = useMutation((targetId) => usersApi.removeUser(targetId), {
    onSuccess: () => queryClient.invalidateQueries('users'),
    enabled: false,
  });

  const { mutate: editMutate } = useMutation((targetId) => usersApi.updateUserData(targetId, name), {
    onSuccess: () => {
      queryClient.invalidateQueries('users');
      setIsEdit(false);
    },
    enabled: false,
  });

  const handleOnKeyPress = (e, targetId) => {
    if (e.key === 'Enter') {
      editMutate(targetId);
    }
  };

  const handleDelete = (targetId) => removeMutate(targetId);

  const handleNameChange = (e) => setName(e.target.value);

  const renderName = (user) => (
    <EditBtnWrapper>
      <button id={user.id} onClick={() => navigate(`/users/${user.id}`)}>
        {user.name}
      </button>
      <EditButton onClick={() => setIsEdit(true)}>수정</EditButton>
    </EditBtnWrapper>
  );

  const renderNameEdit = (
    <Input type="text" value={name} onChange={handleNameChange} onKeyPress={(e) => handleOnKeyPress(e, user.id)} />
  );

  const renderChecked = (value) => {
    const trueCheck = <CheckOutlined style={{ fontSize: '16px' }} />;
    const falseCheck = <CloseOutlined style={{ color: 'salmon', fontSize: '16px' }} />;

    return <>{value === 'true' ? trueCheck : falseCheck}</>;
  };

  return (
    <>
      <Tr>
        <Td>{isEdit ? renderNameEdit : renderName(user)}</Td>
        <Td>{user.account_count}</Td>
        <Td>{user.email}</Td>
        <Td>{user.gender_origin}</Td>
        <Td>{user.birth_date}</Td>
        <Td>{user.phone_number}</Td>
        <Td>{user.last_login}</Td>
        <Td>{renderChecked(user.allow_marketing_push)}</Td>
        <Td>{renderChecked(user.is_active)}</Td>
        <Td>{user.created_at}</Td>
        <Td>
          <DelButton title="삭제하시겠습니까?" onConfirm={() => handleDelete(user.id)}>
            삭제
          </DelButton>
        </Td>
      </Tr>
    </>
  );
};

const Tr = styled.tr`
  display: table-row;
  vertical-align: inherit;

  &:hover {
    background-color: #e2e1e1;
  }
`;

const Td = styled.td`
  padding: 16px;
  border-right: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
`;

const EditBtnWrapper = styled.span`
  display: flex;
  justify-content: space-between;

  button {
    border: none;
    outline: none;
    background-color: transparent;
    width: 60%;
    cursor: pointer;
  }
`;

const EditButton = styled.button`
  color: blue;
  text-decoration: underline;
  cursor: pointer;
`;

const DelButton = styled(Popconfirm)`
  color: salmon;
  text-decoration: underline;
  cursor: pointer;
`;

const Input = styled.input`
  width: 100px;
  border: 1px solid #f0f0f0;
  outline: none;
`;

export default User;
