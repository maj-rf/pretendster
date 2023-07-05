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

const formSchema = z
  .object({
    email: z.string().email({ message: 'Must be a valid email address' }),
    username: z
      .string()
      .min(4, { message: 'Must be a minimum of 4 characters' }),
    password: z
      .string()
      .min(4, { message: 'Must be a minimum of 4 characters' }),
    confirmPass: z
      .string()
      .min(4, { message: 'Must be a minimum of 4 characters' }),
  })
  .refine((data) => data.password === data.confirmPass, {
    message: 'Passwords do not match',
    path: ['confirmPass'],
  });

export const RegisterForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      username: '',
      password: '',
      confirmPass: '',
    },
  });

  const navigate = useNavigate();

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    navigate('/');
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
            name="confirmPass"
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
          <Button>Register</Button>
          <small className="text-sm">
            Already have an account?{' '}
            <Link
              className="text-green-700 underline hover:decoration-emerald-300"
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
