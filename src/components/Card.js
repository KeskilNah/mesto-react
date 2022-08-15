export function Card (props) {

  function handleClick (item) {
  
    props.onCardClick(item.target)
  }
  return (
    props.card.map ((item, i) => (<li key={i} className="item">
      <img src={item.link} alt={item.name} className="item__image" onClick={handleClick}/>
      <div className="item__description">
        <p className="item__text">{item.name}</p>
        <div>
          <button type="button" className="item__like"></button>
          <p className="item__number">{item.likes.length}</p>
        </div>
      </div>
      <button className="item__delete"></button>
    </li>))
  )
}