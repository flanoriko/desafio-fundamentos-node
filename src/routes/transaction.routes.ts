import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
import Transaction from '../models/Transaction';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

interface Response {
  transactions: Transaction;
  balance: {
    income: number;
    outcome: number;
    total: number;
  }
}

transactionRouter.get('/', (request, response) => {
  try {
    const transactions = transactionsRepository.all();
    const balance = transactionsRepository.getBalance();
    const concatResult = { transactions, balance };


    return response.json(concatResult);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const { title, value, type } = request.body;
    const createTransactionService = new CreateTransactionService(transactionsRepository);
    const newTransaction = createTransactionService.execute({ title, value, type });
    return response.json(newTransaction);

  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
