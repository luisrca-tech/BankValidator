import type { FastifyInstance } from 'fastify'
import { randomUUID } from 'node:crypto'
import { z } from 'zod'
import { db } from '../database'
import { checkSessionIdExists } from '../middleware/check-session-id-exists'

export async function transactionsRoutes(app: FastifyInstance) {
  app.get('/', { preHandler: [checkSessionIdExists] }, async (__request, reply) => {
    const {sessionId} = __request.cookies

    const transactions = await db('transactions').where('session_id', sessionId).select()


    return reply.status(200).send({ transactions })
  })

  app.get('/:id', { preHandler: [checkSessionIdExists] }, async (request, reply) => {
    const getTransactionParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = getTransactionParamsSchema.parse(request.params)
    const { sessionId } = request.cookies

    const transaction = await db('transactions').where({
      id,
      session_id: sessionId,
    }).first()

    return reply.status(200).send({ transaction })
  })

  app.get('/summary', { preHandler: [checkSessionIdExists] }, async (_request, reply) => {
    const { sessionId } = _request.cookies

    const summary = await db('transactions').sum('amount', { as: 'amount' }).where('session_id', sessionId).first()

    return reply.status(200).send({ summary })
  })


  app.post('/', async (request, reply) => {
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    })

    const { title, amount, type } = createTransactionBodySchema.parse(
      request.body,
    )

    let sessionId = request.cookies.sessionId

    if (!sessionId) {
      sessionId = randomUUID()

      reply.cookie('sessionId', sessionId, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      })
    }



    await db('transactions').insert({
      id: randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1,
      session_id: sessionId,
    })

    return reply.status(201).send()
  })
}
