// // // // File: src/layouts/PublicLayout.jsx
// // // // Purpose: Layout for the public home page. It includes all visuals and manages the login modal.

// // // import React, { useState } from 'react';
// // // import { Outlet } from 'react-router-dom';
// // // import Navbar from '../components/Navbar';
// // // import Footer from '../components/Footer';
// // // import Hero from '../components/Hero';
// // // import ImageScroller from '../components/ImageScroller';
// // // import LoginModal from '../components/LoginModal';
// // // import RegisterModal from '../components/RegisterModal';

// // // const PublicLayout = () => {
// // //   const [isLoginModalOpen, setLoginModalOpen] = useState(false);
// // //   const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);

// // //   const openLogin = () => {
// // //     setRegisterModalOpen(false);
// // //     setLoginModalOpen(true);
// // //   };

// // //   const openRegister = () => {
// // //     setLoginModalOpen(false);
// // //     setRegisterModalOpen(true);
// // //   };

// // //   return (
// // //     <div className="flex flex-col min-h-screen bg-gray-100">
// // //       <Navbar onLoginClick={openLogin} onSignUpClick={openRegister} />
// // //       <Hero />
// // //       <ImageScroller />
// // //       <main className="flex-grow">
// // //         <Outlet context={{ openLoginModal: openLogin }} /> 
// // //       </main>
// // //       <Footer />
// // //       <LoginModal isOpen={isLoginModalOpen} onClose={() => setLoginModalOpen(false)} onSwitchToRegister={openRegister} />
// // //       <RegisterModal isOpen={isRegisterModalOpen} onClose={() => setRegisterModalOpen(false)} onSwitchToLogin={openLogin} />
// // //     </div>
// // //   );
// // // };

// // // export default PublicLayout;

// // // File: src/layouts/PublicLayout.jsx
// // // Purpose: This parent component correctly manages the state for both modals,
// // // preventing a circular dependency between them.

// // import React, { useState } from 'react';
// // import { Outlet } from 'react-router-dom';
// // import Navbar from '../components/Navbar';
// // import Footer from '../components/Footer';
// // import Hero from '../components/Hero';
// // import ImageScroller from '../components/ImageScroller';
// // import LoginModal from '../components/LoginModal';
// // import RegisterModal from '../components/RegisterModal';

// // const PublicLayout = () => {
// //   const [isLoginModalOpen, setLoginModalOpen] = useState(false);
// //   const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);

// //   // These functions control which modal is visible.
// //   const openLogin = () => {
// //     setRegisterModalOpen(false);
// //     setLoginModalOpen(true);
// //   };

// //   const openRegister = () => {
// //     setLoginModalOpen(false);
// //     setRegisterModalOpen(true);
// //   };

// //   return (
// //     <div className="flex flex-col min-h-screen bg-gray-100">
// //       <Navbar onLoginClick={openLogin} onSignUpClick={openRegister} />
// //       <Hero />
// //       <ImageScroller />
// //       <main className="flex-grow">
// //         <Outlet context={{ openLoginModal: openLogin }} /> 
// //       </main>
// //       <Footer />
// //       {/* The functions are passed down as props, so the modals don't need to import each other. */}
// //       <LoginModal isOpen={isLoginModalOpen} onClose={() => setLoginModalOpen(false)} onSwitchToRegister={openRegister} />
// //       <RegisterModal isOpen={isRegisterModalOpen} onClose={() => setRegisterModalOpen(false)} onSwitchToLogin={openLogin} />
// //     </div>
// //   );
// // };

// // export default PublicLayout;


// // File: src/layouts/PublicLayout.jsx
// // UPDATED: This is the correct setup for managing both login and register modals.

// import React, { useState } from 'react';
// import { Outlet } from 'react-router-dom';
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';
// import Hero from '../components/Hero';
// import ImageScroller from '../components/ImageScroller';
// import LoginModal from '../components/LoginModal';
// import RegisterModal from '../components/RegisterModal';

// const PublicLayout = () => {
//   const [isLoginModalOpen, setLoginModalOpen] = useState(false);
//   const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);

//   // These functions control which modal is visible and ensure only one is open at a time.
//   const openLogin = () => {
//     setRegisterModalOpen(false);
//     setLoginModalOpen(true);
//   };

//   const openRegister = () => {
//     setLoginModalOpen(false);
//     setRegisterModalOpen(true);
//   };

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-100">
//       {/* The functions are passed down as props to the Navbar */}
//       <Navbar onLoginClick={openLogin} onSignUpClick={openRegister} />
//       <Hero />
//       <ImageScroller />
//       <main className="flex-grow">
//         <Outlet context={{ openLoginModal: openLogin }} /> 
//       </main>
//       <Footer />
//       {/* The modals are rendered here and controlled by the state in this component */}
//       <LoginModal isOpen={isLoginModalOpen} onClose={() => setLoginModalOpen(false)} onSwitchToRegister={openRegister} />
//       <RegisterModal isOpen={isRegisterModalOpen} onClose={() => setRegisterModalOpen(false)} onSwitchToLogin={openLogin} />
//     </div>
//   );
// };

// export default PublicLayout;


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

  // These functions control which modal is visible and ensure only one is open at a time.
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
      {/* The functions are passed down as props to the Navbar */}
      <Navbar onLoginClick={openLogin} onSignUpClick={openRegister} />
      <Hero />
      <ImageScroller />
      <main className="flex-grow">
        <Outlet context={{ openLoginModal: openLogin }} /> 
      </main>
      <Footer />
      {/* The modals are rendered here and controlled by the state in this component */}
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setLoginModalOpen(false)} onSwitchToRegister={openRegister} />
      <RegisterModal isOpen={isRegisterModalOpen} onClose={() => setRegisterModalOpen(false)} onSwitchToLogin={openLogin} />
    </div>
  );
};

export default PublicLayout;