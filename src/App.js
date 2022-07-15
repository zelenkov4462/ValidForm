// import React, { useEffect, useState } from "react";
//
// const App = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [emailDirty, setEmailDirty] = useState(false);
//   const [passwordDirty, setPasswordDirty] = useState(false);
//   const [emailError, setEmailError] = useState("Email is not be empty");
//   const [passwordError, setPasswordError] = useState(
//     "Password is not be empty"
//   );
//   const [formValid, setFormValid] = useState(false);
//
//   useEffect(() => {
//     if (emailError || passwordError) {
//       setFormValid(false);
//     } else {
//       setFormValid(true);
//     }
//   }, [emailError, passwordError]);
//
//   const emailHandler = (e) => {
//     setEmail(e.target.value);
//     const re =
//       /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
//     if (!re.test(String(e.target.value).toLowerCase())) {
//       setEmailError("Некоректный емэйл");
//     } else {
//       setEmailError("");
//     }
//   };
//
//   const passwordHandler = (e) => {
//     setPassword(e.target.value);
//     if (e.target.value.length < 3 || e.target.value.length > 8) {
//       setPasswordError("Пароль должен быть длиннее чем 3 и короче 8");
//       if (!e.target.value) {
//         setPasswordError("Password is not be empty");
//       }
//     } else {
//       setPasswordError("");
//     }
//   };
//
//   const blurHandler = (e) => {
//     switch (e.target.name) {
//       case "email":
//         setEmailDirty(true);
//         break;
//       case "password":
//         setPasswordDirty(true);
//         break;
//     }
//   };
//
//   return (
//     <div className="app">
//       <form action="">
//         <h1>Регистрация</h1>
//         {emailDirty && emailError && (
//           <div style={{ color: "red" }}>{emailError}</div>
//         )}
//         <input
//           onChange={(e) => emailHandler(e)}
//           value={email}
//           onBlur={(e) => blurHandler(e)}
//           name="email"
//           type="text"
//           placeholder="Enter your email..."
//         />
//         {passwordDirty && passwordError && (
//           <div style={{ color: "red" }}>{passwordError}</div>
//         )}
//         <input
//           onChange={(e) => passwordHandler(e)}
//           value={password}
//           onBlur={(e) => blurHandler(e)}
//           name="password"
//           type="password"
//           placeholder="Enter your password..."
//         />
//         <button disabled={!formValid} type="submit">
//           Registration
//         </button>
//       </form>
//     </div>
//   );
// };
//
// export default App;

import React, { useEffect, useState } from "react";

const useValidation = (value, validations) => {
  const [isEmpty, setEmpty] = useState(true);
  const [minLengthError, setMinLengthError] = useState(false);
  const [maxLengthError, setMaxLengthError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [inputValid, setInputValid] = useState(false);

  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case "minLength":
          value.length < validations[validation]
            ? setMinLengthError(true)
            : setMinLengthError(false);
          break;
        case "isEmpty":
          value ? setEmpty(false) : setEmpty(true);
          break;
        case "isEmail":
          const re =
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
          re.test(String(value).toLowerCase())
            ? setEmailError(false)
            : setEmailError(true);
          break;
        case "maxLength":
          value.length > validations[validation]
            ? setMaxLengthError(true)
            : setMaxLengthError(false);
          break;
      }
    }
  }, [value]);

  useEffect(() => {
    if (isEmpty || emailError || maxLengthError || minLengthError) {
      setInputValid(false);
    } else {
      setInputValid(true);
    }
  }, [isEmpty, emailError, maxLengthError, minLengthError]);

  return {
    isEmpty,
    minLengthError,
    maxLengthError,
    emailError,
    inputValid,
  };
};

const useInput = (initialValue, validations) => {
  const [value, setValue] = useState(initialValue);
  const [isDirty, setIsDirty] = useState(false);
  const valid = useValidation(value, validations);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onBlur = (e) => {
    setIsDirty(true);
  };

  return {
    value,
    onChange,
    onBlur,
    isDirty,
    ...valid,
  };
};

const App = () => {
  const email = useInput("", { isEmpty: true, minLength: 3, isEmail: true });
  const password = useInput("", { isEmpty: true, minLength: 5, maxLength: 7 });

  return (
    <div>
      <form>
        <h1>Регистрация</h1>
        {email.isDirty && email.isEmpty && (
          <div style={{ color: "red" }}>Поле не может быть пыстым</div>
        )}
        {email.isDirty && email.minLengthError && (
          <div style={{ color: "red" }}>Неккоректная длина</div>
        )}
        {email.isDirty && email.emailError && (
          <div style={{ color: "red" }}>Введите корректный емейл</div>
        )}
        <input
          onChange={(e) => email.onChange(e)}
          onBlur={(e) => email.onBlur(e)}
          value={email.value}
          name="email"
          placeholder="введите емейл"
          type="text"
        />
        {password.isDirty && password.isEmpty && (
          <div style={{ color: "red" }}>Поле не может быть пыстым</div>
        )}
        {password.isDirty && password.minLengthError && (
          <div style={{ color: "red" }}>Неккоректная длина</div>
        )}
        {password.isDirty && password.maxLengthError && (
          <div style={{ color: "red" }}>Слишком много символов</div>
        )}
        <input
          onChange={(e) => password.onChange(e)}
          onBlur={(e) => password.onBlur(e)}
          value={password.value}
          name="password"
          placeholder="введите емейл"
          type="password"
        />
        <button
          disabled={!email.inputValid || !password.inputValid}
          type="submit"
        >
          reg
        </button>
      </form>
    </div>
  );
};

export default App;
