import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


const app = new Hono()

app.use('/*', cors({
  origin: ['http://localhost:3000'], // Add your Next.js origin here
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  exposeHeaders: ['Content-Length', 'X-Kuma-Revision'],
  maxAge: 600,
  credentials: true
}))

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/me/list', (c) => {
  return c.text('Hello Hono!')
})

app.post('/create/todo', async (c) => {
  const body = await c.req.json()
  const { task } = body

  try {
    const todo = await prisma.todo.create({
      data: {
        task: task
      },
    })
    return c.json(todo)
  } catch (error) {
    console.error(error)
    return c.json({ error: 'Failed to create task' }, 500)
  }
})

app.get('/get/todos', async (c) => {
  try {
    const todos = await prisma.todo.findMany()
    return c.json(todos)
  } catch (error) {
    console.error(error)
    return c.json({ error: 'Failed to fetch todos' }, 500)
  }
})

app.patch('/update/task_status', async (c) => {
  const { id: task_id } = await c.req.json() // Destructure id from the body

  try {
    const todo = await prisma.todo.update({
      where: {
        id: task_id
      },
      data: {
        completed: true
      }
    })

    return c.json(todo)
  } catch (error) {
    console.error(error)
    return c.json({ error: `Failed to update todo with id ${task_id}` }, 500)
  }
})


app.delete('/delete/todo', async (c) => {
  const { task_id } = await c.req.json()

  try {
    const todo = await prisma.todo.delete({
      where: {
        id: task_id
      }
    })
    return c.json({ message: 'Todo deleted successfully', todo })
  } catch (error) {
    console.error(error)
    return c.json({ error: `Failed to delete todo with id ${task_id}` }, 500)
  }
})

if (process.env.NODE_ENV !== 'test') {
  serve({
    fetch: app.fetch,
    port: 8080
  }, (info) => {
    console.log(`Server is running on http://localhost:${info.port}`)
  })
}

export { app, prisma }