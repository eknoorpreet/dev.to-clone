import React from 'react';
import TagsInput from '../components/FormElements/TagsInput/TagsInput';
import { BodyInput } from '../components/FormElements/BodyInput/BodyInput';
import ImageUpload from '../components/FormElements/ImageUpload/ImageUpload';
import Input from '../components/FormElements/Input/Input';
import {
  maxLengthRule,
  minLengthRule,
  requiredRule,
} from './inputValidationRules';

const createFormFieldConfig = (
  label,
  name,
  type,
  elementType = 'input',
  defaultValue = ''
) => {
  //return an obj representing a single input
  return {
    //render a given input
    renderInput: (
      handleChange,
      value,
      isValid,
      error,
      key,
      onCustomInputChange
    ) => {
      if (label === 'Image' || label === 'Avatar') {
        return (
          <ImageUpload
            label={label}
            key={label}
            center
            onInput={onCustomInputChange}
            file={value}
          />
        );
      }
      if (label === 'Body') {
        return (
          <BodyInput key='Body' value={value} onChange={onCustomInputChange} />
        );
      }
      if (label === 'Tags') {
        return (
          <TagsInput
            key='Tags'
            label={label}
            tags={value}
            onChange={onCustomInputChange}
          />
        );
      }

      return (
        <>
          <Input
            key={label}
            name={name}
            type={type}
            label={label}
            elementType={elementType}
            isValid={isValid}
            value={value}
            handleChange={handleChange}
            // handleBlur={handleBlur}
            errorMessage={error}
          />
        </>
      );
    },
    label,
    value: defaultValue,
    valid: false,
    errorMessage: '',
    touched: false,
  };
};

//object representation of signup form
//the hook will use this obj to render the form
//"createFormFieldConfig" takes in label, name, type
export const signupForm = {
  name: {
    ...createFormFieldConfig('Full Name', 'name', 'text'),
    validationRules: [
      requiredRule('name'),
      minLengthRule('name', 3),
      maxLengthRule('name', 25),
    ],
    key: '1',
  },
  email: {
    ...createFormFieldConfig('Email', 'email', 'email'),
    validationRules: [
      requiredRule('email'),
      minLengthRule('email', 10),
      maxLengthRule('email', 25),
    ],
    key: '2',
  },
  password: {
    ...createFormFieldConfig('Password', 'password', 'password'),
    validationRules: [
      requiredRule('password'),
      minLengthRule('password', 6),
      maxLengthRule('password', 20),
    ],
    key: '3',
  },
  avatar: {
    ...createFormFieldConfig('Avatar', 'avatar', 'file'),
    validationRules: [requiredRule('avatar')],
    key: '1',
  },
};

//create login form out of signup form
const createLoginForm = () => {
  const form = {};
  for (let [key, value] of Object.entries(signupForm)) {
    if (key !== 'name' && key !== 'avatar') form[key] = value;
  }
  return form;
};

//object representation of login form
export const loginForm = createLoginForm();

export const newPostForm = {
  title: {
    ...createFormFieldConfig('Title', 'title', 'text'),
    validationRules: [requiredRule('title')],
  },
  image: {
    ...createFormFieldConfig('Image', 'image', 'file'),
    validationRules: [requiredRule('image')],
  },
  body: {
    ...createFormFieldConfig('Body', 'body', 'text'),
    validationRules: [requiredRule('Body')],
  },
  tags: {
    ...createFormFieldConfig('Tags', 'tags', 'text'),
    validationRules: [requiredRule('Tags')],
  },
  titleURL: {
    ...createFormFieldConfig('titleURL', 'titleURL', 'titleURL'),
    validationRules: [requiredRule('titleURL')],
  },
};

export let editPostForm = {
  title: {
    ...createFormFieldConfig('Title', 'title', 'text'),
    validationRules: [requiredRule('title')],
  },
  image: {
    ...createFormFieldConfig('Image', 'image', 'file'),
    validationRules: [requiredRule('image')],
  },
  body: {
    ...createFormFieldConfig('Body', 'body', 'text'),
    validationRules: [requiredRule('Body')],
  },
  tags: {
    ...createFormFieldConfig('Tags', 'tags', 'text'),
    validationRules: [requiredRule('Tags')],
  },
  titleURL: {
    ...createFormFieldConfig('titleURL', 'titleURL', 'titleURL'),
    validationRules: [requiredRule('titleURL')],
  },
};

export let editProfileForm = {
  name: {
    ...createFormFieldConfig('Name', 'name', 'text'),
    validationRules: [requiredRule('name')],
  },
  avatar: {
    ...createFormFieldConfig('Avatar', 'avatar', 'file'),
    validationRules: [requiredRule('avatar')],
  },
  bio: {
    ...createFormFieldConfig('Bio', 'bio', 'text'),
    validationRules: [requiredRule('bio')],
  },
  links: {
    ...createFormFieldConfig('Social Links', 'links', 'text'),
    validationRules: [requiredRule('links')],
  },
  location: {
    ...createFormFieldConfig('Location', 'location', 'text'),
    validationRules: [requiredRule('location')],
  },
  work: {
    ...createFormFieldConfig('Work', 'work', 'text'),
    validationRules: [requiredRule('work')],
  },
  skills: {
    ...createFormFieldConfig('Skills', 'skills', 'text'),
    validationRules: [requiredRule('skills')],
  },
};

export const prefillEditPostForm = (data) => {
  for (let [key, value] of Object.entries(data)) {
    if (key in editPostForm) {
      if (key === 'tags') {
        let tags = [];
        data[key].forEach((tag) => {
          tags.push(tag.name);
        });
        editPostForm = {
          ...editPostForm,
          [key]: { ...editPostForm[key], value: tags, valid: true },
        };
      } else {
        editPostForm = {
          ...editPostForm,
          [key]: { ...editPostForm[key], value, valid: true },
        };
      }
    }
  }
};

export const prefillEditProfileForm = (data) => {
  for (let [key, value] of Object.entries(data)) {
    if (key in editProfileForm) {
      editProfileForm = {
        ...editProfileForm,
        [key]: { ...editProfileForm[key], value, valid: true },
      };
    }
  }
};
