import Api from 'api/api';
import React from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';

import Account from '../../../store/account';
import { LabelItem } from './common';

const AccountListSection = ({ userId }) => {
  const { data: accounts } = useQuery(
    ['accounts', userId],
    async () => {
      const data = await Api.getAllAccountByUserId(userId);
      return data?.map((json) => new Account(json));
    },
    {
      enabled: Boolean(userId),
    }
  );

  return (
    <Section>
      <h1>계좌 목록</h1>
      <AccountList>
        {accounts?.map((account) => {
          return (
            <AccountItem>
              <LabelItem>
                <span>계좌 이름</span>
                <span>{account?.name}</span>
              </LabelItem>

              <LabelItem>
                <span>증권사</span>
                <span>{account?.getBroker()}</span>
              </LabelItem>

              <LabelItem>
                <span>계좌번호</span>
                <span>{account?.getMaskedNumber()}</span>
              </LabelItem>

              <LabelItem>
                <span>계좌상태</span>
                <span>{account?.getAccountStatus()}</span>
              </LabelItem>

              <LabelItem>
                <span>평가금액</span>
                <span>{account?.getAssets()}</span>
              </LabelItem>

              <LabelItem>
                <span>입금금액</span>
                <span>{account?.getPayments()}</span>
              </LabelItem>

              <LabelItem>
                <span>계좌 활성화 여부</span>
                <span>{account?.getActiveStatus()}</span>
              </LabelItem>

              <LabelItem>
                <span>계좌 개설일</span>
                <span>{account?.getCreatedTime()}</span>
              </LabelItem>
            </AccountItem>
          );
        })}
      </AccountList>
    </Section>
  );
};

export default AccountListSection;

const AccountItem = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
`;
const AccountList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 0;
`;
const Section = styled.section`
  margin: 0 auto;
  width: 1280px;
  padding: 0 24px;
`;
