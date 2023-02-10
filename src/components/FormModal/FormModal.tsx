import React, { useRef, useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_BOOKING } from '@/graphql/queries';
import { useToasts } from '@/components/Toast/ToastContext';
import CheckmarkIcon from '@/public/icon-checkmark.svg';
import {
  BookingFormData,
  FormModalProps,
  FormElementProps,
  Status,
} from '@/types';

export default function FormModal({ isModalOpen, onClose }: FormModalProps) {
  const [createBooking, { error }] = useMutation(CREATE_BOOKING);
  const [formData, setFormData] = useState<BookingFormData>({});
  const formRef = useRef<HTMLFormElement>(null);
  const { add } = useToasts();

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    let target = e.currentTarget;
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { name, email, date, time, address, city, state, zipcode } = formData;

    createBooking({
      variables: {
        name,
        email,
        address: `${address}\n ${city}, ${state} ${zipcode}`,
        serviceDate: new Date(`${date}T${time}`).toISOString(),
        status: Status.PENDING,
      },
    });

    if (!error) {
      formRef.current?.reset();
      onClose();
      add(
        <div className="flex gap-3">
          <CheckmarkIcon className="h-6 w-6 text-green-60" />
          <p className="text-base">
            Successfully <span className="font-semibold">created</span> a
            booking for {name}
          </p>
        </div>
      );
    }
  };

  return (
    <div className="bg-black bg-opacity-30 absolute left-0 top-0 w-full h-screen z-10 flex justify-center items-center">
      <div className="bg-white p-10 w-full max-w-2xl lg:w-1/2 md:max-w-xl flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl">Create Booking</h1>
          <button
            onClick={onClose}
            className="rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 active:scale-95"
          >
            <span className="sr-only">Close</span>
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <form
          ref={formRef}
          onSubmit={handleOnSubmit}
          className="flex flex-col gap-6"
        >
          <div className="grid md:grid-cols-2 gap-4">
            {formFields.map(
              (
                { element, type, name, id, label, options }: FormElementProps,
                index
              ) => {
                return (
                  <FormElement
                    key={`${type}-${element}-${index}`}
                    element={element}
                    name={name}
                    id={id}
                    label={label}
                    placeholder={label}
                    type={type}
                    onChange={handleOnChange}
                    options={options}
                  />
                );
              }
            )}
          </div>
          <button className="bg-teal-500 font-bold text-white px-4 py-3  max-w-fit rounded-md self-end hover:bg-teal-700 active:scale-95">
            Create booking
          </button>
        </form>
        {error && (
          <p className="text-red-600 font-semibold">
            We apologize, but there was an error with your request.
          </p>
        )}
      </div>
    </div>
  );
}

const FormElement = ({
  type,
  name,
  id,
  label,
  placeholder,
  onChange,
  options,
}: FormElementProps) => {
  const classNames = `
    mt-1
    block
    w-full
    py-3
    rounded-md
    focus:border-green-800 focus:ring focus:ring-green-800 focus:ring-opacity-20
  `;
  if (type === 'select' && options) {
    return (
      <>
        <label htmlFor={id} className="sr-only">
          {label}
        </label>
        <select
          className={classNames}
          name={name}
          id={id}
          onChange={onChange}
          placeholder={placeholder}
          required
        >
          sdfdss
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </>
    );
  }

  return (
    <>
      <label className="sr-only" htmlFor={id}>
        {label}
      </label>
      <input
        className={classNames}
        type={type}
        name={name}
        id={id}
        onChange={onChange}
        placeholder={placeholder}
        required
      />
    </>
  );
};

const formFields: FormElementProps[] = [
  {
    element: 'input',
    label: 'Name',
    type: 'text',
    name: 'name',
    id: 'name-input',
  },
  {
    element: 'input',
    label: 'Email',
    type: 'email',
    name: 'email',
    id: 'email-input',
  },
  {
    element: 'input',
    label: 'Address',
    type: 'text',
    name: 'address',
    id: 'address-input',
  },
  {
    element: 'input',
    label: 'City',
    type: 'text',
    name: 'city',
    id: 'city-input',
  },
  {
    element: 'input',
    label: 'State',
    type: 'text',
    name: 'state',
    id: 'state-input',
  },
  {
    element: 'input',
    label: 'Zipcode',
    type: 'text',
    name: 'zipcode',
    id: 'zipcode-input',
  },
  {
    element: 'select',
    label: 'Booking Type',
    type: 'select',
    name: 'type',
    id: 'type-select',
    options: [
      { value: '', label: 'Booking Type' },
      { value: 'Housekeeping', label: 'Housekeeping' },
      { value: 'DogWalk', label: 'Dog Walk' },
    ],
  },
  {
    element: 'input',
    label: 'Booking Date',
    type: 'date',
    name: 'date',
    id: 'date-input',
  },
  {
    element: 'input',
    label: 'Booking Time',
    type: 'time',
    name: 'time',
    id: 'time-input',
  },
];
