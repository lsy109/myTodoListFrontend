// /src/pages/RegisterPage.tsx
import React from 'react';
import Register from '../component/Register';
import { register } from '../services/authService';
import { Form, message } from 'antd';
import { useNavigate } from 'react-router-dom'; // 假设你使用 react-router
// 定义 props 类型
interface MyComponentProps {
    
}
const RegisterPage: React.FC = ({}) => {
  // 创建 Form 实例
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const registerProps ={
    
  }

  const handleRegister = async(values:{username:string; email:string; password: string}) =>{
    try{
      const userRegister = await register(values.username, values.password, values.email);
      if(userRegister.message ==="邮箱已存在"){
        form.setFields([
          {
            name: 'email',
            errors: ['邮箱已存在'],
          },
        ]);
      }else if(userRegister.message ==="用户名已存在"){
        form.setFields([
          {
            name: 'username',
            errors: ['用户名已存在'],
          },
        ]);
      }else if(userRegister.message ==="用户注册成功"){
        message.success('注册成功！');  // 显示成功提示
        form.resetFields(); // 注册成功后清空表单
        navigate('/login');

      }
      console.log(userRegister);

    }catch (error){
      console.error('注册失败:', error);
      message.error('注册失败，请稍后再试');

    }
  }
  

  return (
    <div className='RegisterPage'>
      <Register form={form} onFinish={handleRegister}/>
    </div>
  );
};

export default RegisterPage;
