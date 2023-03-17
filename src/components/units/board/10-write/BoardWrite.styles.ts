import {IBoardWriteStylesProps} from './BoardWrite.types';
import styled from '@emotion/styled';

export const MyInput = styled.input`
  margin-bottom: 1rem;
`;

export const MyButton = styled.button`
  background-color: ${(props: IBoardWriteStylesProps) =>
    props.zzz ? 'yellow' : 'gray'};
`;
