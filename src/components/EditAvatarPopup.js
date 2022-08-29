import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({onClose, isOpen, onUpdateAvatar}) {
  const avatarRef = React.useRef();
  function handleSubmit(e) {
    console.log(avatarRef.current.value)
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef
    })
  }

  return (
    <PopupWithForm name="avatar" title="Обновить аватар" buttonText='Сохранить' children={
      <div className="popup__inputs">
      <input
        ref={avatarRef}
        type="url" 
        className={`avatar-popup__text-url popup__input`} 
        placeholder="Ссылка на картинку" 
        defaultValue="" 
        required 
        id="input-link"/>
      <p className="popup__error input-link-error">asd</p>
    </div>
    }
    onClose={onClose} isOpen={isOpen} onSubmit={handleSubmit}/>
  )
}