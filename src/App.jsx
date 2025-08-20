// // import React from 'react';
// // import { Routes, Route } from 'react-router-dom';
// // import LoginPage from './pages/LoginPage';
// // import PublicHomePage from './pages/PublicHomePage';
// // import HomePage from './pages/HomePage';
// // import ProtectedRoute from './components/ProtectedRoute';
// // import PublicLayout from './layouts/PublicLayout';
// // import DashboardLayout from './layouts/DashboardLayout';
// // import NotFoundPage from './pages/NotFoundPage';

// // function App() {
// //   return (
// //     <Routes>
// //       {/* --- Standalone Public Routes --- */}
// //       <Route path="/login" element={<LoginPage />} />
      
// //       {/* --- Public Home Page (Wrapped in the visual PublicLayout) --- */}
// //       <Route element={<PublicLayout />}>
// //         <Route path="/" element={<PublicHomePage />} />
// //       </Route>

// //       {/* --- Protected Routes (Wrapped in the simple DashboardLayout) --- */}
// //       <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
// //         <Route path="/home" element={<HomePage />} />
// //       </Route>
      
// //       {/* --- System Routes --- */}
// //       <Route path="/unauthorized" element={<div className="text-center p-10"><h1>Unauthorized</h1></div>} />
// //       <Route path="*" element={<NotFoundPage />} />
// //     </Routes>
// //   );
// // }

// // export default App;


// // File: src/App.jsx
// // UPDATED: This is the final, correct routing structure.

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PublicHomePage from './pages/PublicHomePage';
import HomePage from './pages/HomePage';
import ProtectedRoute from './components/ProtectedRoute';
import PublicLayout from './layouts/PublicLayout';
import DashboardLayout from './layouts/DashboardLayout';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Routes>
      {/* --- Standalone Public Routes (with their own full-page visuals) --- */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* --- Public Home Page (Wrapped in the visual PublicLayout) --- */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<PublicHomePage />} />
      </Route>

      {/* --- Protected Routes (Wrapped in the simple DashboardLayout) --- */}
      <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
        <Route path="/home" element={<HomePage />} />
      </Route>
      
      {/* --- System Routes --- */}
      <Route path="/unauthorized" element={<div className="text-center p-10"><h1>Unauthorized</h1></div>} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;

// // File: src/App.jsx
// // UPDATED: This is the final, correct routing structure for your application.

// import React from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import LoginPage from './pages/LoginPage';
// import RegisterPage from './pages/RegisterPage';
// import PublicHomePage from './pages/PublicHomePage';
// import HomePage from './pages/HomePage';
// import ProtectedRoute from './components/ProtectedRoute';
// import PublicLayout from './layouts/PublicLayout';
// import DashboardLayout from './layouts/DashboardLayout';
// import NotFoundPage from './pages/NotFoundPage';

// function App() {
//   return (
//     <Routes>
//       {/* --- Standalone Public Routes --- */}
//       {/* These pages have their own unique, full-screen designs. */}
//       <Route path="/login" element={<LoginPage />} />
//       <Route path="/register" element={<RegisterPage />} />

//       {/* --- Public Home Page --- */}
//       {/* This route wraps the public landing page with the visual layout (Hero, Scroller, etc.). */}
//       <Route element={<PublicLayout />}>
//         <Route path="/" element={<PublicHomePage />} />
//       </Route>

//       {/* --- Protected User Dashboards --- */}
//       {/* This route wraps all logged-in pages with the simpler DashboardLayout. */}
//       <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
//         <Route path="/home" element={<HomePage />} />
//       </Route>
      
//       {/* --- System Routes --- */}
//       <Route path="/unauthorized" element={<div className="text-center p-10"><h1>Unauthorized</h1></div>} />
//       <Route path="*" element={<NotFoundPage />} />
//     </Routes>
//   );
// }

// export default App;
