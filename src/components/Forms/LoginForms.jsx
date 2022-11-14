import React, { useEffect } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../Redux/Api/AuthApi";
import { useAppDispatch } from "../../Hooks/ReduxHooks";
import { setUser } from "../../Redux/Features/AuthSlice";

const LoginForms = () => {
  const navigate = useNavigate();
  const [login, { isSuccess, data }] = useLoginMutation();

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (isSuccess) {
      navigate("/Dashboard");
      dispatch(setUser({ token: data.jwt, user: data.user }));
    }
  }, [isSuccess, navigate, data, dispatch]);

  const onFinish = async (values) => {
    await login(values);
    navigate("/Dashboard");
  };

  return (
    <Form
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      labelCol={{ span: 10 }}
      wrapperCol={{ span: 14 }}
      // onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="identifier"
        rules={[{ required: true, message: "Please input your email!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{ offset: 2, span: 16 }}
      >
        <Checkbox style={{ color: "white" }}>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 1, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForms;
