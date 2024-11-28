import { execSync } from 'node:child_process'
import request from 'supertest'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { app } from '../src/app'

describe('Transactions routes', () => {

  beforeAll(async () => {
    await app.ready()
  })
  
  afterAll( async () => {
    await app.close()
  })

  beforeEach(() => {
    execSync('bun run knex migrate:rollback --all')
    execSync('bun run knex migrate:latest')
  })
  
  it('should be able to create a transaction', async () => {
    await request(app.server).post('/transactions').send({
      title: 'New transaction',
      amount: 1000,
      type: 'credit',
    }).expect(201)
  })

  it('should be able to list all transactions', async () => {
    const createTransactionResponse = await request(app.server).post('/transactions').send({
      title: 'New transaction',
      amount: 1000,
      type: 'credit',
    })

    const cookies = createTransactionResponse.get('Set-Cookie')

    const listTransactionsResponse = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies || [])
      .expect(200)

    expect(listTransactionsResponse.body.transactions).toEqual([
      expect.objectContaining({
        title: 'New transaction',
        amount: 1000,
      }),
    ])
  })

  it('should be able to get a specific transaction', async () => {
    const createTransactionResponse = await request(app.server).post('/transactions').send({
      title: 'New transaction',
      amount: 1000,
      type: 'credit',
    })

    const cookies = createTransactionResponse.get('Set-Cookie')

    const listTransactionsResponse = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies || [])
      .expect(200)

    const transactionId = listTransactionsResponse.body.transactions[0].id

    const getTransactionResponse = await request(app.server)
      .get(`/transactions/${transactionId}`)
      .set('Cookie', cookies || [])
      .expect(200)

    expect(getTransactionResponse.body.transaction).toEqual(
      expect.objectContaining({
        title: 'New transaction',
        amount: 1000,
      }),
    )
  })

  it('should be able to get the summary', async () => {
    const createTransactionResponse = await request(app.server).post('/transactions').send({
      title: 'New transaction',
      amount: 5000,
      type: 'credit',
    })

    const cookies = createTransactionResponse.get('Set-Cookie')

    await request(app.server).post('/transactions').set('Cookie', cookies || []).send({
      title: 'New transaction',
      amount: 2000,
      type: 'debit',
    })

    const summaryResponse = await request(app.server)
      .get('/transactions/summary')
      .set('Cookie', cookies || [])
      .expect(200)

    expect(summaryResponse.body.summary).toEqual({
      amount: 3000,
    })
  })

})

