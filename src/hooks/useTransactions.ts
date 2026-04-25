import { useState, useEffect } from 'react';
import { Transaction } from '../types';
import * as storage from '../services/storageService';

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = () => {
    setTransactions(storage.getTransactions().sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    ));
    setLoading(false);
  };

  useEffect(() => {
    storage.seedMockData(); // Just for demo
    refresh();
  }, []);

  const addTransaction = (t: Omit<Transaction, 'id'>) => {
    const newTransaction = { ...t, id: Math.random().toString(36).substr(2, 9) };
    storage.saveTransaction(newTransaction);
    refresh();
  };

  const removeTransaction = (id: string) => {
    storage.deleteTransaction(id);
    refresh();
  };

  return { transactions, loading, addTransaction, removeTransaction, refresh };
}
