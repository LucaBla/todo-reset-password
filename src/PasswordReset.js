import React, { useState } from 'react';

function PasswordReset() {
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handlePasswordConfirmationChange = (event) => {
    setPasswordConfirmation(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if(password != passwordConfirmation){
      setErrorMessage("Passwords do not match");
      return
    }
    const resetToken = new URLSearchParams(window.location.search).get(
      "reset_password_token"
    );
    // const resetData ={
    //   user:{
    //     reset_password_token: resetToken,
    //     password: password,
    //     passwordConfirmation: passwordConfirmation,
    //   }
    // }

    const formData = new FormData();
    formData.append("todo_user[reset_password_token]", resetToken);
    formData.append("todo_user[password]", password);
    formData.append("todo_user[password_confirmation]", passwordConfirmation);

    for (var pair of formData.entries()) {
      console.log(pair[0]+ ', ' + pair[1]); 
  }

    fetch(`http://192.168.178.152:3000/todo_users/password?reset_password_token=${resetToken}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          console.log("Password reset successful");
          // TODO: redirect to login page
        } else {
          response.json().then((data) => {
            console.log(data.errors);
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="password">New password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <div>
        <label htmlFor="password_confirmation">Confirm new password:</label>
        <input
          type="password"
          id="password_confirmation"
          value={passwordConfirmation}
          onChange={handlePasswordConfirmationChange}
        />
      </div>
      <div>
        <button type="submit">Reset password</button>
      </div>
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
}

export default PasswordReset;


// const postLogIn = async () =>{
//   const logInData = {
//     todo_user:{
//       email: email,
//       password: password,
//     }
//   }

//   try{
//     const response = await fetch("http://192.168.178.152:3000/todo_users/sign_in", {
//       method: "post",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(logInData),
//     })

//     if (!response.ok) {
//       const message = `An error has occured: ${response.status} - ${response.statusText}`;
//       throw new Error(message);
//     }

//     const data = await response;
//     const authToken = data.headers.get('Authorization');

//     console.log(authToken);

//     setAuthToken(authToken);
//   } catch(error){
//     console.error(error);
//   }
// }