import {Button} from 'antd';
import axios from 'axios';

export default function RestGetPage() {
  function onClickAsync() {
    const result = axios.get('https://koreanjson.com/posts/1');
    console.log(result);
    // Promise {<pending>}
  }

  async function onClickSync() {
    const result = await axios.get('https://koreanjson.com/posts/1');
    console.log(result);
    // {data: {…}, status: 200, statusText: 'OK', headers: AxiosHeaders, config: {…}, …}
  }

  return (
    <>
      <Button onClick={onClickAsync}>REST-API 비동기 요청하기</Button>
      <Button onClick={onClickSync}>REST-API 동기 요청하기</Button>
    </>
  );
}
