import React, { useEffect, useState } from 'react'

const LoginCompleted = () => {

  const [timer, setTimer] = useState(5);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
      console.log(timer);
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, [timer]);

  if (timer === 0) {
    window.location.assign("http://localhost:5173/");
  }

  
  return (
    <div>LoginCompleted</div>
  )
}

export default LoginCompleted