import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faXmark,
  faArrowAltCircleRight,
} from '@fortawesome/free-solid-svg-icons'
import Spinner from './Spinner'

const ModalGame = ({
  modal,
  modalGame,
  transitionModal,
  setTransitionModal,
  setModal,
  images,
  background,
  loadSpinner,
  scrolled,
}) => {
  //Oculta el modal
  const handleHiddenModal = () => {
    setTransitionModal(!transitionModal)

    window.scroll({
      top: scrolled,
      behavior: 'smooth',
    })

    setTimeout(() => {
      setModal(!modal)
    }, 500)
  }

  return (
    // arreglar el modal

    <div className="modal">
      {loadSpinner && <Spinner />}
      <div className="close-modal" onClick={handleHiddenModal}>
        <FontAwesomeIcon icon={faXmark} />
      </div>
      <div
        className={`container-modal ${transitionModal ? 'transition' : 'quit'}`}
      >
        <div
          className="header-modal"
          style={{
            backgroundImage: `url(${background})`,
            backgroundRepeat: `no-repeat`,
            backgroundSize: `cover`,
          }}
        >
          <div className="header-img-modal">
            <img src={modalGame?.thumbnail} alt={modalGame.title} />
          </div>
          <div className="header-info-modal">
            <h2>{modalGame?.title}</h2>
            <p>
              Release date: <span>{modalGame?.release_date}</span>
            </p>
            <p>
              Genre: <span>{modalGame?.genre}</span>
            </p>
            <p>
              Platform: <span>{modalGame?.platform}</span>
            </p>
            <p>
              Publisher: <span>{modalGame?.publisher}</span>
            </p>
            <p>
              Developer: <span>{modalGame?.developer}</span>
            </p>
          </div>
        </div>

        <div className="description-modal">
          <div>
            <h2>Description</h2>
            <p>{modalGame?.description}</p>
          </div>
        </div>

        <div className="body-modal">
          <h2>
            Minimum System Requirements <span>(Windows)</span>
          </h2>
          {modalGame?.minimum_system_requirements === undefined ? (
            <p>Undefined</p>
          ) : (
            <div>
              <p>
                OS: <span>{modalGame?.minimum_system_requirements?.os}</span>
              </p>
              <p>
                Processor:{' '}
                <span>{modalGame?.minimum_system_requirements?.processor}</span>
              </p>
              <p>
                Ram:{' '}
                <span>{modalGame?.minimum_system_requirements?.memory}</span>
              </p>
              <p>
                Video card:{' '}
                <span>{modalGame?.minimum_system_requirements?.graphics}</span>
              </p>
              <p>
                Storage:{' '}
                <span>{modalGame?.minimum_system_requirements?.graphics}</span>
              </p>
            </div>
          )}
        </div>

        <div className="button-modal">
          <h2>Redirect to website</h2>
          <p>
            Status: <span>{modalGame?.status}</span>
          </p>
          <button>
            <a href={modalGame?.game_url}>
              GO <FontAwesomeIcon icon={faArrowAltCircleRight} />
            </a>
          </button>
        </div>

        <div className="img-title">
          <h2>Screenshots</h2>
        </div>
        <div className="img-modal">
          {(images || []).map((image) => (
            <div key={image?.id}>
              <img src={image?.image} alt={image?.id} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ModalGame
