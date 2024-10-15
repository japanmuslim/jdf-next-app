import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  size?: 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
  className?: string;
}

const Modal = ({
  isOpen,
  onClose,
  children,
  title,
  size = 'md',
  className,
}: ModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={cn(
          size === 'sm'
            ? 'md:max-w-sm max-w-[22rem] !rounded-xl'
            : size === 'lg'
              ? 'md:max-w-3xl max-w-[22rem] !rounded-xl'
              : 'md:max-w-2xl max-w-[22rem] !rounded-xl',
          className,
        )}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{children}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
