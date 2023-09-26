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
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPost } from '@/services/postService';
import { Textarea } from '../ui/textarea';
import { DialogFooter } from '../ui/dialog';
// import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from '@/lib/utils';

/** *
 * TODO - image validation on formSchema not working
 */

const formSchema = z.object({
  content: z.string().min(3, { message: 'Must be at least 3 characters.' }),
  image: z.any().optional(),
  // .refine(
  //   (file: File) => file?.size <= MAX_FILE_SIZE,
  //   'Max image size is 5MB.',
  // ),
  // .refine(
  //   (file: File) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
  //   'Only .jpg, .jpeg, .png and .webp formats are supported.',
  // ),
});

// const urlToFile = (url: string, filename: string, mimeType: string) => {
//   return fetch(url)
//     .then(function (res) {
//       return res.arrayBuffer();
//     })
//     .then(function (buf) {
//       return new File([buf], filename, { type: mimeType });
//     });
// };

type CreatePostProps = {
  closeModal: () => void;
};

export const PostForm = (props: CreatePostProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: '',
      image: '',
    },
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      form.reset();
      props.closeModal();
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const formData = new FormData();
    formData.append('content', values.content);
    if (values.image) formData.append('image', values.image);
    mutation.mutate(formData);
  }
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-4 w-full"
          encType="multipart/form-data"
          id="create-post-form"
        >
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Create A Post</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="What's on your mind?"
                    {...field}
                    className="pr-14 resize-none"
                    rows={6}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field: { value, onChange, ...field } }) => (
              <FormItem>
                <FormLabel className="sr-only">Upload</FormLabel>
                <FormControl>
                  <Input
                    className="file:rounded-lg file:bg-primary file:text-primary-foreground"
                    type="file"
                    {...field}
                    value={value.fileName}
                    id="image"
                    onChange={(event) => {
                      if (event.target.files)
                        return onChange(event.target.files[0]);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <DialogFooter className="gap-2">
        <Button variant="outline" onClick={props.closeModal}>
          Cancel
        </Button>
        <Button
          disabled={mutation.isLoading}
          type="submit"
          form="create-post-form"
        >
          {mutation.isLoading ? 'Submitting...' : 'Submit'}
        </Button>
      </DialogFooter>
    </>
  );
};
