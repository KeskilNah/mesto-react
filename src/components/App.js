import React, { useState } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import Api  from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';


function App() {

  const [currentUser, setCurrentUser] = useState('');
  const [cards, setCards] = useState([]);

  React.useEffect(() => {
    Promise.all([Api.getUserInfo(), Api.getCards()])
    .then(([user, cards]) => {
      setCurrentUser(user);
      setCards(cards)
    })
    .catch((err) => {
      console.log(err)
    })
  }, [])

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    Api.toggleLike(card._id, isLiked)
    .then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
  });
    
  }

  function handleCardDelete(card) {
    Api.deleteCard(card._id).then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id && c));
    })
  }
  
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

  const handleUpdateUser = (name) => {
    Api.editProfile(name)
    .then((res) => {setCurrentUser((res));
     closeAllPopups();
    });
  }

  const handleUpdataAvatar = (avatar) => {
    console.log(avatar.avatar.current.value);
    Api.editAvatar(avatar.avatar.current.value).then((res) => {
      setCurrentUser((res));
      closeAllPopups();
    })
  }
  
  const handleAddPlaceSubmit = (data) => {
    
    console.log(cards);
    Api.setCard(data)
    .then((res) => {setCards([res, ...cards]);
      closeAllPopups();
      })
  }


  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
      <EditProfilePopup onClose={closeAllPopups} isOpen={isEditProfilePopupOpen} onUpdateUser={handleUpdateUser}/>
      <AddPlacePopup onClose={closeAllPopups} isOpen={isAddPlacePopupOpen} onAddPlace={handleAddPlaceSubmit}/>

  <PopupWithForm name="delete" title="Вы уверены?" onClose={closeAllPopups} children=""/>
  <EditAvatarPopup onClose={closeAllPopups} isOpen={isEditAvatarPopupOpen} onUpdateAvatar={handleUpdataAvatar} />
  <ImagePopup name="image" isOpen={!!selectedCard} onClose={closeAllPopups} card={selectedCard}/>
  
  <div className="page__wrapper">
  <Header />
    <Main 
    onEditProfile ={handleEditProfileClick}
    onAddPlace={handleAddPlaceClick}
    onEditAvatar={handleEditAvatarClick}
    onCardClick={handleCardClick}
    cards = {cards}
    onCardLike = {handleCardLike}
    onCardDelete = {handleCardDelete}
    />
    <Footer />

  </div>
  </CurrentUserContext.Provider>
    </div>
    
  );
}

export default App;
