import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useToasts } from '@/components/Toast/ToastContext';
import { CANCEL_BOOKING } from '@/graphql/queries';
import { useMutation } from '@apollo/client';
import CheckmarkIcon from '@/public/icon-checkmark.svg';
import { Booking } from '@/types';

export default function BookingDetail({ query }: { query: Booking }) {
  const router = useRouter();
  const [cancelBooking] = useMutation(CANCEL_BOOKING);
  const { add } = useToasts();
  const [confirmCancelDialog, setConfirmCancelDialog] =
    useState<boolean>(false);
  const [confirmed, setConfirmed] = useState<boolean>(false);

  const { name, email, address, type, serviceDate, id, status } = query;

  const [addressLine1, addressLine2] = (address as string).split('\n');
  const isCancelled = status.toLowerCase() === 'cancelled';

  const handleCancelBooking = () => {
    setConfirmCancelDialog(true);
  };

  const handleConfirmation = () => {
    setConfirmed(true);
    cancelBooking({
      variables: {
        bookingId: id,
      },
    });

    add(
      <div className="flex gap-3">
        <CheckmarkIcon className="h-6 w-6 text-green-60" />
        <p className="text-base">
          Successfully <span className="font-semibold">cancelled</span> booking
          for {name}{' '}
        </p>
      </div>
    );
    router.push('/');
  };

  const confirmCancellation = (
    <>
      {confirmCancelDialog ? (
        <div className="flex gap-4">
          {confirmed ? (
            <p className="text-red-500">Confirmed</p>
          ) : (
            <>
              <button
                onClick={handleConfirmation}
                className="bg-teal-500 text-white px-3 py-2 md:px-5 md:py-2 max-w-fit rounded-md md:self-end hover:bg-teal-700 active:scale-95"
              >
                Confirm
              </button>
              <button
                onClick={() => setConfirmCancelDialog(false)}
                className="dark:text-slate-500 bg-slate-50 dark:bg-transparent px-3 py-2 md:px-5 md:py-2 max-w-fit rounded-md md:self-end hover:bg-slate-200 active:scale-95"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      ) : (
        <>
          <button
            onClick={handleCancelBooking}
            disabled={isCancelled}
            className={`bg-red-700 text-white px-3 py-2 md:px-5 md:py-2 max-w-fit rounded-md md:self-end hover:bg-red-700 active:scale-95 ${
              isCancelled
                ? 'bg-neutral-700 pointer-events-none cursor-not-allowed focus:outline-none disabled:opacity-50'
                : ''
            }`}
          >
            {isCancelled ? 'Booking already cancelled' : 'Cancel Booking'}
          </button>
        </>
      )}
    </>
  );
  return (
    <div className="flex flex-col justify-between min-h-screen bg-[#EEF1F1] dark:bg-neutral-900 px-6">
      <div className="container mx-auto flex flex-col gap-14 py-10">
        <div className="flex justify-between flex-col md:flex-row gap-4">
          <h1 className="text-4xl dark:text-slate-500">Booking Details</h1>
          {confirmCancellation}
        </div>
        <div className="flex flex-col md:flex-row justify-between bg-neutral-50 dark:bg-neutral-800 dark:text-slate-400 p-6 gap-12 md:gap-6">
          <div className="w-full md:w-1/2 flex flex-col gap-6">
            <p className="font-semibold border-b border-slate-300 pb-3">
              Customer Details
            </p>
            <div>
              <p>{name}</p>
              <p>{email}</p>
            </div>
            <div>
              <p>{addressLine1}</p>
              <p>{addressLine2}</p>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex flex-col gap-6">
            <p className="font-semibold mb-3 border-b border-slate-300 pb-3">
              Details
            </p>
            <p>{status}</p>
            <p>{type}</p>
            <p>{serviceDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { query } = context;
  return { props: { query } };
};
