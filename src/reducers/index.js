import media from '../media.json'

const DEFAULT_PLAYLIST = 'home'
const DEFAULT_VOLUME = 0.65

export const initialState = {
  media,
  addToPlaylistId: '',
  currentPlaylist: DEFAULT_PLAYLIST,
  currentSongId: '',
  currentTime: 0,
  duration: 0,
  playing: false,
  playlists: {
    home: new Set(media.ids),
    favorites: new Set()
  },
  volume: DEFAULT_VOLUME
}


export const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_PLAYLIST':
      return {
        ...state,
        playlists: { ...state.playlists, [action.playlist]: new Set() }
      }
    case 'ADD_TO_PLAYLIST':
      return { ...state, addToPlaylistId: action.songId }
    case 'ABORT_ADD_TO_PLAYLIST':
      return { ...state, addToPlaylistId: '' }
    case 'ADD_FAVORITE':
      state.playlists.favorites.add(action.songId)
      return { ...state }
    case 'PLAY':
      return {
        ...state,
        playing: true,
        currentSongId: action.songId || state.currentSongId
      }
    case 'PAUSE':
      return { ...state, playing: false }
    case 'REMOVE_FAVORITE':
      state.playlists.favorites.delete(action.songId)
      return { ...state }
    case 'SAVE_TO_PLAYLIST':
      state.playlists[action.playlist].add(state.addToPlaylistId)
      return { ...state, addToPlaylistId: '' }
    case 'SET_CURRENT_TIME':
      return { ...state, currentTime: action.time}
    case 'SET_DURATION':
      return { ...state, duration: action.duration }
    case 'SET_NEXT':
      var iterator1 = state.playlists[state.currentPlaylist][Symbol.iterator]()
      for (const item of state.playlists[state.currentPlaylist].values()){
        
        if(state.currentSongId == item) {
          //iterator1.next()
          iterator1.next()
          break
        }
        else{
          iterator1.next()
        }
      }
      var iterator2=iterator1.next()
      if(iterator2.done)
        var  iterator2=state.playlists[state.currentPlaylist][Symbol.iterator]().next()
      return { ...state, currentSongId: iterator2.value }
      case 'SET_PREV':
        var iterator1 = state.playlists[state.currentPlaylist][Symbol.iterator]()
        var prev=0
        for (const item of state.playlists[state.currentPlaylist].values()){
          
          if(state.currentSongId == item) {
            break
          }
          prev=iterator1.next().value
        }
        if(prev==0){
          for (const itemnew of state.playlists[state.currentPlaylist].values())
          var prev=itemnew
        }
        return { ...state, currentSongId: prev }
    case 'SET_PLAYLIST':
      return { ...state, currentPlaylist: action.playlist }
    case 'SET_VOLUME':
      return { ...state, volume: parseFloat(action.volume) }
  }

  return state
}
