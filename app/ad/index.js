const { threadId } = require('worker_threads')

const ActiveDirectory = class{
  #path
  #fs
  constructor (path)
  {
    this.#fs = require ('fs')
    this.#path = require ('path')

    this.fs = []
    this.count = 0
    this.Result = []

    this.#map (path, this.fs)
  }
  #map (path, obj)
  {
    if (this.#fs.existsSync (path))
    {
      const temp = {}
      temp.name = this.#path.parse (path).name
      temp.dir = this.#path.parse (path).dir
      temp.base = this.#path.parse (path).base
      temp.root = this.#path.parse (path).root
      temp.path = path
      temp.id = this.count
      this.count ++

      if (this.#fs.statSync (temp.path).isFile ())
      {
        temp.ext = this.#path.parse (path).ext
        temp.type = "file"

        obj.push (temp)
      }
      else if (this.#fs.statSync (temp.path).isDirectory ())
      {
        temp.type = "directory"
        
        if (this.#fs.readdirSync (temp.path) != "")
        {
          const contentFileNames = this.#fs.readdirSync (temp.path)
          const contentPaths = []
          temp.content = []

          for (let x in contentFileNames)
          {
            contentPaths.push (`${temp.path}/${contentFileNames[x]}`)
          }

          obj[temp.id] = temp

          for (let x in contentPaths)
          {
            this.#map (contentPaths[x], obj[temp.id].content)
          }
        }
        else
        {
          obj[temp.id] = temp
          temp.content = "empty"
        }
      }
      else
      {
        console.log ("Type: N/A")
      }
    }
    else
   {
      console.log ("Exist: no")
    }
  }
  query (prop)
  {
    const query = {
      attribute: prop.attribute,
      value: prop.value,
      get: prop.get,
      recur: prop.recur
    }
    this.#get (query, this.fs)
  }
  #get (query, obj)
  {
    for (let x in obj)
    {
      for (let y in obj[x])
      {
        if (query.attribute == y)
        {
          if (obj[x][y] == query.value)
          {
            query.result = {}
            for (let z in query.get)
            {
              query.result[query.get[z]] = obj[x][query.get[z]]
            }
            this.Result.push (query.result)
          }
        }
      }
      this.#get (
      query,
      obj[x].content
      )
    }
  }
}
  module.exports = ActiveDirectory