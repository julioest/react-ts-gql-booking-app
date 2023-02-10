import { ColumnDefinition, Booking, BookingListProps } from '@/types';
import BookingHeader from './BookingHeader';
import Table from './Table';

export default function BookingList({ bookings }: BookingListProps) {
  return (
    <div className="flex flex-col min-h-screen bg-[#EEF1F1] dark:bg-neutral-900">
      <BookingHeader />
      <Table data={bookings} columns={columns} />
    </div>
  );
}

const columns: ColumnDefinition<Booking, keyof Booking>[] = [
  {
    key: 'name',
    header: 'Customer',
  },
  {
    key: 'email',
    header: 'Email',
  },
  {
    key: 'address',
    header: 'Address',
  },
  {
    key: 'type',
    header: 'Booking Type',
  },
  {
    key: 'serviceDate',
    header: 'Booking Date + Time',
  },
  {
    key: 'cta',
    header: '',
  },
];
