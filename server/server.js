import dotenv from 'dotenv'
import { fileURLToPath } from 'node:url'
import { createApp } from './app.js'
import { connectDatabase } from './config/db.js'

dotenv.config({ path: fileURLToPath(new URL('./.env', import.meta.url)) })

const PORT = Number(process.env.PORT) || 5000
const app = createApp()

app.listen(PORT, () => {
  console.log(`Cynbit Smart Inquiry API listening on port ${PORT}.`)
  void connectDatabase()
})
