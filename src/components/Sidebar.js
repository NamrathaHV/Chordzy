/** @jsx jsx */
import React, { useState, useRef, useContext } from 'react'
import { css, jsx } from '@emotion/core'
import { StoreContext } from './index'
import Modal from './Modal'
import Toast from './Toast'
import logo from '../img/logoNew2.png'

const Sidebar = () => {
  const [sidebarState, setState] = useState({
    modal: false,
    toast: ''
  })

  //accepts a context object (the value returned from React.createContext) and returns the current context value
  const { state, dispatch } = useContext(StoreContext)

  const playlistRef = useRef(null)
  const playlists = Object.keys(state.playlists)

  const addPlaylist = e => {
    e.preventDefault()
    const list = playlistRef.current.value

    dispatch({ type: 'ADD_PLAYLIST', playlist: list })

    setState({
      ...sidebarState,
      modal: false,
      toast: 'Playlist was created successfully!'
    })
  }

  const handleModal = () =>
    setState({ ...sidebarState, modal: !sidebarState.modal })

  return (
    <ul className="Sidebar" css={CSS}>
      {/* <div className="container"> */}
      <div className="logo">
      <img src={logo} style={{ borderRadius:80}}/>
      <div
        className="text">
          <h3>CHORDZY</h3>
      </div>
      </div>
      {/* </div> */}

      <li className="library">Library</li>


      {playlists.map(list => (
        <li
          key={list}
          className={list === state.currentPlaylist ? 'active' : ''}
          onClick={() => dispatch({ type: 'SET_PLAYLIST', playlist: list })}>
          
          <i className={ list=='home' ?  ["fa fa-home"] :  [list=='favorites' ? "fa fa-heart" : "fa fa-headphones" ]} />
            &nbsp;
            &nbsp;
          {list}
        </li>

      ))}

      <li className="new-playlist" onClick={handleModal}>
        <i className="fa fa-plus-circle" />
        <span>New Playlist</span>
      </li>

      <Modal show={sidebarState.modal} close={handleModal}>
        <form onSubmit={addPlaylist}>
          <div className="title">New Playlist</div>

          <div className="content-wrap">
            <input
              type="text"
              placeholder="My Playlist"
              ref={playlistRef}
              required
            />

            <br />

            <button type="submit">Create</button>
          </div>
        </form>
      </Modal>

      <Toast
        toast={sidebarState.toast}
        close={() => setState({ ...sidebarState, toast: '' })}
      />
    </ul>
  )
}

const CSS = css`
  width: 300px;
  height: 100%;
  background: linear-gradient(#000000,#000e34,#1a001a);
  padding-top: 20px;

  img {
    height: 60px;
    //padding-left: 20px;
    margin-left:20px;
    margin-bottom: 20px;
  }

  li {
    padding-left: 20px;
    text-transform: capitalize;
    margin-bottom: 10px;
    cursor: pointer;
    font-weight: bold;
    font-size:20px;
  }

  .container {
    display: flex;
    align-items: right;
    justify-content: right;
  }

  li.active {
    border-left: 2px solid white;
    padding-left: 18px;
  }

  li.library {
    margin-top:30px;
    cursor: unset;
    color: #999;
    text-transform: uppercase;
    font-weight: normal;
    margin-bottom:30px;
  }

  .img {
    padding-left:0px;
    flex-basis: 40%;
    float:left;
  }
  
  .text {
    font-size: 15px;
    position:relative;
    display: inline flow-root list-item;
    right:130px;
    float:right;
    font-style:italic;
  }

  li.new-playlist {
    position: relative;
    top: 40px;

    i {
      margin-right: 5px;
      transform: translateY(1px);

      &:before {
        font-size: 20px;
      }
    }

    span {
      color: #999;
      font-weight: 300;
    }
  }

  form {
    button {
      background-color: #5d093b;
      color: white;
      padding: 12.5px 30px;
      border-radius: 25px;
      text-transform: uppercase;
      font-weight: bold;
      font-size: 13px;
      border: none;
      cursor: pointer;
    }

    .title {
      margin: 0;
      margin-bottom: 35px;
    }

    input {
      margin-bottom: 20px;
      height: 35px;
      padding-left: 8px;
      font-size: 16px;
      width: 100%;
      color: black;
    }
    .logo{
      display:inline-flex; !important
      

    }

    .content-wrap {
      margin: 0px auto;
      max-width: 250px;
      text-align: center;
    }
  }
`

export default Sidebar