import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import Games from './Games'
import Header from './Header'
import ModalGame from './ModalGame'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Spinner from './Spinner'

const Home = () => {
  const [browser, setBrowser] = useState('')
  const [games, setGames] = useState([])
  const [storedGames, setStoredGames] = useState([])
  const [releaseGame, setReleaseGame] = useState([])
  const [modalGame, setModalGame] = useState([])
  const [background, setBackground] = useState('')
  const [images, setImages] = useState()
  const [gameId, setGameId] = useState()
  const [category, setCategory] = useState()
  const [platform, setPlatform] = useState()
  const [scrolled, setScrolled] = useState(0)
  const [modal, setModal] = useState(false)
  const [transitionModal, setTransitionModal] = useState(false)
  const [loadSpinner, setLoadSpinner] = useState(true)

  const getGames = async () => {
    setLoadSpinner(true)
    const options = {
      method: 'GET',
      url: 'https://free-to-play-games-database.p.rapidapi.com/api/games',
      params: {
        category: category,
        'sort-by': 'popularity',
        platform: platform,
      },
      headers: {
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com',
        'X-RapidAPI-Key': '***enter a key***',
      },
    }
    await axios
      .request(options)
      .then(function (response) {
        setGames(response.data)
        setStoredGames(response.data)
      })
      .catch(function (error) {
        console.error(error)
      })
    setLoadSpinner(false)
  }

  const getReleaseGames = async () => {
    const options = {
      method: 'GET',
      url: 'https://free-to-play-games-database.p.rapidapi.com/api/games',
      params: { 'sort-by': 'release-date' },
      headers: {
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com',
        'X-RapidAPI-Key': 'b2316266b4mshe45af62f53a243ep1afe41jsn1f64ae5d95a0',
      },
    }
    await axios
      .request(options)
      .then(function (response) {
        setReleaseGame(response.data)
      })
      .catch(function (error) {
        console.error(error)
      })
  }

  const getGameId = async () => {
    if (!gameId) return

    setLoadSpinner(true)
    const options = {
      method: 'GET',
      url: 'https://free-to-play-games-database.p.rapidapi.com/api/game',
      params: { id: gameId },
      headers: {
        'X-RapidAPI-Key': 'b2316266b4mshe45af62f53a243ep1afe41jsn1f64ae5d95a0',
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com',
      },
    }
    await axios
      .request(options)
      .then(function (response) {
        setModalGame(response.data)
        setImages(response.data.screenshots.slice(0, 2))
        setBackground(response.data.screenshots[0].image)
        console.log(response.data)
      })
      .catch(function (error) {
        console.error(error)
      })

    setLoadSpinner(false)
  }

  useEffect(() => {
    getGames()
  }, [category, platform])

  useEffect(() => {
    getReleaseGames()
    AOS.init()
  }, [])

  useEffect(() => {
    getGameId()
  }, [gameId])

  const handleClickModal = () => {
    setModal(!modal)
    // window.scrollTo(0, 0)
    window.scroll({
      top: 0,
      behavior: 'smooth',
    })

    setScrolled(window.scrollY)

    console.log(scrolled)

    setTimeout(() => {
      setTransitionModal(!transitionModal)
    }, 1000)
  }

  const handleGameId = (id) => {
    setGameId(id)
  }

  const handleCategory = (e) => {
    setCategory(e.target.value)
  }

  const handlePlataform = (e) => {
    setPlatform(e.target.value)
  }

  const handleSearch = (e) => {
    setBrowser(e.target.value)
    filter(e.target.value)
  }

  const filter = (searchTerm) => {
    var resultSearch = storedGames.filter((e) => {
      if (
        e.title
          .toString()
          .toLowerCase()
          .includes(searchTerm.toLocaleLowerCase())
      ) {
        return e
      }
    })
    setGames(resultSearch)
  }

  return (
    <>
      <Header releaseGame={releaseGame} />
      <div className="container-form">
        <div className="select-search">
          <h2>Platform & Category</h2>
          <select onChange={handlePlataform}>
            <option>-- Select Platform --</option>
            <option value="pc">Desktop/PC</option>
            <option value="browser">Browser</option>
            <option value="all">All Plataform</option>
          </select>
          <select onChange={handleCategory}>
            <option value="">-- Select Category --</option>
            <option value="shooter">Shooter</option>
            <option value="moba">Moba</option>
            <option value="mmorpg">Mmorpg</option>
            <option value="sports">Sports</option>
          </select>
        </div>
        <div className="form-search" style={{ position: `relative` }}>
          <h2>Enter a game</h2>
          <input
            placeholder="Search..."
            type="text"
            value={browser}
            onChange={handleSearch}
          />
          <FontAwesomeIcon
            icon={faSearch}
            style={{
              position: `absolute`,
              right: `15px`,
              top: `60px`,
              color: `#FFF`,
              fontSize: `20px`,
            }}
          />
        </div>
      </div>
      {loadSpinner ? (
        <Spinner />
      ) : Object.keys(games).length === 0 ? (
        <h1 className="not-found" data-aos="fade-in">
          Ups, Please enter a valid game{' '}
        </h1>
      ) : (
        <Games
          games={games}
          handleClickModal={handleClickModal}
          handleGameId={handleGameId}
          loadSpinner={loadSpinner}
        />
      )}
      {modal && (
        <ModalGame
          games={games}
          handleClickModal={handleClickModal}
          modalGame={modalGame}
          background={background}
          modal={modal}
          setModal={setModal}
          transitionModal={transitionModal}
          setTransitionModal={setTransitionModal}
          images={images}
          loadSpinner={loadSpinner}
          scrolled={scrolled}
        />
      )}
    </>
  )
}

export default Home
