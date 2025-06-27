import React, { useState, useEffect } from 'react';
import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PasswordStrengthIndicatorProps {
  password?: string;
}

const strengthLevels = [
  { text: 'Weak', color: 'bg-red-500' },
  { text: 'Medium', color: 'bg-yellow-500' },
  { text: 'Strong', color: 'bg-blue-500' },
  { text: 'Very Strong', color: 'bg-green-500' },
];

const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({ password = '' }) => {
  console.log('PasswordStrengthIndicator loaded');

  const [strength, setStrength] = useState({ level: 0, text: '', color: 'bg-gray-200' });
  const [criteria, setCriteria] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });

  useEffect(() => {
    const checkPasswordStrength = (pass: string) => {
      const newCriteria = {
        length: pass.length >= 8,
        uppercase: /[A-Z]/.test(pass),
        lowercase: /[a-z]/.test(pass),
        number: /[0-9]/.test(pass),
        special: /[^A-Za-z0-9]/.test(pass),
      };
      setCriteria(newCriteria);

      const score = Object.values(newCriteria).filter(Boolean).length;

      if (pass.length === 0) {
        setStrength({ level: 0, text: '', color: 'bg-gray-200' });
        return;
      }
      
      let level = 0;
      if (score <= 2) {
        level = 1; // Weak
      } else if (score === 3) {
        level = 2; // Medium
      } else if (score === 4) {
        level = 3; // Strong
      } else if (score === 5) {
        level = 4; // Very Strong
      }

      setStrength({
        level: level,
        text: strengthLevels[level - 1]?.text || 'Weak',
        color: strengthLevels[level - 1]?.color || 'bg-red-500',
      });
    };

    checkPasswordStrength(password);
  }, [password]);

  const CriteriaItem = ({ met, text }: { met: boolean; text: string }) => (
    <li className={cn('flex items-center text-sm', met ? 'text-gray-600' : 'text-gray-500')}>
      {met ? (
        <Check className="h-4 w-4 mr-2 text-green-500" />
      ) : (
        <X className="h-4 w-4 mr-2 text-red-500" />
      )}
      {text}
    </li>
  );

  return (
    <div className="w-full space-y-3">
      <div className="flex items-center gap-x-2">
        <div className="grid grid-cols-4 gap-x-2 flex-grow">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className={cn(
                'h-2 rounded-full transition-colors',
                index < strength.level ? strength.color : 'bg-gray-200'
              )}
            />
          ))}
        </div>
        {password.length > 0 && <span className="text-sm font-medium w-24 text-right">{strength.text}</span>}
      </div>

      {password.length > 0 && (
        <div className="p-3 bg-gray-50 rounded-md border">
          <ul className="space-y-1">
            <CriteriaItem met={criteria.length} text="At least 8 characters" />
            <CriteriaItem met={criteria.lowercase} text="A lowercase letter" />
            <CriteriaItem met={criteria.uppercase} text="An uppercase letter" />
            <CriteriaItem met={criteria.number} text="A number" />
            <CriteriaItem met={criteria.special} text="A special character" />
          </ul>
        </div>
      )}
    </div>
  );
};

export default PasswordStrengthIndicator;