import React from 'react';

// Import custom layout components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Import the main authentication form component
import AuthForm from '@/components/AuthForm';

/**
 * SignUpPage Component
 * 
 * This page is dedicated to new user registration. It utilizes the versatile
 * AuthForm component, pre-configured to display the "Sign Up" tab by default.
 * The layout is structured with a consistent header and footer, providing a
 * seamless user experience within the SmartLogin application.
 */
const SignUpPage: React.FC = () => {
  console.log('SignUpPage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4">
        {/* 
          The AuthForm is the core of the page. By setting defaultView to "signup",
          we ensure that users land directly on the registration form,
          as specified by the page's purpose. The AuthForm itself contains all
          the necessary inputs, validation, and the password strength indicator.
        */}
        <AuthForm defaultView="signup" />
      </main>
      <Footer />
    </div>
  );
};

export default SignUpPage;