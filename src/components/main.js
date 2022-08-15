import React, { useState } from 'react';
import penIcoPath from '../images/icons/avatar-edit.svg'
import { readyApi } from '../utils/Api';
import { Card } from './Card';

function Main(props) {

  const [userName, setUserName] = useState('Антоха');
  const [userDescription, setUserDescription] = useState();
  const [userAvatar, setUserAvatar] = useState();
  const [cards, setCards] = useState([])

  React.useEffect(() => {
    Promise.all([readyApi.getUserInfo(), readyApi.getCards()])
    .then(([user, cards]) => {
      setUserName(user.name);
      setUserDescription(user.about)
      setUserAvatar(user.avatar)
      setCards(cards);
    })
    .catch((err) => {
      console.log(err)
    })
  }, [])



  return (
    <main className="main">
      <section className="profile">
        <div className="profile__wrapper">
          
          <div className="profile__avatar" onClick={props.onEditAvatar}>
            <img src={penIcoPath} alt="карандашик" className="profile__avatar-edit-image"/>
            <img src={userAvatar} alt="Жак-Ив Кусто" className="profile__avatar-image"/>
            
          </div>
          <h1 className="profile__title">{userName}</h1>
          <button type="button" className="profile__edit" onClick={props.onEditProfile}></button>
          <p className="profile__subtitle">{userDescription}</p>
          <button className="profile__button" onClick={props.onAddPlace}></button>
        </div>
      </section>
      <section className="gallery"> 
        <ul className="gallery__items">
        <Card  card={cards} onCardClick={props.onCardClick}/>

      </ul>
      </section>
    </main>
  );
}

export default Main;