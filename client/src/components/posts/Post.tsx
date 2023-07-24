import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useState } from 'react';

type PostProps = {
  id: number;
  title: string;
  reactions: number;
  userId: number;
};

export const Post = ({
  post,
  children,
}: {
  post: PostProps;
  children: React.ReactNode;
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <Card className="bg-primary-foreground snap-start">
      <CardHeader>
        <CardTitle>{post.userId}</CardTitle>
        <CardDescription>{post.userId}</CardDescription>
      </CardHeader>
      <CardContent>{post.title}</CardContent>
      <CardFooter className="flex justify-between p-0">
        <Button className="basis-1/3 space-x-4 rounded-tr-none rounded-br-none">
          <Heart /> <span>{post.reactions}</span>
        </Button>
        <Button
          className="basis-2/3 rounded-tl-none rounded-bl-none"
          variant="ghost"
          onClick={() => setVisible(!visible)}
        >
          Comments
        </Button>
      </CardFooter>
      {visible ? children : null}
    </Card>
  );
};
