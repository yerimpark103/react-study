import {Email, EmailInput} from '../../styles/emotion.js';

export default function EmotionPage() {
  return (
    <div>
      <Email>이메일</Email>
      <EmailInput type="text" />
      <button>Please click!</button>
      <img src="/vercel.svg" alt="" />
    </div>
  );
}
