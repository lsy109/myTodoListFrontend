// /src/pages/RegisterPage.tsx
import React from 'react';
import { Form, Input, Button,FormInstance } from 'antd';

// 定义 props 类型
interface RegisterProps{
  onFinish: (values: { username: string; email: string; password: string  }) => void;
  form: FormInstance;  // 添加 form 实例的类型,用于registerpage触发rules
} 


const Register: React.FC <RegisterProps>= ({onFinish,form}) => {
 
  return (
    <div className="Register  " >
      <div className="row justify-content-center ">
        <div className="col-md-8">
          <h2 className="text-center">用户注册 </h2>
          <Form form={form}  onFinish={onFinish} layout="vertical" className="mt-4">
            <Form.Item 
              label="Username" 
              name="username" 
              rules={[{ required: true, message: '请输入用户名' }]}
            >
              <Input className="halfsee"  placeholder="Enter UserName" />
            </Form.Item>
            <Form.Item 
              label="Email" 
              name="email" 
              rules={[{ required: true, message: '请输入邮箱' }]}
            >
              <Input className="halfsee" placeholder="Enter Email"/>
            </Form.Item>
            <Form.Item 
              label="Password" 
              name="password" 
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input.Password className="halfsee"  placeholder="Enter Password"/>
            </Form.Item>
            <Form.Item 
              label="Confirm Password" 
              name="confirm" 
              dependencies={['password']} // 确保引用 password
              rules={[
                { required: true, message: '请确认您的密码' },
                ({getFieldValue}) => ({
                  validator(_, value) {
                    if(!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('两次输入的密码不匹配!'))
                  }
                })

              ]}
            >
              <Input.Password className="halfsee"  placeholder="Confirm Password"/>
            </Form.Item>

            <div className="registerButton"> {/* 包裹按钮并使用 text-center */}
              <Button type="primary" htmlType="submit" className=" button1" >注册</Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Register;
