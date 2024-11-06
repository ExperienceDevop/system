const ActiveDirectory = class
{
  constructor (root)
  {
    this.counter = 0

    this.#map (root, this, this.counter)
  }
  #map (root, obj, counter)
  {
    obj[this.counter] = 2
  }
}

module.exports = ActiveDirectory