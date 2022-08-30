import React, { useState } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import Api  from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteConfirmationPopup from './DeleteConfirmationPopup';


function App() {

  const [currentUser, setCurrentUser] = useState('');
  const [cards, setCards] = useState([]);
  const [deletedCard, setDeletedCard] = useState(null)
  const [isRequestingServer, setIsRequestingServer] = useState(false)

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
  })
  .catch((err) => {
    console.log(err);
  });
    
  }

  function handleCardDelete(card) {
    console.log(card)
    Api.deleteCard(card._id).then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id && c));
      setIsRequestingServer(false);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
  }



  const [isDeletePopupOpen, setDeletePopupOpen] = React.useState(false);
  
  const handleDeleteButtonClick = (card) => {
    setIsRequestingServer(true);
    setDeletePopupOpen(!isDeletePopupOpen);
    setDeletedCard(card)
  }

  
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);

  const handleEditProfileClick = () => {
    setIsRequestingServer(true);
    setEditProfilePopupOpen(!isEditProfilePopupOpen);
  }
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  
  const handleAddPlaceClick = () => {
    setIsRequestingServer(true);
    setAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  
  const handleEditAvatarClick = () => {
    setIsRequestingServer(true);
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
    setDeletePopupOpen(false)
    setSelectedCard(null)

  }

  const handleUpdateUser = (name) => {
    Api.editProfile(name)
    .then((res) => {setCurrentUser((res));
    setIsRequestingServer(false);
    closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
}

  const handleUpdataAvatar = (avatar) => {
    console.log(avatar.avatar.current.value);
    Api.editAvatar(avatar.avatar.current.value).then((res) => {
      setCurrentUser((res));
      setIsRequestingServer(false);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
  }
  
  const handleAddPlaceSubmit = (data) => {
    
    console.log(data);
    Api.setCard(data)
    .then((res) => {setCards([res, ...cards]);
      setIsRequestingServer(false);
      closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
;
  }


  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
      <EditProfilePopup onClose={closeAllPopups} isOpen={isEditProfilePopupOpen} onUpdateUser={handleUpdateUser} isRequesting={isRequestingServer}/>
      <AddPlacePopup onClose={closeAllPopups} isOpen={isAddPlacePopupOpen} onAddPlace={handleAddPlaceSubmit} isRequesting={isRequestingServer}/>
      <DeleteConfirmationPopup onClose={closeAllPopups} isOpen={isDeletePopupOpen} deletedCard={deletedCard} onDeletedCard={handleCardDelete} isRequesting={isRequestingServer}/>
    <EditAvatarPopup onClose={closeAllPopups} isOpen={isEditAvatarPopupOpen} onUpdateAvatar={handleUpdataAvatar} isRequesting={isRequestingServer}/>
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
    onCardDelete = {handleDeleteButtonClick}
    />
    <Footer />

  </div>
  </CurrentUserContext.Provider>
    </div>
    
  );
}

export default App;
