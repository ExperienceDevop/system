const root = __dirname
const config = require (`${root}/config.json`)
const index = config.index
const App = require (`${root}/${index.app_mod}`)

const app = new App ({root})
const FileSystem = app.activeDirectory (root)

console.log (app)