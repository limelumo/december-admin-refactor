import styled from 'styled-components';

const LabelList = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  padding: 0;
`;

const LabelItem = styled.div`
  display: flex;
  width: 100%;
  span {
    padding: 36px 12px;
    &:first-child {
      width: 30%;
      background-color: #c8c8c8;
      font-weight: bold;
      font-size: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &:last-child {
      width: 70%;
      background-color: #e3e3e3;
      font-size: 16px;
      display: flex;
      align-items: center;
      align-items: center;
    }
  }
`;

export { LabelItem, LabelList };
