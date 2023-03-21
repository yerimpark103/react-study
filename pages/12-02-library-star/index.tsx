import styled from "@emotion/styled";
import {Rate} from "antd";
import {useState} from "react";

const MyStar = styled(Rate)``;

const LibraryIconPage = () => {
  const [value, setValue] = useState(3);
  const qqq = (value: number) => {
    setValue(value);
  };

  return (
    <>
      <MyStar onChange={qqq} />
      <h2>{value}</h2>
    </>
  );
};

export default LibraryIconPage;
