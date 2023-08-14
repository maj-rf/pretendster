import { useAuth } from '@/hooks/useAuth';
import { ModeToggle } from './ModeToggle';
import { Usernav } from './Usernav';

export const Navbar = () => {
  const { state } = useAuth();

  return (
    <>
      {state.user ? (
        <header className="grow shadow-sm shadow-accent z-10">
          <nav className="container mx-auto px-10 py-3 flex items-center justify-between">
            <div className="text-xl font-bold">Pretendster</div>
            <div className="flex items-center gap-4">
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
