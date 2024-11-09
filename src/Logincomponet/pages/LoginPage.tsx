import React, { useState }  from 'react';
import LoginForm from '../component/Login';
import { useNavigate } from 'react-router-dom'; // 假设你使用 react-router
import { login } from '../services/authService';
// 定义 props 类型
interface MyComponentProps {
    
  }

  const MyLoginPage: React.FC<MyComponentProps> = ({}) => {
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleLogin = async (values: { email: string; password: string }) => {
      try {
        const userData = await login(values.email, values.password);
        console.log('登录成功:', userData);
        // 登录成功后跳转到仪表板页面
        navigate('/', { state: {userData} });
      } catch (err) {
        setError('登录失败，请检查邮箱或密码');
      }
    };
      return (
        <div className='LoginPage'>
        
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <LoginForm onFinish={handleLogin}/>
        </div>
      );
  };
  
  export default MyLoginPage;