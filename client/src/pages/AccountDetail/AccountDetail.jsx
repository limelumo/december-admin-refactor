import { Col, Row } from "antd";
import React from 'react';
import { useQuery } from "react-query";
import { useParams } from 'react-router-dom';
import styled from "styled-components";

import { Api } from "../../api";
import AccountDetailBreadCrumbs from "./bread-crumbs";
import { Account } from "./components/Account";
import { AccountUser } from "./components/AccountUser";


export const AccountDetail = () => {

  const {id} = useParams();

  const fetcherAccount = async () => {
    const {data: accountId} = await Api.getOneAccount.request({id});
    const {data: userId} = await Api.getOneUser.request({userId: id});

    return {
      accountId,
      userId,
    };
  };

  const { data, isLoading } = useQuery(['accountDetail'], fetcherAccount, {
    keepPreviousData: true,
    staleTime: 1000,
  });

  return (
    <>
      {!isLoading &&
        <RootWrap>
          <AccountBreadCrumb id={id}/>
          <Row gutter={10} justify="center">
            <Col span={25}>
              <Account account={data.accountId}/>
            </Col>
            <Col span={25}>
              <AccountUser userAccount={data.userId}/>
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


