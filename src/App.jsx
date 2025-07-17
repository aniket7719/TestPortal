import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import CreateTestPage from './pages/admin/CreateTestPage';
import AddQuestionsPage from './pages/admin/AddQuestionsPage';
import ManageTestsPage from './pages/admin/ManageTestsPage';

// Student Pages
import StudentDashboard from './pages/student/StudentDashboard';
import StartTestPage from './pages/student/StartTestPage';
import TakeTestPage from './pages/student/TakeTestPage';
import ViewResultPage from './pages/student/ViewResultPage';

const App = () => {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/create-test"
          element={
            <ProtectedRoute role="ADMIN">
              <CreateTestPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/tests/:testId/add-questions"
          element={
            <ProtectedRoute role="ADMIN">
              <AddQuestionsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/manage-tests"
          element={
            <ProtectedRoute role="ADMIN">
              <ManageTestsPage />
            </ProtectedRoute>
          }
        />

        {/* Student Routes */}
        <Route
          path="/student"
          element={
            <ProtectedRoute role="STUDENT">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/start-test/:testId"
          element={
            <ProtectedRoute role="STUDENT">
              <StartTestPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/take-test/:testId"
          element={
            <ProtectedRoute role="STUDENT">
              <TakeTestPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/result/:testId"
          element={
            <ProtectedRoute role="STUDENT">
              <ViewResultPage />
            </ProtectedRoute>
          }
        />
        {/* Default Redirect */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
};

export default App;
