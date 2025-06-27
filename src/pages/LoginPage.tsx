import React from 'react';

// Import custom layout components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Import the main authentication form component which contains all the logic
import AuthForm from '@/components/AuthForm';

const LoginPage: React.FC = () => {
  console.log('LoginPage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4">
        {/* 
          The AuthForm component is the core of this page.
          It includes the Card, Tabs for login/signup, all form fields (Input, Label, Button),
          and the SocialLoginButtons. It is passed the `defaultView` prop to ensure
          the login form is shown first, as expected for a LoginPage.
        */}
        <AuthForm defaultView="login" />
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;