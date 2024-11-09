// /src/services/authService.ts
// 登入验证
export const login = async (email: string, password: string) => {
    try {
     
      const response = await fetch('http://localhost:8000/myLoginBackEnd.php/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      
      });
      const text = await response.json(); // 查看后端返回的原始内容
      if (text.loginSuccess) {
        console.log(response.ok)
        return text; // 返回用户信息或 token
      }else{
          throw new Error('登录失败，邮箱或密码错误');
      }
  
      
    } catch (error) {
      console.error('Login Error:', error);
      throw error;
    }
  };
  
//注册验证
export const register = async (username:string ,password: string, email: string) =>{
  try{
    console.log('注册')
    const response = await fetch("http://localhost:8000/myLoginBackEnd.php/register",{
      method: 'POST',
      headers: { 'Content-Type' : 'application/json'},
      body: JSON.stringify({username, password, email})

    });
    const text = await response.json();
    return text

  }catch (error){
    console.error('rigister Error:', error);
  }

}