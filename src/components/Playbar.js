/** @jsx jsx */
import React, { useContext, useCallback } from 'react'
import { css, jsx } from '@emotion/core'
import { StoreContext } from './index'
import logo from '../img/logo10.png'

const formatTime = inputSeconds => {
  let seconds = Math.floor(inputSeconds % 60)
  if (seconds < 10) seconds = `0${seconds}`

  const minutes = Math.floor(inputSeconds / 60)

  return `${minutes}:${seconds}`
}

const Playbar = () => {
  const { state, dispatch } = useContext(StoreContext)
  const song = state.media[state.currentSongId]

  if (!song) {
    return <div className="Playbar" css={CSS} />
  }

  const playOrPause = (e =>
    state.playing ? dispatch({ type: 'PAUSE'}) : dispatch({ type: 'PLAY' })
  )

  const setVolume = useCallback(e =>
    dispatch({ type: 'SET_VOLUME', volume: e.target.value })
  )

  const setTime = useCallback(e =>
    dispatch({ type: 'SET_CURRENT_TIME', time: e.target.value })
  )

  const setNext = useCallback(e =>
    dispatch({ type: 'SET_NEXT' })
  )

  const setPrev = useCallback(e =>
    dispatch({ type: 'SET_PREV' })
  )


  return (
    <div className="Playbar" css={CSS}>
      
      <div className="left">
        <img src={logo} style={{borderRadius:70}}/>
        {song && (
          <>
            <div>{song.title}</div>

            <div className="artist">{song.artist}</div>
          </>
        )}
      </div>

      <div className="middle">
        <div className="play-icon">
            <div className="loop-icon" >
              <i className={'fa fa-retweet'} />
            </div>
            <div className="backward-icon" >
              <i className={'fa fa-step-backward'} onClick={setPrev}/>
            </div>
            <div className="play-pause-circle" onClick={playOrPause}>
              <i
                className={`fa fa-${state.playing ? 'pause' : 'play'}`}
                style={{ transform: state.playing ? '' : 'translateX(1.5px)' }}
              />
            </div>
            <div className="forward-icon" >
              <i className={'fa fa-step-forward'} onClick={setNext}/>
            </div>
            <div className="shuffle-icon" >
              <i className={'fa fa-random'} />
            </div>
        </div>
        <div style={{ marginTop: 2.5, display: "inline-flex" }}>
          <span style={{ marginTop: 2.5}}>{formatTime(Math.floor(state.currentTime))}</span>
          <div className="progress_bar">
          <input
          min="0"
          type="range"
          max={Math.floor(state.duration)}
          value={Math.floor(state.currentTime)}
          onChange={setTime}
        />
        </div>
          <span style={{ marginTop: 2.5}}>{formatTime(state.duration)}</span>
        </div>
      </div>

      <div className="right">
        <i className="fa fa-volume-up" />

        <input
          type="range"
          min="0"
          max="1"
          value={state.volume}
          step="0.01"
          style={{ marginLeft: 10 }}
          onChange={setVolume}
        />
      </div>
    </div>
  )
}

const CSS = css`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80px;
  background:linear-gradient(#000000,#000e34);
  z-index: 99;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .left {
    width: 300px;

    .artist {
      font-size: 14px;
      color: '#999999';
      margin-top: 5px;
    }
  }


  .middle {
    display: flex;
    flex-direction: column;
    align-items: center;

    .fa-play,
    .fa-pause {
      font-size: 14px;
    }
    .play-icon{
      display: flex;

      .loop-icon{
        font-size: 19px;
        width: 55px;
        height: 35px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        cursor: pointer;
      }

      .backward-icon{
        font-size: 22px;
        width: 35px;
        height: 35px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        cursor: pointer;
      }

      .play-pause-circle {
        width: 35px;
        height: 35px;
        border: 1px solid white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }

      .forward-icon{
        font-size: 20px;
        width: 35px;
        height: 35px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        cursor: pointer;
      }

      .shuffle-icon{
        font-size: 19px;
        width: 55px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        cursor: pointer;
      }

    }

    .progress_bar input{
      width:600px;
      display:inline-flex;
      height: 3px;
      position: relative;
      margin: 0px 10px 15px 10px;
      //padding-bottom:5px;
      cursor:pointer;

    }
  }

  .right {
    .fa-volume-up,
    .fa-volume-off {
      font-size: 20px;
    }
  }

  img {
    height: 50px;
    width:50px;
    margin-right: 20px;
    margin-top: 0px;
    padding-left: 0px;
    float: left;
  }

  

`

export default Playbar