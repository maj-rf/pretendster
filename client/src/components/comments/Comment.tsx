type CommentProps = {
  id: number;
  body: string;
  postId: number;
  user: {
    id: number;
    username: string;
  };
};

export const Comment = ({ comment }: { comment: CommentProps }) => {
  return (
    <div>
      <div>
        <h2 className="text-primary">{comment.user.username}</h2>
        <p>{comment.body}</p>
      </div>
    </div>
  );
};
