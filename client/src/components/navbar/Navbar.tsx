import { Usernav } from './Usernav';

export const Navbar = () => {
  const user = {
    username: 'Rozeluxe',
    email: 'rozeluxe@gmail.com',
    profileImg: 'https://i.pravatar.cc/150?img=3',
  };

  return (
    <>
      {user ? (
        <header className="border-b-4">
          <nav className="container mx-auto px-10 py-3 flex items-center justify-between">
            <div className="text-xl font-bold">Pretendster</div>
            <Usernav user={user} />
          </nav>
        </header>
      ) : (
        <></>
      )}
    </>
  );
};
