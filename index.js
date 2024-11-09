const root = __dirname
const config = require (`${root}/config.json`)
const index = config.index
const App = require (`${root}/${index.app_mod}`)

const app = new App ({root})
const fileSystem = app.activeDirectory (`${root}${index.active_directory}`)

fileSystem.query (
{
  attribute: "name",
  recur: 1,
  value: "index",
  get : ["name", "path", "id"]
})

console.dir (app, {depth: 10})