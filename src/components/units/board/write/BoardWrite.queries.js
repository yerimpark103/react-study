import {gql} from '@apollo/client';

export const CREATE_BOARD = gql`
  mutation createBoard($writer: String, $title: String, $contents: String) {
    # Variable types
    createBoard(writer: $writer, title: $title, contents: $contents) {
      # Actual variables
      _id
      number
      message
    }
  }
`;
