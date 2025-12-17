import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()

const isProd = process.env.NODE_ENV === 'production'
const base = process.env.BASE || '/'

let vite
if (!isProd) {
    const { createServer } = await import('vite')
    vite = await createServer({
        server: { middlewareMode: true },
        appType: 'custom',
        base
    })
    app.use(vite.middlewares)
} else {
    const compression = (await import('compression')).default
    const serveStatic = (await import('serve-static')).default
    app.use(compression())
    app.use(base, serveStatic(path.resolve(__dirname, 'dist/client'), {
        index: false
    }))
}


// Serve HTML
app.use(async (req, res, next) => {
    try {
        const url = req.originalUrl.replace(base, '/')

        let template
        if (!isProd) {
            // Development: Skip SSR, serve empty shell for client-side rendering
            template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8')
            template = await vite.transformIndexHtml(url, template)

            // Send template without SSR - client will fetch data
            res.status(200).set({ 'Content-Type': 'text/html' }).end(template)
        } else {
            // Production: Full SSR with data injection
            template = fs.readFileSync(path.resolve(__dirname, 'dist/client/index.html'), 'utf-8')
            const render = (await import('./dist/server/entry-server.js')).render

            const { html: appHtml, head } = await render(url)

            let html = template.replace(`<!--ssr-outlet-->`, appHtml)
            if (head) {
                html = html.replace(`<!--ssr-head-->`, head)
            }

            res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
        }
    } catch (e) {
        vite?.ssrFixStacktrace(e)
        console.log(e.stack)
        res.status(500).end(e.stack)
    }
})

export default app
