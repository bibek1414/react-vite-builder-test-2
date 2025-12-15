import { app } from './server.js'

const port = process.env.PORT || 5173

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
