const App = class
{
  #root
  #app_root
  #active_directory
  #config

  constructor (props)
  {
    this.#root = props.root
    this.#app_root = __dirname
    this.#config = require (`${this.#app_root}/config.json`)
    this.#active_directory = require (`${this.#app_root}/ad`)
  }
  activeDirectory (props)
  {
    return this.ad = new this.#active_directory ()
  }
}

module.exports = App