import PropTypes from 'prop-types'

export const Clock = (props) => {
  const minutes = Number.parseInt(props.time / 60)
  const seconds = Number.parseInt(props.time % 60)
  const clock =
    (minutes.toString().length === 1 ? '0' + minutes : minutes) +
    ':' +
    (seconds.toString().length === 1 ? '0' + seconds : seconds)
  return clock
}

Clock.propTypes = {
  time: PropTypes.number
}
