import { ModeToggle } from './ModeToggle';
import { Usernav } from './Usernav';

export const Navbar = () => {
  const user = {
    username: 'Rozeluxe',
    email: 'rozeluxe@gmail.com',
    profileImg: 'https://i.pravatar.cc/150?img=3',
  };
  // const user = null;

  return (
    <>
      {user ? (
        <header className="border-b-4 grow">
          <nav className="container mx-auto px-10 py-3 flex items-center justify-between">
            <div className="text-xl font-bold">Pretendster</div>
            <div className="flex items-center gap-4">
              <ModeToggle />
              <Usernav user={user} />
            </div>
          </nav>
        </header>
      ) : (
        <></>
      )}
    </>
  );
};
