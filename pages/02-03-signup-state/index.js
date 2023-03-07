import {useState} from 'react';

export default function SignupStatePage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');

  function onChangeEmail(event) {
    setEmail(event.target.value);
  }

  function onChangePassword(event) {
    setPassword(event.target.value);
  }

  function onClickSignup() {
    console.log(email);
    console.log(password);

    if (!email.includes('@'))
      // document.getElementById('error').innerText = 'Check your email format';
      setEmailError('Check your email format');
    else alert('Sign up successful');
  }

  return (
    <>
      <div>
        Email: <input type="text" onChange={onChangeEmail} />
        {/* <div id="error"></div> */}
        <div>{emailError}</div>
      </div>
      <div>
        Password: <input type="password" onChange={onChangePassword} />
      </div>
      <button onClick={onClickSignup}>Sign up</button>
    </>
  );
}
