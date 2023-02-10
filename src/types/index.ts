import React from "react";

export type LayoutProps = {
  children: React.ReactNode;
}

export enum Status {
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled',
  PENDING = 'Pending',
  INPROGRESS = 'InProgress'
}

export enum Type {
  HOUSEKEEPING = 'Housekeeping',
  DOGWALK = 'DogWalk'
}

export type Booking = {
  [key: string]: string;
  id: string;
  email: string;
  type: Type;
  status: Status;
  name: string;
  address: string;
  serviceDate: string;
}

export type BookingListProps = {
  bookings: Booking[];
};


export type ColumnDefinition<T, K extends keyof T> = {
  key: K;
  header?: string;
  width?: number;
};

export type TableProps<T, K extends keyof T> = {
  data: T[];
  columns: ColumnDefinition<T, K>[];
};

export type TableHeaderProps<T, K extends keyof T> = {
  columns: ColumnDefinition<T, K>[];
};

export type TableRowsProps<T, K extends keyof T> = {
  data: T[];
  columns: ColumnDefinition<T, K>[];
};

export type FormModalProps = {
  isModalOpen?: boolean;
  onClose: () => void;
};

export type BookingFormData = {
  [key: string]: string;
};

export type FormElementProps = {
  element: 'input' | 'select';
  type?: string;
  name: string;
  id: string;
  label: string;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void;
  options?: { value: string; label: string }[];
};

export type ToastProviderProps = {
  children: React.ReactNode;
};

export type ToastContextProps = {
  add: (arg?: any) => void;
  remove: (arg?: any) => void;
};

type OnDismissCallback = (arg?: any) => void;

export type ToastProps<T> = {
  content?: T;
  id?: number;
  children?: React.ReactNode;
  onDismiss?: OnDismissCallback;
};
