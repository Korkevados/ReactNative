/** @format */

import { createContext, useReducer } from "react";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "זוג נעליים",
    amount: 59.99,
    date: new Date("2024-08-14"),
  },
  {
    id: "e2",
    description: "זוג משקפיים",
    amount: 29.99,
    date: new Date("2024-08-15"),
  },
  {
    id: "e3",
    description: "בננות",
    amount: 5.99,
    date: new Date("2024-08-13"),
  },
  {
    id: "e4",
    description: "ספר 1",
    amount: 14.99,
    date: new Date("2024-08-11"),
  },
  {
    id: "e5",
    description: "ספר 2",
    amount: 18.59,
    date: new Date("2024-08-12"),
  },
  {
    id: "e6",
    description: "מחשב נייד",
    amount: 559.99,
    date: new Date("2024-08-02"),
  },
  {
    id: "e7",
    description: "אייפון",
    amount: 429.99,
    date: new Date("2024-08-01"),
  },
  {
    id: "e8",
    description: "תפוחים",
    amount: 15.99,
    date: new Date("2024-08-13"),
  },
  {
    id: "e9",
    description: "קורס",
    amount: 144.99,
    date: new Date("2024-08-11"),
  },
  {
    id: "e10",
    description: "חומר טוב",
    amount: 138.59,
    date: new Date("2024-08-12"),
  },
];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random.toString();
      return [{ ...action.payload, id: id }, ...state];
    case "UPDATE":
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updateableExpense = state[updatableExpenseIndex];
      const updateitem = { ...updateableExpense, ...action.payload.data };
      const updateExpenses = [...state];
      updateExpenses[updatableExpenseIndex] = updateitem;
      return updateExpenses;
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
}

function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  function addExpense(expenseData) {
    dispatch({ type: "ADD", payload: expenseData });
  }

  function deleteExpense(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
  }

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;
