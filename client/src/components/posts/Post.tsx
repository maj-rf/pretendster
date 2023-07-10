import { Button } from '@/components/ui/button';
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
    <Card className="bg-primary-foreground">
      <CardHeader>
        <CardTitle>{post.userId}</CardTitle>
        <CardDescription>{post.title}</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Like</Button>
        <Button onClick={() => setVisible(!visible)}>Comments</Button>
      </CardFooter>
      {visible ? children : null}
    </Card>
  );
};
