import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type Post = {
  id: number;
  title: string;
  reactions: number;
  userId: number;
};

export const Post = ({ post }: { post: Post }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{post.userId}</CardTitle>
        <CardDescription>{post.title}</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Like</Button>
        <Button>Comments</Button>
      </CardFooter>
    </Card>
  );
};
