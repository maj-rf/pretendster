import { LoginForm } from '@/components/login/LoginForm';
import { ModeToggle } from '@/components/navbar/ModeToggle';
export const Login = () => {
  return (
    <section className="max-w-5xl min-h-screen md:p-4 mx-auto grid md:grid-cols-2 md:place-items-center">
      <div className="relative h-full">
        <img
          src="https://burst.shopifycdn.com/photos/blue-nature.jpg?width=1850&format=pjpg&exif=1&iptc=1"
          className="object-cover md:h-full aspect-video md:rounded-md"
        />
        <div className="absolute top-0 right-0 p-3">
          <ModeToggle />
        </div>
      </div>
      <LoginForm />
    </section>
  );
};
