import React from "react"

export default function PopupWithImage (props) {
  
  React.useEffect(() => {
    const handleEscClose = (evt) => {
      if(evt.key === 'Escape') {
        props.onClose()
      }
    };
    if (props.isOpen) {
      document.addEventListener('keydown', handleEscClose);
    } else {
      document.removeEventListener('keydown', handleEscClose);
    }
  }, [props.isOpen])

  return (
    <div className={`${props.name}-popup popup ${props.isOpen ? 'popup_opened' : ''}`} onClick={props.onClose}>
    <div className={`${props.name}-popup__container`} onClick={(evt) => {evt.stopPropagation()}}>
      <button onClick={props.onClose} className={`${props.name}-popup__exit popup__close`}></button>
      <p className={`${props.name}-popup__title`}>{props.card?.alt ?? ''}</p>
      <img src={`${props.card?.src ?? ''}`} alt={`${props.card?.alt ?? ''}`} className={`${props.name}-popup__pic`}/>
    </div>
  </div>
  )
}