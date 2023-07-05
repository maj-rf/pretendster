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

const formSchema = z.object({
  email: z.string().email({ message: 'Must be a valid email address' }),
  password: z.string(),
});

export const LoginForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
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
          <h1 className="text-center">Welcome!</h1>
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
          <Button>Login</Button>
          <Button type="button" variant="secondary">
            Guest Login
          </Button>
          <small className="text-sm">
            Need an account?{' '}
            <Link
              className="text-green-700 underline hover:decoration-emerald-300"
              to="/register"
            >
              Register
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
