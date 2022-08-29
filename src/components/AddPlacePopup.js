import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({onClose, isOpen, onAddPlace}) {
  const placeRef = React.useRef();
  const urlRef = React.useRef();

  function handleSubmit(e) {
    console.log()
    e.preventDefault();
    onAddPlace({
      place: placeRef.current.value,
      link: urlRef.current.value
    })
  }
  
  return (
    <PopupWithForm name="adding" title="Новое место" buttonText='Создать' children={
      <div className="popup__inputs">
      <input 
        ref={placeRef}
        type="text" 
        className={`adding-popup__text-place popup__input`} 
        placeholder="Название" 
        defaultValue="" 
        required 
        minLength="2" 
        maxLength="30" 
        id="input-place"/>
      <p className="popup__error input-place-error">asd</p>
      <input 
        ref={urlRef}
        type="url" 
        className={`adding-popup__text-url popup__input`} 
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