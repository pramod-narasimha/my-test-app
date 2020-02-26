import React from "react";
import { Descriptions, Badge, Table, Input, Row, Col, Button } from "antd";
import Title from "antd/lib/typography/Title";
import { InputStyles, RowStyles, HeaderTitleStyle, Container, HeaderRowStyles, ButtonStyles } from "./styles";

const INITIAL_DATA = {
  domesticTotal: 0,
  internationalTotal: 0,
  included: [{ name: "", domesticPrice: null, internationalPrice: null }],
  excluded: [{ name: "" }]
};

const PriceListComponent = () => {
  const [priceTableData, setPriceTableData] = React.useState(INITIAL_DATA);

  const handleOnChangeInput = (value, row, title, type) => {
    const tempPriceTableData = { ...priceTableData };
    console.log("OnChange is triggering");
    let deletePerformed = false;
    if (type === "included") {
      tempPriceTableData.included[row][title] = value;
      if (tempPriceTableData.included.length > 1) {
        if (checkForCurrentIncludeEmptyRow(tempPriceTableData.included[row])) {
          const tempArray = tempPriceTableData.included.filter(
            (value, key) => key !== row
          );
          tempPriceTableData.included = tempArray;
          deletePerformed = true;
        }
      }
      if (!deletePerformed) {
        if (row === tempPriceTableData.included.length - 1) {
          if (
            !checkForCurrentIncludeEmptyRow(tempPriceTableData.included[row])
          ) {
            tempPriceTableData.included.push({
              name: "",
              domesticPrice: null,
              internationalPrice: null
            });
          }
        } else {
          if (
            !checkForCurrentIncludeEmptyRow(
              tempPriceTableData.included[row + 1]
            )
          ) {
            tempPriceTableData.included.splice(row + 1, 0, {
              name: "",
              domesticPrice: null,
              internationalPrice: null
            });
          }
        }
      }
      if (title === "domesticPrice") {
        tempPriceTableData.domesticTotal = calculateTotalPrice(
          tempPriceTableData,
          title
        );
      } else if (title === "internationalPrice") {
        tempPriceTableData.internationalTotal = calculateTotalPrice(
          tempPriceTableData,
          title
        );
      }

      setPriceTableData(tempPriceTableData);
    } else if (type === "excluded") {
      tempPriceTableData.excluded[row]["name"] = value;
      if (tempPriceTableData.excluded.length > 1) {
        if (checkForCurrentExcludedEmptyRow(tempPriceTableData.excluded[row])) {
          const tempArray = tempPriceTableData.excluded.filter(
            (value, key) => key !== row
          );
          tempPriceTableData.excluded = tempArray;
          deletePerformed = true;
          //   tempPriceTableData.included.splice(row, 0);
        }
      }
      if (!deletePerformed) {
        if (row === tempPriceTableData.excluded.length - 1) {
          if (
            !checkForCurrentExcludedEmptyRow(tempPriceTableData.excluded[row])
          ) {
            tempPriceTableData.excluded.push({
              name: ""
            });
          }
        } else {
          if (
            !checkForCurrentExcludedEmptyRow(
              tempPriceTableData.excluded[row + 1]
            )
          ) {
            tempPriceTableData.excluded.splice(row + 1, 0, {
              name: ""
            });
          }
        }
      }
    }
    setPriceTableData(tempPriceTableData);
  };

  const calculateTotalPrice = (tableData, type) => {
    let price = 0;
    tableData.included.map(rowData => {
      if (rowData[type]) {
        price = price + parseInt(rowData[type]);
      }
      return 0;
    });
    return price;
  };

  const checkForCurrentIncludeEmptyRow = data => {
    if (!data.name && !data.domesticPrice && !data.internationalPrice) {
      return true;
    } else {
      return false;
    }
  };

  const checkForCurrentExcludedEmptyRow = data => {
    if (!data.name) {
      return true;
    } else {
      return false;
    }
  };

  const displayResult = () => {
    const tempTableData = { ...priceTableData };
    const includedRowData = priceTableData.included.filter(
      includedRowData => !checkForCurrentIncludeEmptyRow(includedRowData)
    );
    const excludedRowData = priceTableData.excluded.filter(
      excludedRowData => !checkForCurrentExcludedEmptyRow(excludedRowData)
    );
    tempTableData.includedRowData = includedRowData;
    tempTableData.excludedRowData = excludedRowData;
    setPriceTableData(tempTableData);
    console.log("priceList ==> ", tempTableData);
  };

  const getCurrentDate = () => {
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date+' '+time;
    return dateTime
  }

  return (
    <div>
      <Container>
  <HeaderTitleStyle>{"Included"}<span style={{float: 'right'}}>{getCurrentDate()}</span></HeaderTitleStyle>
        <HeaderRowStyles>
          <Col span={8}>Name</Col>
          <Col span={8}>Amount-Domestic(Excluding Task)</Col>
          <Col span={8}>Amount-Internation(Excluding-Task)</Col>
        </HeaderRowStyles>
        {priceTableData.included.map((includedRowData, key) => (
          <RowStyles key={key}>
            <Col span={8}>
              <InputStyles
                placeholder="Name"
                value={includedRowData.name}
                onChange={e =>
                  handleOnChangeInput(e.target.value, key, "name", "included")
                }
                onKeyDown={e => {
                  if (e.keyCode === 8 && !includedRowData.name) {
                    handleOnChangeInput("", key, "name", "included");
                  }
                }}
              />
            </Col>
            <Col span={2}>
                <span style={{padding: '5px', display: 'flex'}}>Rs.</span>
            </Col>
            <Col span={6}>
              <InputStyles
                type="number"
                value={includedRowData.domesticPrice}
                placeholder="Amount"
                onChange={e =>
                  handleOnChangeInput(
                    e.target.value,
                    key,
                    "domesticPrice",
                    "included"
                  )
                }
                onKeyDown={e => {
                  if (e.keyCode === 8 && !includedRowData.domesticPrice) {
                    handleOnChangeInput(null, key, "domesticPrice", "included");
                  }
                }}
              />
            </Col>
            <Col span={2}>
                <p style={{padding: '5px',display: 'flex'}}>$</p>
            </Col>
            <Col span={6}>
              <InputStyles
                type="number"
                placeholder="Amount"
                value={includedRowData.internationalPrice}
                onChange={e =>
                  handleOnChangeInput(
                    e.target.value,
                    key,
                    "internationalPrice",
                    "included"
                  )
                }
                onKeyDown={e => {
                  if (e.keyCode === 8 && !includedRowData.internationalPrice) {
                    handleOnChangeInput(
                      null,
                      key,
                      "internationalPrice",
                      "included"
                    );
                  }
                }}
              />
            </Col>
          </RowStyles>
        ))}
        <HeaderRowStyles>
          <Col span={8}>Total</Col>
          <Col span={8}>Rs. {priceTableData.domesticTotal}(Estimate)</Col>
          <Col span={8}>$ {priceTableData.internationalTotal}(Estimate)</Col>
        </HeaderRowStyles>
      </Container>

      <Container>
        <HeaderTitleStyle>{"Excluded"}</HeaderTitleStyle>
        <HeaderRowStyles>
          <Col span={24}>Name</Col>
        </HeaderRowStyles>
        {priceTableData.excluded.map((excludedRowData, key) => (
          <RowStyles key={key}>
            <Col span={24}>
              <InputStyles
                value={excludedRowData.name}
                placeholder="Name"
                onChange={e =>
                  handleOnChangeInput(e.target.value, key, "name", "excluded")
                }
                onKeyDown={e => {
                  if (e.keyCode === 8 && !excludedRowData.name) {
                    handleOnChangeInput(null, key, "name", "excluded");
                  }
                }}
              />
            </Col>
          </RowStyles>
        ))}

        <ButtonStyles type="primary" onClick={() => displayResult()}>
          Submit
        </ButtonStyles>
      </Container>
    </div>
  );
};

export default PriceListComponent;
