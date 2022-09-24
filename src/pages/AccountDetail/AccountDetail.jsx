import { Col, Row } from "antd";
import queryString from 'query-string';
import React from 'react';
import { useQuery } from "react-query";
import { useLocation, useParams } from 'react-router-dom';
import styled from "styled-components";

import { Api } from "../../api";
import AccountDetailBreadCrumbs from "./bread-crumbs";
import { Account } from "./components/Account";
import { AccountUser } from "./components/AccountUser";
import { UserSetting } from "./components/UserSetting";


export const AccountDetail = () => {

  const {id} = useParams();
  const {search} = useLocation();

  const {user_id} = queryString.parse(search);


  const fetcherAccount = async () => {

    const {data: accountId} = await Api.getAccountUser.request({
      id,
      user_id
    });

    const {data: userId} = await Api.getOneUser.request({userId: user_id});

    const {data: userSetting} = await Api.getOneUserSetting.request({
      uuid: userId.uuid
    });

    const userOneAccount = accountId.find(item => {
      return item.user_id === Number(user_id);
    });

    const userOneSetting = userSetting.find(item => userId.uuid === item.uuid);

    return {
      userId,
      userOneAccount,
      userOneSetting
    };
  };

  const {data, isLoading} = useQuery(['accountDetail'], fetcherAccount, {
    keepPreviousData: true,
    staleTime: 1000,
  });

  return (
    <>
      {!isLoading &&
        <RootWrap>
          <AccountBreadCrumb id={data.userId.name}/>
          <Row gutter={10} justify="center">
            <Col span={25}>
              <Account account={data.userOneAccount}/>
            </Col>
            <Col span={25}>
              <AccountUser userAccount={data.userId}/>
              <UserSetting userSetting={data.userOneSetting}/>
            </Col>
          </Row>
        </RootWrap>
      }
    </>
  );
};

export default AccountDetail;

const RootWrap = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
`;

const AccountBreadCrumb = styled(AccountDetailBreadCrumbs)`
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
