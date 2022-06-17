import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGamepad } from '@fortawesome/free-solid-svg-icons'
import Spinner from './Spinner'

const Header = ({ releaseGame, loadSpinner }) => {
  return (
    <div className="container-header">
      <h1> Recently Added</h1>
      {loadSpinner && <Spinner />}
      <header className="header">
        {releaseGame.slice(0, 3)?.map((game) => (
          <div className="card-header" key={game.id}>
            <img src={game.thumbnail} alt={game.title} />
            <div className="info-header">
              <h2>{game.title}</h2>
              <button className="button-header">
                View Website <FontAwesomeIcon icon={faGamepad} />
                <a href={game.game_url}> </a>
              </button>
            </div>
          </div>
        ))}
      </header>
    </div>
  )
}

export default Header
