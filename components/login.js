import { MessageOutlined, PhoneOutlined } from "@ant-design/icons/lib/icons";
import { Form, Input, Checkbox, Button, FormItem, message } from "antd";
import { useRouter } from "next/router";
import { useRef } from "react";
import inspirecloud from "../services/inspirecloud";
import styles from "../styles/Login.module.less";
export default function Login() {
  const phoneref = useRef();
  const router=useRouter();
  const onFinish = (value) => {
    const { phonenumber, code } = value;
    return inspirecloud
      .run("PhoneLogin", {
        phoneNumber: phonenumber,
        code: code,
      })
      .then((res) => {
        const { success } = res;
        if (success === true) {
          message.success(`登录成功`)
          location.reload()
        } else {
          message.error('验证码错误');
        }
      });
  };
  return (
    <div>
      <div id=""></div>
      <Form
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          label="手机号"
          name="phonenumber"
          rules={[
            {
              required: true,
              message: "请输入手机号!",
            },
          ]}
        >
          <Input
            prefix={<PhoneOutlined className="site-form-item-icon" />}
            ref={phoneref}
          />
        </Form.Item>

        <Form.Item
          label="验证码"
          name="code"
          rules={[
            {
              required: true,
              message: "请输入验证码!",
            },
          ]}
        >
          <Input prefix={<MessageOutlined />} />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button
            type="default"
            onClick={(e) => {
              e.preventDefault();
              getMessage(phoneref.current.input.value);
            }}
          >
            获取验证码
          </Button>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

const getMessage = function (phoneNum) {
  if (phoneNum.length !== 11) {
    message.error('请输入正确格式手机号');
  } else {
    return inspirecloud
      .run("SendMessage", {
        phoneNumber: phoneNum,
      })
      .then((res) => {message.success('发送成功')});
  }
};
