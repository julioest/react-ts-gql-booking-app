import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import FormModal from '../FormModal/FormModal';

export default function BookingHeader() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleClick = () => {
    setIsOpenModal((prev) => !prev);
  };

  const handleOnClose = () => {
    setIsOpenModal(false);
  };

  return (
    <div className="flex flex-col gap-4 items-start md:flex-row md:justify-between py-10">
      <h1 className="text-4xl dark:text-slate-500">Bookings</h1>
      <button
        className="bg-teal-500 text-white px-4 py-2 max-w-fit rounded-md md:self-end hover:bg-teal-600 active:scale-95"
        onClick={handleClick}
      >
        Create Booking
      </button>
      {isOpenModal &&
        createPortal(<FormModal onClose={handleOnClose} />, document.body)}
    </div>
  );
}
