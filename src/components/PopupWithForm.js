import React from "react"

export default function PopupWithForm ({onClose, isOpen, name, title, children, onSubmit, buttonText}) {
  React.useEffect(() => {
    const handleEscClose = (evt) => {
      if(evt.key === 'Escape') {
        onClose()
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscClose);
    } else {
      document.removeEventListener('keydown', handleEscClose);
    }
  }, [isOpen, onClose])

  const [text, setText] = React.useState(buttonText);
  function changeText() {
    setText('Сохранение...')
  }

  return (
  <div className={`${name}-popup popup ${isOpen ? 'popup_opened' : ''}` } onClick={(evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      onClose()
    }
    }}>
    <div className={`${name}-popup__container`} >
      <button className={`${name}-popup__exit popup__close`} onClick={() => onClose()}/>
      <h2 className={`${name}-popup__title`}>{`${title}`}</h2>
      <form className={`${name}-popup__form popup__form`} name={`${name}-form`} onSubmit={onSubmit} noValidate>
        <div className="popup__inputs">
        {children}
        </div>
        <button type="submit" className={`${name}-popup__save-button popup__button`} onClick={changeText}>{text}</button>
      </form>
    </div>
  </div>

  )
}