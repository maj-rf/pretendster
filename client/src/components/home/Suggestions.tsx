import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

const users = [
  {
    id: 11,
    firstName: 'Marcel',
    lastName: 'Jones',
    age: 39,
    image: 'https://robohash.org/impeditautest.png',
  },
  {
    id: 12,
    firstName: 'Assunta',
    lastName: 'Rath',
    age: 42,
    image: 'https://robohash.org/namquaerataut.png',
  },
  {
    id: 13,
    firstName: 'Trace',
    lastName: 'Douglas',
    age: 26,
    image: 'https://robohash.org/voluptatemsintnulla.png',
  },
  {
    id: 14,
    firstName: 'Enoch',
    lastName: 'Lynch',
    age: 21,
    image: 'https://robohash.org/quisequienim.png',
  },
  {
    id: 15,
    firstName: 'Jeanne',
    lastName: 'Halvorson',
    age: 26,
    image: 'https://robohash.org/autquiaut.png',
  },
  {
    id: 16,
    firstName: 'Trycia',
    lastName: 'Fadel',
    age: 41,
    image: 'https://robohash.org/porronumquamid.png',
  },
  {
    id: 17,
    firstName: 'Bradford',
    lastName: 'Prohaska',
    age: 43,
    image: 'https://robohash.org/accusantiumvoluptateseos.png',
  },
  {
    id: 18,
    firstName: 'Arely',
    lastName: 'Skiles',
    age: 42,
    image: 'https://robohash.org/nihilharumqui.png',
  },
];

export const Suggestions = () => {
  return (
    <section className="hidden md:block space-y-6 col-span-3 m-2 p-4 bg-secondary rounded-xl">
      <h1 className="text-center">Friend Suggestions</h1>
      {users.map((user) => {
        return (
          <div
            key={user.id}
            className="flex items-center hover:bg-primary-foreground p-1"
          >
            <Avatar className="h-10 w-10 border border-border ">
              <AvatarImage src={user.image} />
              <AvatarFallback>
                {`${user.firstName[0]} ${user.lastName[0]}`}
              </AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">
                {`${user.firstName} ${user.lastName}`}
              </p>
            </div>
          </div>
        );
      })}
    </section>
  );
};
