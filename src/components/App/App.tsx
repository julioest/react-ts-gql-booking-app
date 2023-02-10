import { useQuery } from '@apollo/client';
import BookingList from '@/components/BookingList/BookingList';
import { GET_BOOKINGS } from '@/graphql/queries';
import useTimeout from '../Toast/use-timeout.hooks';
import { useState } from 'react';

export default function App() {
  const { loading, error, data } = useQuery(GET_BOOKINGS);

  return (
    <div className="flex flex-col justify-between min-h-screen bg-[#EEF1F1] dark:bg-neutral-900 px-6 pb-24 lg:pb-0">
      <div className="container mx-auto">
        {loading && (
          <div className="flex items-center justify-center min-h-screen">
            <span className="loader" aria-label="Loading bookings"></span>
          </div>
        )}
        {error && (
          <p className="block text-red-600">
            There was an error fetching the data, please try again later.
          </p>
        )}
        {data && <BookingList bookings={data.bookings.bookings} />}
      </div>
    </div>
  );
}
