import { useQuery } from '@tanstack/react-query';
import { Comments } from '../comments/Comments';
import { Post } from '../posts/Post';
import { getAllPosts } from '@/services/postService';

/**
 * TODO: Fetch Timeline posts and replace current posts
 */

const posts = [
  {
    id: 11,
    title: 'It was not quite yet time to panic.',
    reactions: 5,
    userId: 25,
  },
  {
    id: 12,
    title: 'She was aware that things could go wrong.',
    reactions: 7,
    userId: 26,
  },
  {
    id: 13,
    title: 'She wanted rainbow hair.',
    reactions: 0,
    userId: 44,
  },
  {
    id: 14,
    title: 'The paper was blank.',
    reactions: 0,
    userId: 1,
  },
  {
    id: 15,
    title: 'The trees, therefore, must be such old',
    reactions: 1,
    userId: 15,
  },
  {
    id: 16,
    title: 'There was only one way to do things in the Statton house.',
    reactions: 5,
    userId: 31,
  },
  {
    id: 17,
    title: 'She was in a hurry.',
    reactions: 0,
    userId: 5,
  },
  {
    id: 18,
    title: 'She had a terrible habit o comparing her life to others',
    reactions: 3,
    userId: 28,
  },
  {
    id: 19,
    title: 'The rain and wind abruptly stopped.',
    reactions: 8,
    userId: 46,
  },
  {
    id: 20,
    title: 'He could not remember exactly where he had read it',
    reactions: 9,
    userId: 38,
  },
];

export const TimeLinePosts = () => {
  const query = useQuery({
    queryKey: ['posts'],
    queryFn: getAllPosts,
  });

  if (query.isLoading) return <div>Loading...</div>;
  if (!query.data) return <div>Invalid</div>;

  return (
    <div className="w-full mt-4 space-y-4">
      {query.data.map((post) => {
        return (
          <Post key={post.id} post={post}>
            <Comments postId={post.id} />
          </Post>
        );
      })}
    </div>
  );
};
