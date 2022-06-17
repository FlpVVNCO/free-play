import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGamepad } from '@fortawesome/free-solid-svg-icons'

const Games = ({ games, handleClickModal, handleGameId }) => {
  return (
    <div className="container-cards">
      {games?.map((game) => (
        <div
          className="card"
          key={game.id}
          data-aos="fade-in"
          onClick={() => {
            handleClickModal()
            handleGameId(game.id)
          }}
        >
          {/* <div className="card-icon">
           <i><FontAwesomeIcon icon={faGamepad} /></i> 
          </div> */}
          <img className="card-img" src={game.thumbnail} alt={game.title} />
          <h2>{game.title}</h2>
          <h4>{game.platform}</h4>
        </div>
      ))}
    </div>
  )
}

export default Games
