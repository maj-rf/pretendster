import { useAuth } from '@/hooks/useAuth';
import { ModeToggle } from './ModeToggle';
import { Usernav } from './Usernav';
import { Searchbar } from './Searchbar';
import { Dog } from 'lucide-react';

export const Navbar = () => {
  const { state } = useAuth();

  return (
    <>
      {state.user ? (
        <header className="grow shadow-sm shadow-accent z-10">
          <nav className="container mx-auto px-6 py-3 flex items-center justify-between">
            <div className="text-xl font-bold flex items-center gap-2">
              <Dog />
              <span className="hidden md:block">Pretendster</span>
            </div>
            <div className="flex items-center gap-2">
              <Searchbar />
              <ModeToggle />
              <Usernav user={state.user} />
            </div>
          </nav>
        </header>
      ) : (
        <></>
      )}
    </>
  );
};
