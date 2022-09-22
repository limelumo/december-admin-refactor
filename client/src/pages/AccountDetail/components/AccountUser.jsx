import { Avatar, Card } from "antd";
import React from "react";
import styled from "styled-components";

import { getDateFormat } from "../../../utils/account.util";

export const AccountUser = (props) => {
  const { userAccount } = props;

  return (
    <CardWrap title={userAccount.name} bordered={true} extra={
      <AvatarWrap src={userAccount.photo} size={36}/>} bodyStyle={{width: '500px'}}>
      <div>
        <div>주소</div>
        <span>{`${userAccount.address} ${userAccount.detail_address}`}</span>
      </div>
      <div>
        <div>생일</div>
        <span>{getDateFormat(userAccount.birth_date)}</span>
      </div>
      <div>
        <div>아이디 생성일</div>
        <span>{getDateFormat(userAccount.created_at)}</span>
      </div>
      <div>
        <div>이메일</div>
        <span>{userAccount.email}</span>
      </div>
      <div>
        <div>마지막 접속일</div>
        <span>{userAccount.last_login}</span>
      </div>
      <div>
        <div>핸드폰 번호</div>
        <span>{userAccount.phone_number}</span>
      </div>
      <div>
        <div>마지막 수정일</div>
        <span>{getDateFormat(userAccount.updated_at)}</span>
      </div>
    </CardWrap>
  );
};


const CardWrap = styled(Card)`
  height: 100%;

  .ant-card-extra {
    padding: 0;
  }
`;

const AvatarWrap = styled(Avatar)`
  margin-left: 10px;
  padding: 0;
`;