// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {isTrue: true, timeInMinute: 25, timeInSeconds: 0}

  componentWillUnmount() {
    clearInterval(this.intervalId)
  }

  onReset = () => {
    const {isTrue, timeInMinute, timeInSeconds} = this.state
    console.log(isTrue)
    console.log(timeInMinute)
    console.log(timeInSeconds)
    this.setState({isTrue: true})
    clearInterval(this.intervalId)
    this.setState({timeInMinute: 25})
    this.setState({timeInSeconds: 0})
  }

  getTimeAndMinutes = () => {
    const {timeInMinute, timeInSeconds} = this.state
    const totalRemainingSeconds = timeInMinute * 60 - timeInSeconds
    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  getStartAndPauseIcon = () => {
    const {isTrue, timeInMinute, timeInSeconds} = this.state
    const isTimerCompleted = timeInSeconds === timeInMinute * 60
    if (isTimerCompleted) {
      this.setState({timeInSeconds: 0})
    }
    if (isTrue) {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    } else {
      clearInterval(this.intervalId)
    }
    this.setState(prevState => ({isTrue: !prevState.isTrue}))
  }

  incrementTimeElapsedInSeconds = () => {
    const {isTrue, timeInMinute, timeInSeconds} = this.state
    const isTimerCompleted = timeInSeconds === timeInMinute * 60
    console.log(timeInMinute)
    console.log(isTrue)
    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({isTrue: true})
    } else {
      this.setState(prevState => ({
        timeInSeconds: prevState.timeInSeconds + 1,
      }))
    }
  }

  onIncrement = () => {
    const {timeInMinute} = this.state
    console.log(timeInMinute)
    this.setState(prevState => ({timeInMinute: prevState.timeInMinute + 1}))
  }

  onDecrement = () => {
    const {timeInMinute} = this.state
    if (timeInMinute > 1) {
      this.setState(prevState => ({timeInMinute: prevState.timeInMinute - 1}))
    }
  }

  render() {
    const {isTrue, timeInMinute, timeInSeconds} = this.state
    console.log(timeInSeconds)
    const imageUrl = isTrue
      ? 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
    const altText = isTrue ? 'play icon' : 'pause icon'
    const text = isTrue ? 'Start' : 'Pause'
    const status = !isTrue ? 'Running' : 'Paused'
    const isDisabled = timeInSeconds > 0
    return (
      <div className="bg-container">
        <h1>Digital Timer</h1>
        <div className="container1">
          <div className="arrange">
            <div className="con1">
              <div className="para1">
                <h1 className="kavya">{this.getTimeAndMinutes()}</h1>
                <p className="p1">{status}</p>
              </div>
            </div>
          </div>
          <div className="div-container">
            <div className="con2">
              <div className="con">
                <img className="image1" src={imageUrl} alt={altText} />

                <button
                  type="button"
                  className="p2"
                  onClick={this.getStartAndPauseIcon}
                >
                  {text}
                </button>
              </div>
              <div className="con">
                <img
                  className="image1"
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                />

                <button type="button" className="p2" onClick={this.onReset}>
                  Reset
                </button>
              </div>
            </div>
            <p className="p3">Set Timer Limit</p>
            <div className="con3">
              <button
                className="btn1"
                disabled={isDisabled}
                type="button"
                onClick={this.onDecrement}
              >
                -
              </button>
              <p className="p4">{timeInMinute}</p>
              <button
                disabled={isDisabled}
                className="btn1"
                type="button"
                onClick={this.onIncrement}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
