import { PostModalProps } from '@/types/types';
import { DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { updatePost } from '@/services/postService';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Loading } from '../Loading';

const formSchema = z.object({
  content: z.string().min(3, { message: 'Must be at least 3 characters.' }),
});

export const EditPostModal = (props: PostModalProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: props.post.content,
    },
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      form.reset();
      props.closeModal();
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate({ postId: props.post.id, content: values.content });
  }
  return (
    <div className="flex flex-col gap-2">
      <DialogHeader>
        <DialogTitle>Update your Post</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-2"
        >
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Edit your Post</FormLabel>
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
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={props.closeModal}>
              Cancel
            </Button>
            <Button disabled={mutation.isLoading ? true : false}>
              {mutation.isLoading ? <Loading /> : 'Update'}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </div>
  );
};
