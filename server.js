// server.js
import express from 'express'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const isProd = process.env.NODE_ENV === 'production'

export async function createApp() {
    const app = express()
    let vite

    if (!isProd) {
        const { createServer: createViteServer } = await import('vite')
        vite = await createViteServer({
            server: { middlewareMode: true },
            appType: 'custom'
        })

        app.use(vite.middlewares)
    } else {
        const clientDist = path.resolve(__dirname, 'dist/client')
        app.use(express.static(clientDist, { index: false }))
    }

    app.use('*', async (req, res) => {
        const url = req.originalUrl

        try {
            let template, render

            if (!isProd) {
                template = fs.readFileSync(
                    path.resolve(__dirname, 'index.html'),
                    'utf-8'
                )

                template = await vite.transformIndexHtml(url, template)
                render = (await vite.ssrLoadModule('/src/entry-server.tsx')).render
            } else {
                template = fs.readFileSync(
                    path.resolve(__dirname, 'dist/client/index.html'),
                    'utf-8'
                )

                render = (await import('./dist/server/entry-server.js')).render
            }

            const appHtml = render(url)
            const html = template.replace('<!--app-html-->', appHtml)

            res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
        } catch (e) {
            vite?.ssrFixStacktrace(e)
            console.error(e)
            res.status(500).end(e.message)
        }
    })

    return app
}
