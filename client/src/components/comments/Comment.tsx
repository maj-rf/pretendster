import { IComment } from '@/types/types';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
export const Comment = ({ comment }: { comment: IComment }) => {
  return (
    <article className="flex flex-col border-l border-l-emerald-300 p-1">
      <div className="flex items-center gap-2">
        <Avatar className="self-start">
          <AvatarImage
            src={comment.user.profileImg}
            alt={`${comment.user.username}'s avatar`}
            className="w-10 h-10 rounded-full object-cover object-top"
          />
          <AvatarFallback>{comment.user.username}</AvatarFallback>
        </Avatar>

        <div>
          <h2 className="text-muted-foreground">{comment.user.username}</h2>
          <p className="text-primary">{comment.content}</p>
        </div>
      </div>
    </article>
  );
};
