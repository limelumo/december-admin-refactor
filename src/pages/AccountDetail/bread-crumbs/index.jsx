import 'antd/dist/antd.css';

import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import React from 'react';

const AccountDetailBreadCrumbs = (props) => {
  const {id, className} = props;
  return (
    <Breadcrumb className={className}>
      <Breadcrumb.Item href="/accounts">
        <HomeOutlined />
      </Breadcrumb.Item>
      <Breadcrumb.Item>{id}</Breadcrumb.Item>
    </Breadcrumb>
  );
};

export default AccountDetailBreadCrumbs;
