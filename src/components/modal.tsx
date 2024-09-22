import React from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useForm } from 'react-hook-form';
import { Textarea } from './ui/textarea';
import Swal from 'sweetalert2';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal = ({ isOpen, onClose }: ModalProps) => {
  const form = useForm({
    defaultValues: {
      question: '',
    },
  });

  const onSubmit = (data: { question: string }) => {
    // Tampilkan alert
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Your question has been submitted',
      showConfirmButton: false,
      timer: 2000, // Sesuaikan waktu tampilan alert
    });

    // Setelah alert ditutup, lakukan reset dan tutup modal
    setTimeout(() => {
      form.reset(); // Reset form setelah alert ditampilkan
      onClose(); // Tutuplah modal setelah form di-reset
    }, 2000); // Sesuaikan waktu timeout agar sinkron dengan timer Swal
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ask your question?</DialogTitle>
          <DialogDescription>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 mt-4"
              >
                <FormField
                  control={form.control}
                  name="question"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary">Question</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Ask your question"
                          className="h-32"
                        />
                      </FormControl>
                      {/* <FormDescription>
                        This is your public display name.
                      </FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
