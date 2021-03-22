import React, { Component } from 'react'

import ReactPlayer from 'react-player'
import Duration from './duration'

class Player extends Component {
  state = {
    url: [],
    pip: false,
    playing: true,
    controls: false,
    light: false,
    volume: 0.8,
    muted: false,
    played: 0,
    loaded: 0,
    duration: 0,
    loop: false
  }

  load = url => {
    this.setState(state => {
        const url = [state.list.concat(state.url)];
        return{
            url,
            played: 0,
            loaded: 0,
            pip: false
        }
    })
  }

  handlePlayPause = () => {
    this.setState({ playing: !this.state.playing })
  }

  handleStop = () => {
    this.setState({ url: null, playing: false })
  }

  handleToggleControls = () => {
    const url = this.state.url
    this.setState({
      controls: !this.state.controls,
      url: null
    }, () => this.load(url))
  }

  handleToggleLight = () => {
    this.setState({ light: !this.state.light })
  }

  handleToggleLoop = () => {
    this.setState({ loop: !this.state.loop })
  }

  handleVolumeChange = e => {
    this.setState({ volume: parseFloat(e.target.value) })
  }

  handleToggleMuted = () => {
    this.setState({ muted: !this.state.muted })
  }

  handleTogglePIP = () => {
    this.setState({ pip: !this.state.pip })
  }

  handlePlay = () => {
    console.log('onPlay')
    this.setState({ playing: true })
  }

  handlePause = () => {
    console.log('onPause')
    this.setState({ playing: false })
  }

  handleSeekMouseDown = e => {
    this.setState({ seeking: true })
  }

  handleSeekChange = e => {
    this.setState({ played: parseFloat(e.target.value) })
  }

  handleSeekMouseUp = e => {
    this.setState({ seeking: false })
    this.player.seekTo(parseFloat(e.target.value))
  }

  handleProgress = state => {
    console.log('onProgress', state)
    // We only want to update time slider if we are not currently seeking
    if (!this.state.seeking) {
      this.setState(state)
    }
  }

  handleEnded = () => {
    console.log('onEnded')
    this.setState({ playing: this.state.loop })
  }

  handleDuration = (duration) => {
    console.log('onDuration', duration)
    this.setState({ duration })
  }


  renderLoadButton = (url, label) => {
    return (
      <button onClick={() => this.load(url)}>
        {label}
      </button>
    )
  }

  ref = player => {
    this.player = player
  }

  render () {
    const { url, playing, controls, light, volume, muted, loop, played, duration, pip } = this.state

    return (
      <div className='app'>
        
        <section className='section'>
          <div className='player-wrapper'>
            <ReactPlayer
              ref={this.ref}
              className='react-player'
              width='100%'
              height='100%'
              url={[
                'https://www.youtube.com/watch?v=oUFJJNQGwhk',
                'https://www.youtube.com/watch?v=jNgP6d9HraI'
              ]}
              pip={pip}
              playing={playing}
              controls={controls}
              light={light}
              loop={loop}
              volume={volume}
              muted={muted}
              onReady={() => console.log('onReady')}
              onStart={() => console.log('onStart')}
              onPlay={this.handlePlay}
              onEnablePIP={this.handleEnablePIP}
              onDisablePIP={this.handleDisablePIP}
              onPause={this.handlePause}
              onBuffer={() => console.log('onBuffer')}
              onSeek={e => console.log('onSeek', e)}
              onEnded={this.handleEnded}
              onError={e => console.log('onError', e)}
              onProgress={this.handleProgress}
              onDuration={this.handleDuration}
            />
          </div>

          <table>
            <tbody>

              <tr>
              </tr>
              <tr>
              </tr>
            </tbody>
          </table>
        </section>
        <section className='section'>
          <table>
            <tbody>
              <tr>
                <th>YouTube</th>
                <td>
                  {this.renderLoadButton('https://www.youtube.com/watch?v=oUFJJNQGwhk', 'Test A')}
                  {this.renderLoadButton('https://www.youtube.com/watch?v=jNgP6d9HraI', 'Test B')}
                  {this.renderLoadButton('https://www.youtube.com/playlist?list=PLogRWNZ498ETeQNYrOlqikEML3bKJcdcx', 'Playlist')}
                </td>
              </tr>
              <tr>
                <th>SoundCloud</th>
                <td>
                  {this.renderLoadButton('https://soundcloud.com/miami-nights-1984/accelerated', 'Test A')}
                  {this.renderLoadButton('https://soundcloud.com/tycho/tycho-awake', 'Test B')}
                  {this.renderLoadButton('https://soundcloud.com/yunghog/sets/doperaptraxxx', 'Playlist')}
                </td>
              </tr>
              <tr>
                <th>Custom URL</th>
                <td>
                  <input ref={input => { this.urlInput = input }} type='text' placeholder='Enter URL' />
                  <button onClick={() => this.setState({ url: this.urlInput.value })}>Load</button>
                </td>
              </tr>
            </tbody>
          </table>

        </section>
        <div className='customPlayer'>
          <h1>My Player</h1>
          <input
                    type='range' min={0} max={0.999999} step='any'
                    value={played}
                    onMouseDown={this.handleSeekMouseDown}
                    onChange={this.handleSeekChange}
                    onMouseUp={this.handleSeekMouseUp}
                  />
          <button onClick={this.handlePlayPause}>{playing ? 'Pause' : 'Play'}</button>
          <button onClick={this.handleStop}>Stop</button>
                <h4><Duration seconds={duration * played}/> / <Duration seconds={duration} /> </h4>
            <th>Volume</th>
            <td>
                <input type='range' min={0} max={1} step='any' value={volume} onChange={this.handleVolumeChange} />
            </td>
          </div>   
        </div>
    )
  }
}

export default Player
