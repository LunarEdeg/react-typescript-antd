import React from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import './index.less';

const { Item } = Form;

const Login: React.FC = () => {
  const [form] = Form.useForm();
  const history = useHistory();

  const handleSubmit = (v: any) => {
    console.log(v);
    history.replace('/');
  };

  const onReset = () => {
    form.resetFields();
  };

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };

  return (
    <div className='user-login'>
      <div className='user-login__title'>大地管理系统</div>
      <Form {...layout} form={form} onFinish={handleSubmit}>
        <Item name='name' label='账号：' rules={[{ required: true, message: '账号不能为空' }]}>
          <Input placeholder='请输入账号' prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} />
        </Item>
        <Item name='password' label='密码：' rules={[{ required: true, message: '密码不能为空' }]}>
          <Input placeholder='请输入密码' prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} />
        </Item>
        <Item name='captcha' label='验证码：' rules={[{ required: true, message: '验证码不能为空' }]}>
          <Input placeholder='请输入验证码' prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} />
        </Item>
        <Item>
          <Button type='primary' htmlType='submit'>
            登录
          </Button>
          <Button htmlType='button' onClick={onReset}>
            Reset
          </Button>
        </Item>
      </Form>
    </div>
  );
};

export default Login;
