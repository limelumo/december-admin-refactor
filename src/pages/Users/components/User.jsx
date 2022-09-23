import 'antd/dist/antd.css';

import { Popconfirm } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const User = (user) => {
  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState(user.name);

  const targetId = user.id;

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const removeUser = async (targetId) => await axios.delete(`/users/${targetId}`);

  const { mutate: removeMutate } = useMutation(removeUser, {
    onSuccess: () => queryClient.invalidateQueries('users'),
    enabled: false,
  });

  const handleDelete = (id) => removeMutate(targetId);

  const editUser = async (targetId) => await axios.patch(`/users/${targetId}`, { name: name });

  const { mutate: editMutate } = useMutation(editUser, {
    onSuccess: () => queryClient.invalidateQueries('users'),
    enabled: false,
  });

  const handleNameChange = (e) => setName(e.target.value);

  const handleOnKeyPress = (e, id) => {
    if (e.key === 'Enter') {
      editMutate(targetId);
      setIsEdit(false);
    }
  };

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

  return (
    <>
      <Tr key={user.id}>
        <Td>{isEdit ? renderNameEdit : renderName(user)}</Td>
        <Td onClick={() => navigate('/id')}>{user.account_count}</Td>
        <Td>{user.email}</Td>
        <Td>{user.gender_origin}</Td>
        <Td>{user.birth_date}</Td>
        <Td>{user.phone_number}</Td>
        <Td>{user.last_login}</Td>
        <Td>{user.allow_marketing_push}</Td>
        <Td>{user.is_active}</Td>
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
