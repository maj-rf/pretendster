/* eslint-disable quotes */
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
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { IUser } from '@/types/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateAboutProfile } from '@/services/userService';

const formSchema = z.object({
  location: z.string(),
  status: z.string(),
  bio: z.string(),
  username: z.string(),
});

type EditFormModalProps = {
  closeModal: () => void;
  user: IUser;
};

export const EditFormModal = (props: EditFormModalProps) => {
  const { user, closeModal } = props;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: user.username,
      location: user.location ?? 'Nowhere',
      status: user.status ?? "It's complicated",
      bio: user.bio ?? 'Be cheerful. Strive to be happy. -Desiderata',
    },
  });
  const queryClient = useQueryClient();
  const aboutMutation = useMutation({
    mutationFn: updateAboutProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', user.id] });
      closeModal();
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const id = user.id;
    aboutMutation.mutate({ update: values, id });
    console.log(values);
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-4 px-8 py-4 w-full"
          id="about-form"
        >
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="Honolulu, Hawaii" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Relationship Status</FormLabel>
                <FormControl>
                  <Input placeholder="Single" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Input placeholder="Say something..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <DialogFooter className="gap-2">
        <Button variant="outline" onClick={closeModal}>
          Cancel
        </Button>
        <Button type="submit" form="about-form">
          Save Changes
        </Button>
      </DialogFooter>
    </>
  );
};
