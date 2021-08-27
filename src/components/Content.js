/* eslint-disable prettier/prettier */
/** @jsx jsx */
import React, { useCallback, useContext, useState } from 'react'
import { css, jsx } from '@emotion/core'
import { StoreContext } from './index'
//import "./Content.css"
import Modal from './Modal'
import Toast from './Toast'
import sym from '../img/logo10.png'

const Content = () => {
  const { state, dispatch } = useContext(StoreContext)

  const[searchTerm,setSearchTerm] = useState('');
  const [toast, setToast] = useState('')
  const [playlistSelect, setPlayListSelect] = useState('')
  const [playVisibleId, setPlayVisibleId] = useState(
    false
  )
  //serial number counter
  var i=0

  const currentPlaylist = state.currentPlaylist

  const playlists = Object.keys(state.playlists).filter(
    list => !['home', 'favorites'].includes(list)
  )
  const songIds = Array.from(
    state.playlists[currentPlaylist]
  )

  const handleSelect = useCallback(e => {
    setPlayListSelect(e.target.value)
  })

  const handleSearch = useCallback(e => {
    setSearchTerm(e.target.value)
  })

  


  return (
    <div className="Content"   css={CSS}> 

<div className="Search"><input type="text" value={searchTerm} placeholder ="Search for a song..."  onChange={handleSearch}  />
      </div>
      <div className="playlist-title" style={{marginBottom:40}}>
        {currentPlaylist}
      </div>

      {songIds.length <= 0 ? (
        <p style={{ marginTop: 10 }}>
          Your playlist is empty. Start by adding some
          songs!
        </p>
      ) : (
        <table>
          <thead>
            <tr>
              <td className="sl" style={{paddingLeft :30}}>#</td>
              <td />
              <td>Title</td>
              <td>Artist</td>
              <td>Duration</td>
              <td />
              <td/>
            </tr>
          </thead>

          <tbody>
            {
              songIds.filter((id)=>{
                if(searchTerm == ''){
                  return id
                } else if(state.media[id].title.toLowerCase().includes(searchTerm.toLowerCase())){
                  return id
                }

              } ).map(id => {
                const {
                  title,
                  artist,
                  length
                } = state.media[id]
                const isFavorite = state.playlists.favorites.has(
                  id
                )
              i=i+1
              return (
                <tr key={id}
                style={{ color: state.playing && state.currentSongId == id ? "#D4AF37" : "white", fontWeight: state.playing && state.currentSongId == id ? "bold" : "normal"}}
                
                //mouse hover
                onMouseEnter={() =>
                  setPlayVisibleId(id)
                }

                
                onMouseLeave={() =>
                  setPlayVisibleId('')
                }>
                  
                  <td
                    style={{ width: 75, paddingLeft: 30 }}
                  >
                    <PlayPause
                      playing={state.playing}
                      songId={id}
                      isCurrentSong={
                        state.currentSongId === id
                      }
                      visible={playVisibleId === id}
                      num={i}
                    />

                    <span style={{ marginRight: 50 }} />
                    </td>
                  <td><img style={{width:45,height:45,marginRight:5,borderRadius:70}} src={sym} /></td>
                  <td >{title}</td>
                  <td>{artist}</td>
                  <td>{length}</td>
                      <td>
                    <Favorite
                      isFavorite={isFavorite}
                      songId={id}
                    />

                    <span style={{ marginRight: 10 }} />
                    </td>
                      <td
                      style={{ width: 75, paddingLeft: 5 }}
                    >
                        <AddSong
                        visible={playVisibleId === id}
                        songId={id}
                    />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )}

      <Modal
        show={state.addToPlaylistId}
        close={() => {
          dispatch({ type: 'ABORT_ADD_TO_PLAYLIST' })
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 18, marginBottom: 20 }}>
            Add To Playlist
          </div>

          {playlists.length < 1 ? (
            <>
              <p>
                You don't have any custom playlists yet.
                Start by creating one in the sidebar menu!
              </p>

              <div style={{ marginTop: 15 }}>
              <button onClick={() => {
          dispatch({ type: 'ABORT_ADD_TO_PLAYLIST' })
        }}>Ok</button>
              </div>
            </>
          ) : (
            <>
              <select
                value={playlistSelect}
                onChange={handleSelect}
                style={{
                  borderRadius:60,
                  fontSize: 16,
                  textTransform: 'capitalize',
                  width: 115,
                  height: 25
                }}
              >
                <option value="">Choose</option>

                {playlists.map(list => (
                  <option
                    key={list}
                    value={list}
                    disabled={state.playlists[list].has(
                      state.addToPlaylistId
                    )}
                  >
                    {list}
                  </option>
                ))}
              </select>

              <div style={{ marginTop: 20 }}>
                <button
                  onClick={() => {
                    if (playlistSelect === '') return
                    
                    dispatch({
                      type: 'SAVE_TO_PLAYLIST',
                      playlist: playlistSelect
                    })

                    setToast(
                      'Successfully added to your playlist.'
                    )

                    setPlayListSelect('')
                  }}
                >
                  Save
                </button>
              </div>
            </>
          )}
        </div>
      </Modal>

      <Toast toast={toast} close={() => setToast('')} />
    </div>
  )
}

const Favorite = ({ isFavorite, songId }) => {
  const { dispatch } = useContext(StoreContext)

  return isFavorite ? (
    <i
      className="fa fa-heart"
      onClick={() => dispatch({ type: 'REMOVE_FAVORITE', songId })}
    />
  ) : (
    <i
      className="fa fa-heart-o"
      onClick={() => dispatch({ type: 'ADD_FAVORITE', songId })}
    />
  )
}

const PlayPause = ({ playing, songId, isCurrentSong, visible, num }) => {
  const { dispatch } = useContext(StoreContext)
  const style = { visibility: visible ? 'visible' : 'hidden' }
  const number = num
  if(visible){
  if (isCurrentSong && playing) {
    return (
      <i
        className="fa fa-pause"
        onClick={() => dispatch({ type: 'PAUSE' })}
        style={style}
      />
    )
  } else {
    return (
      <i
        className="fa fa-play"
        onClick={() => dispatch({ type: 'PLAY', songId })}
        style={style}
      />
    )
  }
}else{
  return(
    number 
  )
}
}

const AddSong =({visible,songId}) =>{
  const { dispatch } = useContext(StoreContext)
  const style = { visibility: visible ? 'visible' : 'hidden' }
  return(
    
                    <i
                      className="fa fa-plus"
                      onClick={() => {
                        dispatch({
                          type: 'ADD_TO_PLAYLIST',
                          songId
                        })
                      }}
                      style={style}
                    />
  )
}

const CSS = css`
  width: calc(100% - 200px);
  height: calc(100% - 75px);
  padding: 50px;

  background-image:linear-gradient(#000e34,#2C041C);    // **


  padding-top: 10px;
  overflow-y: scroll;
  overflow-x:hidden;
  color: white;// #00203FFF;/white; */  /#00203FFF; /  /*white;/

  ::-webkit-scrollbar {
    width: 15px;
  }

  ::-webkit-scrollbar-thumb {
    //background: #00203FFF;    // background: #00103f;
    background-image:linear-gradient(#000000,#2C041C,#000000);
  }

  .playlist-title {
    font-size: 30px;
    font-weight: bold;
    text-transform: capitalize;
    font-family:Arial;

  }

  table {
    border-collapse: collapse;
    width: 100%;
    margin-top: 15px;
    font-size: 20px;
  }

  /*table tr {
    border-bottom: 1px solid #00203FFF;
  }*/

  

  table td {
    padding: 10px 0;
    //top and bottom - 10px
    //right and left - 0px
  }

  table thead {
    //border-bottom: 2.5px solid #00203FFF;
    border-bottom: 2.5px solid white;
    font-weight: 600;
  }

  tbody:before {
    line-height:1.5em;
    content:"-";
    color:transparent; /* to hide text */
    display:block;
}

  

//nesting
  table thead td {
    text-transform: uppercase;
    padding-bottom:20px;
  }

  i {
    cursor: pointer;
  }

  button {
    background-color: 	#5d093b ;
    color: white;
    padding: 12.5px 30px;
    border-radius: 25px;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 13px;
    border: none;
    cursor: pointer;
  }

  thead tr:hover td{ background: transparent !important; 
                      color: white !important; }

  tr:hover td { background:  #46072d !important;
                color:#D4AF37 !important; }

                .Search{
                  /*  position:absolute;
                   left: 50%;
                   top: 5%;
                   transform: translate(-50%, -50%);
                   padding: 20px;  */

                   position:relative;

                   height: 100px;
                   left:87px;
                   padding: 20px;
                   
                   }
                   input {
                     width: 400px;
                     padding: 0 20px;
                 }
                 
                 input,
                 input::-webkit-input-placeholder {
                     font-size: 20px;
                     line-height: 2;
                     border-radius: 60px;
                     
                 }
  

`

export default Content