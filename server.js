import express from 'express'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

export const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const isProd = process.env.NODE_ENV === 'production'
const clientDist = path.resolve(__dirname, 'dist/client')
const serverDist = path.resolve(__dirname, 'dist/server')

/* 1️⃣ Serve static assets FIRST */
if (isProd) {
    app.use(express.static(clientDist))
}

/* 2️⃣ SSR ONLY for non-asset routes */
app.get(/^(?!\/assets\/).*/, async (req, res) => {
    try {
        const template = fs.readFileSync(
            path.join(clientDist, 'index.html'),
            'utf-8'
        )

        const { render } = await import(
            path.join(serverDist, 'entry-server.js')
        )

        const appHtml = render()

        const html = template.replace(
            '<!--app-html-->',
            appHtml
        )

        res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
        console.error(e)
        res.status(500).end('Internal Server Error')
    }
})
