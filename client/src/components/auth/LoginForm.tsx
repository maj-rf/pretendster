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
import { useMutation } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';
import { login } from '@/services/authService';
import { Loading } from '../Loading';

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
  const { dispatch } = useAuth();
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (payload) => {
      dispatch({ type: 'login', payload });
      navigate('/');
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
          <Button disabled={mutation.isLoading ? true : false}>
            {mutation.isLoading ? <Loading /> : 'Login'}
          </Button>
          <Button
            type="button"
            variant="secondary"
            disabled={mutation.isLoading ? true : false}
            onClick={() =>
              onSubmit({ email: 'tedlasso@gmail.com', password: 'tedlasso' })
            }
          >
            Guest Login
          </Button>
          <small className="text-sm">
            Need an account?{' '}
            <Link
              className="text-pt-underline underline hover:decoration-pt-underline"
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
