export class Timer {
  ticks = 0;
  _timer = null;
  _callback = null;
  _delay = null;

  constructor (callback = () => {}, initialTick = 0, delay = 1000) {
    this._callback = callback
    this.ticks = initialTick
    this._delay = delay
  }

  start () {
    clearInterval(this._timer)
    this._timer = setInterval(() => {
      this.ticks++
      this._callback()
    }, this._delay)
  }

  stop () {
    clearInterval(this._timer)
  }
}