import React , { useState }from 'react';
import { Form, Input, Button ,Checkbox} from 'antd';
import { Rule } from 'antd/lib/form';
import { useNavigate } from 'react-router-dom'; // 导入 useNavigate

// 定义 props 类型
interface MyLoginProps{
    onFinish: (values: { email: string; password: string }) => void;
} 
const emailRules: Rule[] = [
  { type: 'email', message: '无效的邮箱' },
  { required: true, message: '请输入邮箱' },
];

const passwordRules: Rule[] = [
  { required: true, message: '请输入密码' },
  { min: 6, message: '密码至少8个字符' },
];

const LoginForm: React.FC <MyLoginProps>= ({onFinish}) => {
  const navigate = useNavigate(); // 初始化 navigate
  const [checked, setChecked] = useState(false);
  const handleChange = () => {
    setChecked(checked);
  };
  const handleRegister = () => {
    // 跳转到 /dashboard 页面
    navigate('/register');
  };
  return (
    <div className="Login">
      <h2>用户登入</h2>
      <div className="row justify-content-center ">
        <div className="col-md-8">
          <Form onFinish={onFinish} layout="vertical">
          <Form.Item label="Email" name="email" rules={emailRules}>
            <Input className='halfsee'/>
          </Form.Item>

          <Form.Item label="Password" name="password" rules={passwordRules}>
            <Input.Password className='halfsee' />
          </Form.Item>
          
          
            <Button type="primary" htmlType="submit" className="btn btn-light ">登入</Button>
         
            <Button type="primary" htmlType="submit" className="btn btn-light" onClick={handleRegister}>注册</Button>
          
          
          </Form>
        </div>
      </div>
    
    </div>
  );
};

export default LoginForm;