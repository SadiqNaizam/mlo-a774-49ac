import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link, useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useToast } from "@/components/ui/use-toast";

// Assuming these components exist as per the project description
import SocialLoginButtons from '@/components/SocialLoginButtons';
import PasswordStrengthIndicator from '@/components/PasswordStrengthIndicator';

// --- Form Schemas ---

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
});

const signUpSchema = z.object({
    email: z.string().email({ message: 'Invalid email address.' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters long.' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ['confirmPassword'], // apath to show the error on
  });

type LoginFormValues = z.infer<typeof loginSchema>;
type SignUpFormValues = z.infer<typeof signUpSchema>;

interface AuthFormProps {
  defaultView?: 'login' | 'signup';
}

const AuthForm: React.FC<AuthFormProps> = ({ defaultView = 'login' }) => {
  console.log('AuthForm loaded');
  const { toast } = useToast();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState(defaultView);

  // --- Login Form Hook ---
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // --- Sign-Up Form Hook ---
  const signUpForm = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });
  const passwordValue = signUpForm.watch('password');

  // --- Submission Handlers ---
  function onLoginSubmit(values: LoginFormValues) {
    console.log('Login form submitted:', values);
    toast({
        title: "Login Successful",
        description: "Redirecting you to the dashboard...",
    });
    // Simulate API call and redirect
    setTimeout(() => navigate('/dashboard'), 1000);
  }

  function onSignUpSubmit(values: SignUpFormValues) {
    console.log('Sign-up form submitted:', values);
    toast({
        title: "Account Created!",
        description: "You have successfully signed up. Please log in.",
    });
    // On successful signup, switch to the login tab
    setActiveTab('login');
    loginForm.reset();
    signUpForm.reset();
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">SmartLogin</CardTitle>
            <CardDescription>
                {activeTab === 'login' ? 'Sign in to your account' : 'Create a new account to get started'}
            </CardDescription>
            <TabsList className="grid w-full grid-cols-2 mt-4">
                <TabsTrigger value="login">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
        </CardHeader>
        <CardContent>
          <TabsContent value="login">
            <Form {...loginForm}>
              <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                <FormField
                  control={loginForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="name@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={loginForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                         <FormLabel>Password</FormLabel>
                         <Link to="/forgot-password" className="text-sm font-medium text-primary hover:underline">
                            Forgot Password?
                         </Link>
                      </div>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Sign In
                </Button>
              </form>
            </Form>
            <Separator className="my-6" />
            <SocialLoginButtons />
          </TabsContent>

          <TabsContent value="signup">
            <Form {...signUpForm}>
                <form onSubmit={signUpForm.handleSubmit(onSignUpSubmit)} className="space-y-4">
                    <FormField
                        control={signUpForm.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="name@example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={signUpForm.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="••••••••" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <PasswordStrengthIndicator password={passwordValue} />
                    <FormField
                        control={signUpForm.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="••••••••" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full">
                        Create Account
                    </Button>
                </form>
            </Form>
            <Separator className="my-6" />
            <SocialLoginButtons />
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
};

export default AuthForm;