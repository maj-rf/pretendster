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
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { IUser } from '@/types/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProfilePic } from '@/services/userService';
import { MAX_FILE_SIZE, ACCEPTED_IMAGE_TYPES } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';
import { GeneralAvatar } from '../common/GeneralAvatar';
import { Loading } from '../Loading';
type ChangeProfilePicModalProps = {
  closeModal: () => void;
  user: IUser;
};

const formSchema = z.object({
  image: z
    .any()
    .refine(
      (file: File) => file?.size <= MAX_FILE_SIZE,
      'Max image size is 5MB.',
    )
    .refine(
      (file: File) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      'Only .jpg, .jpeg, .png, .gif, and .webp formats are supported.',
    ),
});

export const ChangeProfilePicModal = (props: ChangeProfilePicModalProps) => {
  const { user, closeModal } = props;
  const { dispatch } = useAuth();
  const [image, setImage] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateProfilePic,
    onSuccess: (payload) => {
      dispatch({ type: 'pic-update', payload });
      queryClient.invalidateQueries(['profile', { id: user.id }]);
      queryClient.invalidateQueries(['posts']);
      form.reset();
      closeModal();
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    if (values.image) formData.append('image', values.image);
    mutation.mutate({ userId: user.id, update: formData });
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-4 w-full"
          encType="multipart/form-data"
          id="profile-pic-form"
        >
          <div className="flex flex-col gap-4 items-center justify-end">
            {image ? (
              <GeneralAvatar
                profileImg={image}
                username="Uploaded Img"
                avatarClass="w-28 h-auto border-4 relative"
              />
            ) : (
              <div className="w-28 h-28 rounded-full border-4"></div>
            )}
            <FormField
              control={form.control}
              name="image"
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              render={({ field: { value, onChange, ...field } }) => (
                <FormItem>
                  <FormLabel className="sr-only">Upload</FormLabel>
                  <FormControl>
                    <Input
                      className="w-fit file:rounded-lg file:bg-primary file:text-primary-foreground"
                      type="file"
                      {...field}
                      value={value.fileName}
                      id="image"
                      onChange={(event) => {
                        if (event.target.files) {
                          onChange(event.target.files[0]);
                          setImage(URL.createObjectURL(event.target.files[0]));
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
      <DialogFooter className="gap-2">
        <Button variant="outline" onClick={closeModal}>
          Cancel
        </Button>
        <Button
          type="submit"
          form="profile-pic-form"
          disabled={mutation.isLoading}
        >
          {mutation.isLoading ? <Loading /> : 'Upload'}
        </Button>
      </DialogFooter>
    </>
  );
};
