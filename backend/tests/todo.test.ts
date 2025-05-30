// import { Hono } from 'hono'
// import { afterAll, beforeAll, describe, expect, it } from 'vitest'
// import { createServer } from 'http'
// import { fetch } from 'undici'
// import { app } from '../src/index.js'



// let server: any
// let url: string

// beforeAll(async () => {
//   server = createServer((req, res) => app.fetch(req, {
//     headers: req.headers,
//     method: req.method,
//     body: req,
//     url: req.url,
//   }).then(res2 => {
//     res.writeHead(res2.status, Object.fromEntries(res2.headers.entries()))
//     res.end(res2.body)
//   }))
//   await new Promise<void>((resolve) => {
//     server.listen(3001, resolve)
//   })
//   url = 'http://localhost:3001'
// })

// afterAll(() => {
//   server.close()
// })

// describe('TODO API', () => {
//   it('should return hello on /me/list', async () => {
//     const res = await fetch(`${url}/me/list`)
//     expect(res.status).toBe(200)
//   })

//   // More tests ...
// })
