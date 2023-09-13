import { AppInfo } from '@/components/auth/AppInfo';
import { LoginForm } from '@/components/auth/LoginForm';
import { ModeToggle } from '@/components/navbar/ModeToggle';
import { useAuth } from '@/hooks/useAuth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
export const Login = () => {
  const { state } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (state.user) navigate('/');
  }, [state.user, navigate]);

  return (
    <section className="max-w-5xl min-h-screen md:p-4 mx-auto grid md:grid-cols-2 md:place-items-center">
      <div className="relative h-full">
        <img
          src="https://burst.shopifycdn.com/photos/blue-nature.jpg?width=1850&format=pjpg&exif=1&iptc=1"
          className="object-cover min-h-full aspect-video md:rounded-md"
        />
        <div className="absolute top-0 right-0 p-3">
          <ModeToggle />
        </div>
        <div className="absolute bottom-0 left-0 w-full">
          <AppInfo />
        </div>
      </div>
      <LoginForm />
    </section>
  );
};
