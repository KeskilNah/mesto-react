import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';


function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);

  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(!isEditProfilePopupOpen);
  }
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  
  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  
  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  const [selectedCard, setSelectedCard] = React.useState(null);

  const handleCardClick = (card) => {

    setSelectedCard(card);
  }

  const closeAllPopups = () => {
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setSelectedCard(null)

  }


  return (
    <div className="App">

  <PopupWithForm name="edit" title="Редактировать профиль" children=
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
    }
    onClose={closeAllPopups} isOpen={isEditProfilePopupOpen} />
  <PopupWithForm name="adding" title="Новое место" children={
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
  }
  onClose={closeAllPopups} isOpen={isAddPlacePopupOpen} />

  <PopupWithForm name="delete" title="Вы уверены?" onClose={closeAllPopups} children=""/>
  <PopupWithForm name="avatar" title="Обновить аватар" children={
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
    }
    onClose={closeAllPopups} isOpen={isEditAvatarPopupOpen} />
  <ImagePopup name="image" isOpen={!!selectedCard} onClose={closeAllPopups} card={selectedCard}/>
  
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

    </div>
  );
}

export default App;
