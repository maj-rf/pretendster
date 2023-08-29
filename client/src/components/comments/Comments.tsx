import { Comment } from './Comment';
import { useQuery } from '@tanstack/react-query';
import { getCommentsFromPost } from '@/services/commentService';

type CommentsProps = {
  postId: string;
};

export const Comments = (props: CommentsProps) => {
  const { data, isLoading } = useQuery({
    queryFn: () => getCommentsFromPost(props.postId),
    queryKey: ['comments', props.postId],
  });

  if (isLoading)
    return (
      <div className="p-6 bg-secondary text-muted-foreground transition-all duration-300">
        loading...
      </div>
    );
  if (!data) return <div>Invalid</div>;

  return (
    <div>
      <h1 className="text-primary text-xl font-semibold tracking-tight mb-2">
        {data.length === 1 ? '1 Comment' : `${data.length} Comments`}
      </h1>
      <div className="flex flex-col gap-2">
        {data.map((c) => {
          return <Comment key={c.id} comment={c} />;
        })}
      </div>
    </div>
  );
};
