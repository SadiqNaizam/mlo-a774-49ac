import React from 'react';
import { Link } from 'react-router-dom';
import { LockKeyhole } from 'lucide-react';

const Header: React.FC = () => {
  console.log('Header loaded');

  return (
    <header className="py-4 px-4 md:px-6 border-b bg-background">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold">
          <LockKeyhole className="h-6 w-6 text-primary" />
          <span>SmartLogin</span>
        </Link>
        {/* Navigation could be added here if needed in the future */}
      </div>
    </header>
  );
};

export default Header;