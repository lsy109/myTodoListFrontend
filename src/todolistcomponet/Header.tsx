import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

interface HeaderProps {
  userData: { id: string; username: string; email: string };
  clearUserData: () => void;
}

const Header: React.FC<HeaderProps> = ({ userData, clearUserData }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState<string>('');

  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleLoginClick = () => {
    navigate('/login');
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
  };

  const handleLogout = () => {
    clearUserData();
    navigate('/login');
  };

  const handleModalClose = () => {
    setShowModal(false);
    setModalContent('');
  };

  const handleViewUserInfo = () => {
    setModalContent(
      `<p><strong>ID:</strong> ${userData.id}</p>
       <p><strong>Username:</strong> ${userData.username}</p>
       <p><strong>Email:</strong> ${userData.email}</p>`
    );
    setShowModal(true);
    setIsDropdownOpen(false);
  };

  return (
    <header className="header">
      <h1 className="title">TODO-LIST</h1>
      <nav className="nav">
        <Link to="" className="about-link">关于</Link>
        {userData?.username ? (
          <div className="username-container" ref={dropdownRef}>
            <span className="username-display" onClick={toggleDropdown}>
              欢迎, {userData.username}
            </span>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <button onClick={handleViewUserInfo}>用户信息</button>
                <button onClick={handleLogout}>登出</button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="login-register-link">登入/註冊</Link>
        )}
      </nav>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>用户信息</h2>
            <div dangerouslySetInnerHTML={{ __html: modalContent }} />
            <button className="close-button" onClick={handleModalClose}>关闭</button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
