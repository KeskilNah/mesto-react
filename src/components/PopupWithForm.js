export default function PopupWithForm (props) {
  

  return (
    <div className={`${props.name}-popup popup ${props.isOpen ? 'popup_opened' : ''}`} onClick={props.onClose}>
    <div className={`${props.name}-popup__container`} onClick={(evt) => {evt.stopPropagation()}}>
      <button className={`${props.name}-popup__exit popup__close`} onClick={props.onClose}></button>
      <h2 className={`${props.name}-popup__title`}>{`${props.title}`}</h2>
      <form className={`${props.name}-popup__form popup__form`} name={`${props.name}-form`} noValidate>
        <div className="popup__inputs">
        {props.children}
        </div>
        <button type="submit" className={`${props.name}-popup__save-button popup__button`}>Создать</button>
      </form>
    </div>
  </div>
  )
}