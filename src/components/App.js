import React, { useState } from 'react';
import Header from './header';
import Main from './main';
import Footer from './footer';
import PopupWithForm from './PopupWithForm';
import PopupWithImage from './PopupWithImage';


function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);

  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(!isEditProfilePopupOpen);
    document.addEventListener('keydown', handleEscClose)
  }
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  
  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(!isAddPlacePopupOpen);
    document.addEventListener('keydown', handleEscClose)
  }

  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  
  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(!isEditAvatarPopupOpen);
    document.addEventListener('keydown', handleEscClose)
  }

  const [selectedCard, setSelectedCard] = React.useState(null);

  const handleCardClick = (card) => {
    console.log(card)
    setSelectedCard(card);
    document.addEventListener('keydown', handleEscClose)
  }

  const [isPopupOpen, setPopupOpen] = useState(false);
  const handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      setPopupOpen(!isPopupOpen)
    }
  }



  const closeAllPopups = () => {
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setSelectedCard(null)
    document.removeEventListener('keydown', handleEscClose)
  }


  return (
    <div className="App">

  <PopupWithForm name="edit" title="Редактировать профильь" onClose={closeAllPopups} isOpen={isEditProfilePopupOpen} children=
  {
  <div className="popup__inputs">
        <input 
          type="text" 
          className={`edit-popup__text-place popup__input`} 
          placeholder="Имя" 
          defaultValue="" 
          required 
          minLength="2" 
          maxLength="30" 
          id="input-place"/>
        <p className="popup__error input-place-error">asd</p>
        <input 
          type="url" 
          className={`edit-popup__text-url popup__input`} 
          placeholder="Род деятельности" 
          defaultValue="" 
          required 
          id="input-link"/>
        <p className="popup__error input-link-error">asd</p>
      </div>
    }/>
  <PopupWithForm name="adding" title="Новое местоо" onClose={closeAllPopups} isOpen={isAddPlacePopupOpen} children={
  <div className="popup__inputs">
  <input 
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
    type="url" 
    className={`adding-popup__text-url popup__input`} 
    placeholder="Ссылка на картинку" 
    defaultValue="" 
    required 
    id="input-link"/>
  <p className="popup__error input-link-error">asd</p>
</div>
  }/>

  <PopupWithForm name="delete" title="Вы уверены??" onClose={closeAllPopups} children=""/>
  <PopupWithForm name="avatar" title="Обновить аватарр" onClose={closeAllPopups} isOpen={isEditAvatarPopupOpen} children={
      <div className="popup__inputs">
      <input 
        type="url" 
        className={`avatar-popup__text-url popup__input`} 
        placeholder="Ссылка на картинку" 
        defaultValue="" 
        required 
        id="input-link"/>
      <p className="popup__error input-link-error">asd</p>
    </div>
    }/>
  <PopupWithImage name="image" isOpen={!!selectedCard} onClose={closeAllPopups} card={selectedCard}/>
  
  <div className="page__wrapper">
  <Header />
    <Main 
    onEditProfile ={handleEditProfileClick}
    onAddPlace={handleAddPlaceClick}
    onEditAvatar={handleEditAvatarClick}
    onCardClick={handleCardClick}
    />
    <Footer />

  </div>
  <template className="item-template">
    <li className="item">
      <img src="#" alt="#" className="item__image" onClick={handleCardClick}/>
      <div className="item__description">
        <p className="item__text"></p>
        <div>
          <button type="button" className="item__like"></button>
          <p className="item__number">1</p>
        </div>
      </div>
      <button className="item__delete"></button>
    </li>
  </template>

    </div>
  );
}

export default App;
