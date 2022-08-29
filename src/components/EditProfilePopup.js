import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup({onClose, isOpen, onUpdateUser}) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const currentUser = React.useContext(CurrentUserContext);
  const [isNameError, setNameError] = useState('');
  const [isDescriptionError, setDescriptionError] = useState('');
  const [DescriptionErrorMessage, setDescriptionErrorMessage] = useState('');
  const [NameErrorMessage, setNameErrorMessage] = useState('')


  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]); 

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    console.log(name)
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  function handleChangeName(e) {
    setName(e.target.value)
    
    setNameErrorMessage(e.target.validity.valid ? '' : e.target.validationMessage  )
    setNameError(e.target.validity.valid ? '' : 'popup__error_visible')
    console.log(`ИЗ НЕЙМ ЕРОР ${isNameError}`)
  }
  
  function handleChangeDescription(e) {
    setDescription(e.target.value)

    setDescriptionErrorMessage(e.target.validity.valid ? '' :  e.target.validationMessage)
    setDescriptionError(e.target.validity.valid ? '' : 'popup__error_visible')
    console.dir(e.target.validity.valid)
    console.dir(e.target.validationMessage)
  }



  return (
<PopupWithForm name="edit" title="Редактировать профиль" buttonText='Сохранить' children=
        {
      <div className="popup__inputs">
        <input 
          type="text" 
          className={`edit-popup__text-place popup__input`} 
          placeholder="Имя" 

          required 
          minLength="2" 
          maxLength="30" 
          id="input-place"
          onChange={handleChangeName}
          defaultValue={name}
          />
        <p className={`popup__error ${isNameError} input-place-error`}>{NameErrorMessage}</p>
        <input 
          type="text"
          minLength="2" 
          maxLength="30" 
          className={`edit-popup__text-url popup__input`} 
          placeholder="Род деятельности" 
          defaultValue={description} 
          onChange={handleChangeDescription}
          required 
          id="input-link"/>
        <p className={`popup__error ${isDescriptionError} input-link-error`}>{DescriptionErrorMessage}</p>
      </div>
    } 
    onClose={onClose} isOpen={isOpen} onSubmit={handleSubmit} />
)}