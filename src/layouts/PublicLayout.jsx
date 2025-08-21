

import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import ImageScroller from '../components/ImageScroller';
import LoginModal from '../components/LoginModal';
import RegisterModal from '../components/RegisterModal';

const PublicLayout = () => {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);

  const openLogin = () => {
    setRegisterModalOpen(false);
    setLoginModalOpen(true);
  };

  const openRegister = () => {
    setLoginModalOpen(false);
    setRegisterModalOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar onLoginClick={openLogin} onSignUpClick={openRegister} />
      <Hero />
      <ImageScroller />
      <main className="flex-grow">
        <Outlet context={{ openLoginModal: openLogin }} /> 
      </main>
      <Footer />
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setLoginModalOpen(false)} onSwitchToRegister={openRegister} />
      <RegisterModal isOpen={isRegisterModalOpen} onClose={() => setRegisterModalOpen(false)} onSwitchToLogin={openLogin} />
    </div>
  );
};

export default PublicLayout;