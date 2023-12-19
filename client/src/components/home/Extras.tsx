import { Card, CardContent, CardFooter } from '../ui/card';

export const Extras = () => {
  return (
    <Card className="hidden md:flex flex-col rounded-xl h-fit w-full">
      <CardContent>
        <div className="grid-cols-2">
          <p>User Agreement</p>
          <p>Privacy Policy</p>
        </div>
      </CardContent>
      <CardFooter>Pretendster, Inc. © 2023. All rights reserved.</CardFooter>
    </Card>
  );
};
