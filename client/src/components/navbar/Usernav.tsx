import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { GeneralAvatar } from '../common/GeneralAvatar';
import { User, LogOut, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PublicUser } from '@/types/types';
import { useLogout } from '@/hooks/useLogout';

export const Usernav = ({ user }: { user: PublicUser }) => {
  const mutation = useLogout();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative rounded-full w-10 h-10">
          <GeneralAvatar
            username={user.username}
            profileImg={user.profileImg}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="w-screen max-w-md mt-2">
        <DropdownMenuLabel>
          <div>
            <p>{user.username}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link to="/">
              <Home className="mr-2 h-6 w-6" />
              <span>Home</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to={`/profile/${user.id}`}>
              <User className="mr-2 h-6 w-6" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Button
              variant="ghost"
              className="w-full flex justify-start"
              onClick={() => mutation.mutate()}
            >
              <LogOut className="mr-2 h-6 w-6" />
              <span>Logout</span>
            </Button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
