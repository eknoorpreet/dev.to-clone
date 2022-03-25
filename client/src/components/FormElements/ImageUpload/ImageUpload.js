import React, { useRef, useState, useEffect } from 'react';
import './ImageUpload.css';

const ImageUpload = (props) => {
  const [file, setFile] = useState();
  const [previewURL, setPreviewURL] = useState();
  const [isValid, setIsValid] = useState(false);
  const filePickerRef = useRef();

  useEffect(() => {
    setFile(props.file);
  }, [props.file]);

  useEffect(() => {
    if (!file) {
      return;
    }
    if (typeof file === 'string') {
      setPreviewURL(`${file}`);
    } else {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewURL(fileReader.result);
      };
      fileReader.readAsDataURL(file);
    }
  }, [file]);
  const pickedHandler = (e) => {
    let pickedFile;
    let fileIsValid = isValid;
    if (e.target.files || e.target.files.length === 1) {
      pickedFile = e.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    //file already being validated here
    props.onInput(props.label.toLowerCase(), pickedFile, fileIsValid);
  };
  const pickImageHandler = () => {
    filePickerRef.current.click();
  };
  return (
    <div className='form__image'>
      <input
        id={props.id}
        ref={filePickerRef}
        style={{ display: 'none' }}
        type='file'
        accept='.jpg,.png,.jpeg'
        onChange={pickedHandler}
      />
      <div className={`image-upload ${props.center && 'center'}`}>
        <div className='image-upload__preview'>
          {previewURL && <img src={previewURL} alt='preview' />}
          {!previewURL && <p>Please pick an image</p>}
        </div>
        <button
          type='button'
          className='btn btn-upload'
          onClick={pickImageHandler}
        >
          Choose image
        </button>
      </div>
      {!isValid && <p>{props.errorText}</p>}
    </div>
  );
};

export default ImageUpload;
