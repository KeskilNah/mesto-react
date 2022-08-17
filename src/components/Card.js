export function Card (props) {

  function handleClick (item) {
  
    props.onCardClick(item.target)
  }
  return (
    <li className="item">
      <img src={props.link} alt={props.name} className="item__image" onClick={handleClick}/>
      <div className="item__description">
        <p className="item__text">{props.name}</p>
        <div>
          <button type="button" className="item__like"></button>
          <p className="item__number">{props.likes.length}</p>
        </div>
      </div>
      <button className="item__delete"></button>
    </li>
  )
} 