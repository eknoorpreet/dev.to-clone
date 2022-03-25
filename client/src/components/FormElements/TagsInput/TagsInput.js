import React, { useEffect, useState } from 'react';
import { GrFormClose } from '@react-icons/all-files/gr/GrFormClose';
import './TagsInput.css';

export const TagsInput = (props) => {
  const [tags, setTags] = useState([]);
  const [isValid, setIsValid] = useState(false);

  const addTag = (evt) => {
    const tag = evt.target.value;
    if (evt.code === 'Enter' && tag !== '') {
      setTags((tags) => [...tags, tag]);
      evt.target.value = '';
      let isInputValid = isValid;
      if (tag !== '') {
        setIsValid(true);
        isInputValid = true;
      } else {
        setIsValid(false);
        isInputValid = false;
      }
      props.onChange('tags', [...tags, tag], isInputValid);
    }
  };

  useEffect(() => {
    setTags(props.tags);
  }, [props.tags, setTags]);

  //just send the tags array and run onChange in both add and remove?

  const removeTag = (indexToRemove) => {
    const removedTag = tags[indexToRemove];
    const updatedTags = tags.filter((tag) => tag !== removedTag);
    setTags(updatedTags);
    props.onChange('tags', updatedTags, true);
  };

  return (
    <>
      <h4>{props.label}</h4>
      <div className='tags__input'>
        <ul className='input__list'>
          {tags &&
            tags.map((tag, index) => (
              <li className='input__item' key={index}>
                <span>#{tag}</span>
                <i className='input__remove'>
                  <GrFormClose onClick={() => removeTag(index)} />
                </i>
              </li>
            ))}
        </ul>
        <input
          type='text'
          placeholder='Press enter to add tags'
          onKeyUp={addTag}
        />
      </div>
    </>
  );
};

export default TagsInput;
