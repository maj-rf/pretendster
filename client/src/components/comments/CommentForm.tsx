import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
} from '../ui/form';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { Send } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCommentToPost } from '@/services/commentService';

const formSchema = z.object({
  content: z.string().min(3, { message: 'Must be at least 3 characters.' }),
});

export const CommentForm = ({ postId }: { postId: string }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: '',
    },
  });

  const queryClient = useQueryClient();
  const commentMutation = useMutation({
    mutationFn: createCommentToPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', { id: postId }] });
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    commentMutation.mutate({ postId: postId, content: values.content });
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="relative">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Send a Comment</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write a comment..."
                  {...field}
                  className="pr-14 resize-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="absolute top-0 right-0">
          <Button
            className="w-fit"
            disabled={commentMutation.isLoading}
            type="submit"
            variant="ghost"
          >
            <Send />
          </Button>
        </div>
      </form>
    </Form>
  );
};
