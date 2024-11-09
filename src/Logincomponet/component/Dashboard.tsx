import React from 'react';
import imgpath from '../styles/A601A146-AC64-4EB8-8BE9-69FFF2613E9D.jpeg'
interface DashboardProps {
    username:String;
    email:String;
};

const Dashboard: React.FC <DashboardProps> = ({username, email}) => {

    return (
        <div className='Dashboard'>
            <div className='DashboardHeader'>
                <div className='navbar'>
                    <h2>myLoginWeb UserDashboard</h2>
                </div>
                <div className='userinfo'>
                    <label>{username}<br/>{email}</label>
                    <label></label>
                    <img src={imgpath} id='userimg'></img>
                </div>
                


            </div><
                div className='DashboardBody'>
                    <h1>這裡是用戶登入完後用戶進入的介面</h1>
                </div>

        </div>
    );
};

export default Dashboard