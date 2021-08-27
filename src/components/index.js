/* eslint-disable prettier/prettier */
/** @jsx jsx */
import React, { createContext, useEffect, useReducer, useRef } from 'react'
import { css, jsx } from '@emotion/core'
import { initialState, reducer } from '../reducers'

//import Topbar from './Topbar'
import Sidebar from './Sidebar'
import Content from './Content'
import Playbar from './Playbar'
//import Search from './Search'

export const StoreContext = createContext(null)

const MusicPlayer = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const audioRef = useRef()

  useEffect(() => {
    if (state.playing) {
      audioRef.current.load()
      audioRef.current.play()
    } else {
      audioRef.current.pause()
    }
  }, [state.playing, state.currentSongId])

  useEffect(() => {
    audioRef.current.volume = state.volume
  }, [state.volume])

  

  useEffect(() => {
    audioRef.current.currentTime = state.currentTime
  }, [state.currentTime])



  //console.log(audioRef);
  
  const song = state.media[state.currentSongId]

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      <div css={CSS}>
       {/*  <Topbar /> */}
        <Sidebar />
        <Content />
        <Playbar />
       
        <audio
          ref={audioRef}
          src={
            song && song.title
              ? `./media/${song.title} - ${song.artist}.mp3`
              : ''
          }
          onLoadedMetadata={() =>
            dispatch({
              type: 'SET_DURATION',
              duration: audioRef.current.duration
            })
          }
          onTimeUpdate={e =>
            dispatch({ type: 'SET_CURRENT_TIME', time: e.target.currentTime })
          }
          onEnded={() =>
            dispatch({
              type: 'SET_NEXT'
            })
          }
          
        />
      </div>
    </StoreContext.Provider>
  )
}

const CSS = css`
  height: 100%;
  width: 100%;
  display: flex;
  position: relative;
  color: white;
`

export default MusicPlayer