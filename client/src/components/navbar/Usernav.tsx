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
import { AvatarImage, Avatar, AvatarFallback } from '../ui/avatar';
import { User, LogOut, Home } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { logout } from '@/services/authService';
import { useAuth } from '@/hooks/useAuth';
import { PublicUser } from '@/types/types';

export const Usernav = ({ user }: { user: PublicUser }) => {
  const { dispatch } = useAuth();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      dispatch({ type: 'logout' });
      navigate('/login');
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative rounded-full w-10 h-10">
          <Avatar className="w-10 h-10">
            <AvatarImage
              src={user.profileImg}
              className="object-cover object-top"
            />
            <AvatarFallback></AvatarFallback>
          </Avatar>
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
