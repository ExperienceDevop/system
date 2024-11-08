const root = __dirname
const config = require (`${root}/config.json`)
const index = config.index
const App = require (`${root}/${index.app_mod}`)

const app = new App ({root})
const fileSystem = app.activeDirectory (`${root}${index.active_directory}`)

console.dir (app, {depth: 10})