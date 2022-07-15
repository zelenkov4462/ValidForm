Реализация создания валидации для формы.

1 вариант - закоментирован - без использования кастомных хуков

2 вариант - создание кастомных хуков useInput и useValidation - для дальнейшей диструктуризации нужных свойст для отдельного инпута. 

Так же создан объект validations - для передачи нужных свойств для инпута - перебор объект и конструкция switch/case

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
 
