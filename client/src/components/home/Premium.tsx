import { Button } from '../ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '../ui/card';

export const Premium = () => {
  return (
    <Card className="hidden md:flex flex-col rounded-xl w-full box__bg">
      <CardHeader className="self-start">
        <CardTitle>Pretendster Premium</CardTitle>
        <CardDescription>The best Pretendster experience.</CardDescription>
      </CardHeader>
      <CardContent>
        <Button className="w-full">Try it now</Button>
      </CardContent>
    </Card>
  );
};
