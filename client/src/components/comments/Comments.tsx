import { Comment } from './Comment';
import { useQuery } from '@tanstack/react-query';
import { getCommentsFromPost } from '@/services/commentService';
import { Loading } from '../Loading';

type CommentsProps = {
  postId: string;
};

export const Comments = (props: CommentsProps) => {
  const { data, isLoading } = useQuery({
    queryFn: () => getCommentsFromPost(props.postId),
    queryKey: ['comments', { id: props.postId }],
  });

  if (isLoading)
    return (
      <div className="grid place-items-center">
        <Loading />
      </div>
    );
  if (!data) return <div>Invalid</div>;

  return (
    <div>
      <h1 className="text-xl font-semibold tracking-tight mb-2">
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
