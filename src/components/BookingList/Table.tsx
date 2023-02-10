import {
  Booking,
  ColumnDefinition,
  TableHeaderProps,
  TableProps,
  TableRowsProps,
} from '@/types';
import { format } from 'date-fns';
import Link from 'next/link';

export default function Table<T, K extends keyof T>({
  data,
  columns,
}: TableProps<T, K>): JSX.Element {
  return (
    <div className="overflow-x-auto">
      <table className="border-collapse table-auto border-1 border-cyan-100 w-[1000px] lg:w-full">
        <TableHeader columns={columns} />
        <TableRows data={data} columns={columns} />
      </table>
    </div>
  );
}

function TableHeader<T, K extends keyof T>({
  columns,
}: TableHeaderProps<T, K>): JSX.Element {
  const headers = columns.map((column, index) => {
    return (
      <th
        key={`thCell-${index}`}
        className="dark:border-slate-600 text-neutral dark:text-neutral-200 text-left font-normal p-2 md:py-5 md:px-4 lg:text-md text-sm lg:text-base"
      >
        <span>{column.header}</span>
      </th>
    );
  });

  return (
    <thead>
      <tr className="bg-[#F7F7F7] dark:bg-neutral-700">{headers}</tr>
    </thead>
  );
}

const formatRowData = (obj: Booking) => {
  const { serviceDate, address } = obj;
  return {
    ...obj,
    address: address.split(',').slice(0, 2).join(','),
    serviceDate: format(
      new Date(serviceDate),
      'MMMM dd, yyyy hh:mm aaa'
    ).replace(/\s(?=\d{2}:\d{2}\s)/, '\n'),
  };
};

function TableRows<T, K extends keyof T>({
  data,
  columns,
}: TableRowsProps<T, K>): JSX.Element {
  const keyLookup = ['address', 'serviceDate'];
  const isDoubleLine = (key: K): boolean => keyLookup.includes(key as string);
  const isCTA = (key: K) => key === 'cta';

  const Row = ({ data }: { data: Booking }): JSX.Element => {
    const rowObj: Booking = formatRowData(data);

    return (
      <tr key={data.id}>
        {columns.map((col) => {
          const { key } = col;

          const [top, bottom] = isDoubleLine(key)
            ? rowObj[key as string].split('\n')
            : ['', ''];
          return (
            <td
              key={`cell-${key as string}`}
              className={`border-b border-slate-100 dark:border-slate-700 text-neutral-800 dark:text-slate-400 lg:text-md text-sm text-left md:py-3 pl-2 md:pl-4 last-of-type:pr-4 lg:text-base`}
            >
              {isDoubleLine(key) ? (
                <>
                  <p>{top}</p>
                  <p className="text-gray-400">{bottom}</p>
                </>
              ) : (
                rowObj[col.key as string]
              )}
              {isCTA(key) && (
                <>
                  <Link
                    href={{ pathname: `/booking/${rowObj.id}`, query: rowObj }}
                    passHref
                  >
                    <button className="bg-teal-500 text-white py-1 px-2 md:px-4 md:py-2 max-w-fit rounded-md self-end hover:bg-teal-600 active:scale-95">
                      View
                    </button>
                  </Link>
                </>
              )}
            </td>
          );
        })}
      </tr>
    );
  };

  return (
    <tbody className="bg-white dark:bg-neutral-800">
      {(data as Booking[]).map((row) => (
        <Row key={row.id} data={row} />
      ))}
    </tbody>
  );
}
