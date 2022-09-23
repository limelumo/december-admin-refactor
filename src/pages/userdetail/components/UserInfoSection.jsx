import React from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';

import User from '../../../store/user';
import { LabelItem, LabelList } from './common';

const UserInfoSection = ({ userId }) => {
  const { data: user } = useQuery(
    ['users', userId],
    async () => {
      const res = await fetch(`http://localhost:4000/users/${userId}`, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNvY2t5YjdAbmF2ZXIuY29tIiwiaWF0IjoxNjYzOTM4NzM0LCJleHAiOjE2NjM5NDIzMzQsInN1YiI6IjEwOCJ9.uvmsQctVTszAeUQrbpyMtos05y2wvTTa3SZHwuD-SX4`,
        },
      });
      const json = await res.json();
      return new User(json);
    },
    {
      enabled: Boolean(userId),
    }
  );

  return (
    <InfoSection>
      <h1>사용자 정보</h1>
      <LabelList>
        <LabelItem>
          <span>이름</span>
          <span>{user?.name}</span>
        </LabelItem>
        <LabelItem>
          <span>성별</span>
          <span>{user?.getGender()}</span>
        </LabelItem>
        <LabelItem>
          <span>생년월일</span>
          <span>{user?.birth_date}</span>
        </LabelItem>
        <LabelItem>
          <span>주소</span>
          <span>{user?.getFullAdress()}</span>
        </LabelItem>
        <LabelItem>
          <span>이메일</span>
          <span>{user?.email}</span>
        </LabelItem>
        <LabelItem>
          <span>핸드폰</span>
          <span>{user?.phone_number}</span>
        </LabelItem>
        <LabelItem>
          <span>해택정보 수신</span>
          <span>{}</span>
        </LabelItem>
        <LabelItem>
          <span>가입경로</span>
          <span>{}</span>
        </LabelItem>
        <LabelItem>
          <span>가입시각</span>
          <span>{user?.created_at}</span>
        </LabelItem>
      </LabelList>
    </InfoSection>
  );
};

export default UserInfoSection;

const InfoSection = styled.section`
  margin: 0 auto;
  width: 1280px;
  padding: 0 24px;
`;
