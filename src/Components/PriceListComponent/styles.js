import styled from "styled-components";
import { Input, Row, Button } from "antd";

export const InputStyles = styled(Input)`
  border: none;
  :focus {
    border: none;
  }

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const RowStyles = styled(Row)`
  border: 1px solid #dddbda;
`;

export const HeaderRowStyles = styled(RowStyles)`
  font-weight: bold;
  font-size: 12px;
  padding: 10px;
//   border-radius: 4px;
`;
export const Container = styled.div`
  margin: 10px;
`;

export const ButtonStyles = styled(Button)`
  margin-top: 10px;
  margin-bottom: 10px;
`;
export const HeaderTitleStyle = styled.h2`
    font-size: 16px;
    font-weight": bold;
`;
