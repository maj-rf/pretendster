import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Search } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { searchUsers } from '@/services/userService';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { useState } from 'react';
import { Button } from '../ui/button';
import { SingleSuggestion } from '../home/SingleSuggestion';

const formSchema = z.object({
  query: z.string(),
});

export const Searchbar = () => {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: '',
    },
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: searchUsers,
    onSuccess: () => {
      form.reset();
      queryClient.invalidateQueries({ queryKey: ['profile', 'search'] });
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate(values.query);
  }

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <Form {...form}>
          <form autoComplete="off" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="query"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormControl>
                    <Input
                      placeholder="Search Pretendster"
                      {...field}
                      className="pl-7 h-8 w-full"
                      type="search"
                    />
                  </FormControl>
                  <PopoverTrigger asChild>
                    <Button
                      type="submit"
                      variant="ghost"
                      className="absolute left-1 top-0 p-0 h-fit"
                    >
                      <Search size={16} />
                    </Button>
                  </PopoverTrigger>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <PopoverContent
          className="w-[300px] p-2"
          align="start"
          alignOffset={-5}
        >
          {mutation.data?.length === 0 ? (
            <div>No users found.</div>
          ) : (
            <div>
              {mutation.data?.map((user) => (
                <SingleSuggestion user={user} key={user.id} />
              ))}
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
};
