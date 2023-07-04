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
import { Link } from 'react-router-dom';

type User = {
  username: string;
  email: string;
  profileImg: string;
};

export const Usernav = ({ user }: { user: User }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative rounded-full w-10 h-10">
          <Avatar className="w-10 h-10">
            <AvatarImage src={user.profileImg} />
            <AvatarFallback></AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-96">
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
            <Link to="/home">
              <Home className="mr-2 h-6 w-6" />
              <span>Home</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/profile">
              <User className="mr-2 h-6 w-6" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/logout">
              <LogOut className="mr-2 h-6 w-6" />
              <span>Logout</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
