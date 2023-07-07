import { Navbar } from './navbar/Navbar';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <>
      <div className="flex flex-col justify-center leading-loose">
        <Navbar />
        <main className="grow">
          <Outlet />
        </main>
      </div>
    </>
  );
};
