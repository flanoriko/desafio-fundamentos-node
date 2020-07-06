import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];


  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {

    var totalIncome = 0;
    var totalOutcome = 0;
    var total = 0;

    function somar(value: number, type: 'income' | 'outcome') {
      if (type === "income") {
        totalIncome = totalIncome + value;
      }
      else {
        if (type === "outcome") {
          totalOutcome = totalOutcome + value;
        }
      }
      total = totalIncome - totalOutcome;
    }
    this.transactions.forEach(trans => somar(trans.value, trans.type));
    const balance: Balance = { income: totalIncome, outcome: totalOutcome, total: total };

    return balance;

  }

  public create(title: string, value: number, type: 'income' | 'outcome'): Transaction {
    const transaction = new Transaction({ title, value, type });
    const balance =  this.getBalance();

    if (type ==="outcome" && balance.total - value < 0)
    {
      throw Error ('Valor extrapola o saldo');
    }

    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
