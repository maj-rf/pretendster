import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate, Link } from 'react-router-dom';
import { Github } from 'lucide-react';
import { register } from '@/services/authService';
import { useAuth } from '@/hooks/useAuth';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

const formSchema = z
  .object({
    email: z.string().email({ message: 'Must be a valid email address' }),
    username: z
      .string()
      .min(4, { message: 'Must be a minimum of 4 characters' }),
    password: z
      .string()
      .min(4, { message: 'Must be a minimum of 4 characters' }),
    passConfirm: z
      .string()
      .min(4, { message: 'Must be a minimum of 4 characters' }),
  })
  .refine((data) => data.password === data.passConfirm, {
    message: 'Passwords do not match',
    path: ['passConfirm'],
  });

export const RegisterForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      username: '',
      password: '',
      passConfirm: '',
    },
  });

  const navigate = useNavigate();
  const { dispatch } = useAuth();
  const mutation = useMutation({
    mutationFn: register,
    onSuccess: (payload) => {
      dispatch({ type: 'login', payload });
      navigate('/');
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        form.setError('email', {
          type: 'server',
          message: err.response?.data.error,
        });
      }
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate(values);
  }

  return (
    <div className="w-full h-full grid place-items-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-4 px-8 py-4 w-full"
        >
          <h1 className="text-center font-bold">Signup</h1>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="your@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="your_username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="*********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="passConfirm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input placeholder="*********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={mutation.isLoading ? true : false}>Register</Button>
          <small className="text-sm">
            Already have an account?{' '}
            <Link
              className="text-pt-underline underline hover:decoration-pt-underline"
              to="/login"
            >
              Login
            </Link>
          </small>
        </form>
      </Form>
      <a
        href="https://github.com/bananabread08/pretendster"
        target="_blank"
        className="flex gap-2 items-center justify-center self-end hover:underline"
      >
        <Github fill="auto" /> Made by bananabread08
      </a>
    </div>
  );
};
