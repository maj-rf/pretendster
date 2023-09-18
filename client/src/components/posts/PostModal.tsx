import { DialogContent } from '../ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { DeletePostTab } from './DeletePostTab';
import { PostModalProps } from '@/types/types';
import { EditPostTab } from './EditPostTab';

export const PostModal = (props: PostModalProps) => {
  return (
    <DialogContent>
      <Tabs defaultValue="edit-post" className="w-full p-2">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="edit-post">Edit</TabsTrigger>
          <TabsTrigger value="delete-post">Remove</TabsTrigger>
        </TabsList>
        <TabsContent value="edit-post">
          <EditPostTab {...props} />
        </TabsContent>
        <TabsContent value="delete-post">
          <DeletePostTab {...props} />
        </TabsContent>
      </Tabs>
    </DialogContent>
  );
};
