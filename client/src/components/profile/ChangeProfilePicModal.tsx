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
import {
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogContent,
  DialogFooter,
} from '@/components/ui/dialog';

const formSchema = z.object({
  image: z.any().optional(),
});

export const ChangeProfilePicModal = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Update User Details</DialogTitle>
        <DialogDescription>
          Change your bio to spice up profile!
        </DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-4 w-full"
          encType="multipart/form-data"
        >
          <div className="flex gap-4 items-center justify-end">
            <FormField
              control={form.control}
              name="image"
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
                        if (event.target.files)
                          return onChange(event.target.files[0]);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              className="w-fit"
              // disabled={mutation.isLoading}
              type="submit"
            >
              Upload
            </Button>
          </div>
        </form>
      </Form>
      <DialogFooter className="gap-2">
        <Button variant="outline">Cancel</Button>
        <Button type="submit" form="about-form">
          Save Changes
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};
