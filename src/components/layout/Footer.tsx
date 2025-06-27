import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  console.log('Footer loaded');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-4 px-4 md:px-6 border-t bg-background">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between text-sm text-muted-foreground">
        <p className="mb-2 sm:mb-0">
          &copy; {currentYear} SmartLogin. All rights reserved.
        </p>
        <nav className="flex items-center gap-4">
          <Link to="#" className="hover:text-primary transition-colors">
            Terms of Service
          </Link>
          <Link to="#" className="hover:text-primary transition-colors">
            Privacy Policy
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;