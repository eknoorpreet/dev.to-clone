import { useState, useCallback } from 'react';

//"signupForm" => "formObj" (name, email, password) => "form"
const useForm = (formObj) => {
  const [form, setForm] = useState(formObj);

  const renderFormInputs = () => {
    //renders an [] of <Input> for all input fields
    return Object.values(form).map((inputObj) => {
      const { value, label, errorMessage, valid, renderInput } = inputObj;
      return renderInput(
        onInputChange,
        value,
        valid,
        errorMessage,
        label,
        onCustomInputChange
      );
    });
  };

  const renderFormValues = () => {
    let values = {};
    Object.keys(form).forEach((inputObj) => {
      values[inputObj] = form[inputObj].value;
    });
    return values;
  };

  const isInputFieldValid = useCallback(
    (inputField) => {
      for (const rule of inputField.validationRules) {
        if (!rule.validate(inputField.value, form)) {
          inputField.errorMessage = rule.message;
          return false;
        }
      }
      return true;
    },
    [form]
  );

  const onInputChange = useCallback(
    (event) => {
      const { name, value } = event.target;
      let inputObj = { ...form[name], value };
      const isValidInput = isInputFieldValid(inputObj);
      if (isValidInput && !inputObj.valid) {
        inputObj = { ...inputObj, valid: true };
      } else if (!inputObj.touched && !isValidInput && inputObj.valid) {
        inputObj = { ...inputObj, valid: false };
      }
      inputObj = { ...inputObj, touched: true };
      setForm({ ...form, [name]: inputObj });
    },
    [form, isInputFieldValid]
  );

  const onCustomInputChange = useCallback(
    (type, value, InputIsValid) => {
      setForm({
        ...form,
        [type]: { ...form[type], value, valid: InputIsValid },
      });
    },
    [form]
  );

  const isFormValid = useCallback(
    (customForm) => {
      let isValid = true;
      const arr = Object.values(customForm || form);
      for (let i = 0; i < arr.length; i++) {
        if (!arr[i].valid) {
          isValid = false;
          break;
        }
      }
      return isValid;
    },
    [form]
  );

  return {
    renderFormInputs,
    renderFormValues,
    isFormValid,
    setForm,
  };
};

export default useForm;
