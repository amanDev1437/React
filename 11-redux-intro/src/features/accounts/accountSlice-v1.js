import { createSlice } from "@reduxjs/toolkit";

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState: initialStateAccount,
  reducers: {
    deposit(state, action) {
      state.balance = state.balance + action.payload;
      state.isLoading = false;
    },
    withdrawl(state, action) {
      if (state.balance < action.payload) return;
      state.balance = state.balance - action.payload;
    },
    requestLoan: {
      prepare(amount, purpose) {
        return { payload: { amount, purpose } };
      },

      reducer(state, action) {
        if (state.loan > 0) return;
        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance = state.balance + action.payload.amount;
      },
    },
    payLoan(state, action) {
      if (state.balance < state.loan) return;
      state.balance = state.balance - state.loan;
      state.loan = 0;
      state.loanPurpose = "";
      
    },
    convertingCurrency(state, action){
      state.isLoading = true;
    }
  },
});

export function deposit(amount, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: amount };

  return async function (dispatch, getState) {
    dispatch({type:"account/convertingCurrency"})
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await res.json();
    const convertedAmount = data.rates.USD;
    console.log(convertedAmount)

    dispatch({ type: "account/deposit", payload: convertedAmount });
  };
}

export const { withdrawl, requestLoan, payLoan } =
  accountSlice.actions;


export default accountSlice.reducer;
