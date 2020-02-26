import React from "react";
import { Form, Input, Select, Button } from "antd";
import { connect } from "react-redux";
import { postApiData, fetchApiData } from "../../actions/FetchApiDataActions";
// import {TableStyles} from './styles'

const { Option } = Select;

const PriceInput = props => {
  const handleNumberChange = e => {
    const number = parseInt(e.target.value || 0, 10);
    if (isNaN(number)) {
      return;
    }
    triggerChange({ number });
  };

  const handleCurrencyChange = currency => {
    triggerChange({ currency });
  };

  const triggerChange = changedValue => {
    const { onChange, value } = props;
    if (onChange) {
      onChange({
        ...value,
        ...changedValue
      });
    }
  };

  return (
    <span>
      <Input
        type="text"
        size={props.size}
        value={props.value.number}
        onChange={handleNumberChange}
        style={{ width: "65%", marginRight: "3%" }}
      />
      <Select
        value={props.value.currency}
        size={props.size}
        style={{ width: "32%" }}
        onChange={handleCurrencyChange}
      >
        <Option value="rmb">RMB</Option>
        <Option value="dollar">Dollar</Option>
      </Select>
    </span>
  );
};

const RegistrationForm = props => {
  const { getFieldDecorator } = props.form;
  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        props.postApiData(values);
      }
    });
  };

  React.useEffect(() => {
    if(props.postDataList && props.postDataList.price){
      console.log("Lets check")
      // callFetchApiData();
    }
  }, [props, props.postDataList])

  const checkPrice = (rule, value, callback) => {
    if (value.number > 0) {
      return callback();
    }
    callback("Price must greater than zero!");
  };

  return (
    <Form layout="inline" onSubmit={handleSubmit}>
      <Form.Item label="Price">
        {getFieldDecorator("price", {
          initialValue: { number: 0, currency: "rmb" },
          rules: [{ validator: checkPrice }]
        })(<PriceInput />)}
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

const PostComponent = Form.create({ name: "register" })(RegistrationForm);

const mapStateToProps = statef => {
  return {
    isLoading: statef.apiData.isLoading,
    postsList: statef.apiData.postsList,
    postDataList: statef.apiData.postDataList
  };
};

const mapDispatchToProps = dispatch => ({
  fetchApiData: () => dispatch(fetchApiData()),
  postApiData: (data) => dispatch(postApiData(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostComponent);
