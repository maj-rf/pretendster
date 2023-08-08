import { useEffect, useState } from 'react';
import { Comment } from './Comment';

type CommentsProps = {
  postId: string;
};

const comments = [
  {
    id: 195,
    body: 'I am still wondering how can god create this kind of bizarre human being who is cute, adorable at the same time has no brain.',
    postId: 11,
    user: {
      id: 57,
      username: 'bpickering1k',
    },
  },
  {
    id: 196,
    body: 'You are my precious fool.',
    postId: 11,
    user: {
      id: 95,
      username: 'cchomiszewski2m',
    },
  },
];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const Comments = (props: CommentsProps) => {
  const postComments = comments.filter(
    (c) => c.postId.toString() === props.postId,
  );

  // delete this later once fetch is added
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function makeRequest() {
      await delay(1000);
      setLoading(false);
    }

    makeRequest();
  }, []);

  if (loading)
    return (
      <div className="p-6 bg-secondary text-muted-foreground transition-all duration-300">
        loading...
      </div>
    );

  return (
    <div className="p-6 bg-secondary text-muted-foreground transition-all duration-300">
      <h1 className="text-primary text-xl font-semibold tracking-tight">
        {postComments.length} Comments
      </h1>
      <div className="flex flex-col gap-2">
        {postComments.map((c) => {
          return <Comment key={c.id} comment={c} />;
        })}
      </div>
    </div>
  );
};
