import { gql } from '@apollo/client';

export const GET_BOOKINGS = gql`
  query GetBookings {
    bookings(order: ASC) {
      bookings {
        address
        email
        id
        name
        serviceDate
        status
        type
      }
      total
    }
  }
`;

export const CREATE_BOOKING = gql`
  mutation CreateBooking (
  $address: String!
  $email: String!
  $name: String!
  $serviceDate: String!
  $type: BookingType = Housekeeping
) {
  createBooking(
    input: {
      type: $type
      email: $email
      name: $name
      address: $address
      serviceDate: $serviceDate
    }
  ) {
    address
    email
    name
    serviceDate
    type
  }
}
`;

export const CANCEL_BOOKING = gql`
mutation CancelBooking($bookingId: String!) {
  cancelBooking(bookingId: $bookingId) {
    address
    email
    id
    name
    serviceDate
    status
    type
  }
}
`;

