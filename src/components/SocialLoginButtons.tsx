import * as React from "react";

import { Button } from "@/components/ui/button";

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.02 1.02-2.62 1.9-4.63 1.9-3.87 0-7-3.13-7-7s3.13-7 7-7c1.73 0 3.26.68 4.38 1.62l2.6-2.6C16.88 1.12 14.88 0 12.48 0 5.88 0 .04 5.88.04 13s5.84 13 12.44 13c3.1 0 5.6-1.02 7.44-2.88 1.93-1.93 2.5-4.82 2.5-7.78-.01-.62-.07-1.22-.18-1.82H12.48z"
      fill="currentColor"
    />
  </svg>
);

const GitHubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
      fill="currentColor"
    />
  </svg>
);


const SocialLoginButtons: React.FC = () => {
  console.log("SocialLoginButtons loaded");

  const handleSocialLogin = (provider: 'google' | 'github') => {
    // In a real app, this would trigger the OAuth flow.
    console.log(`Handling ${provider} login...`);
  };

  return (
    <div className="w-full">
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button variant="outline" type="button" onClick={() => handleSocialLogin('google')}>
          <GoogleIcon className="mr-2 h-4 w-4" />
          Google
        </Button>
        <Button variant="outline" type="button" onClick={() => handleSocialLogin('github')}>
          <GitHubIcon className="mr-2 h-4 w-4" />
          GitHub
        </Button>
      </div>
    </div>
  );
};

export default SocialLoginButtons;