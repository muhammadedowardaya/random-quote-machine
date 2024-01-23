import { createSlice } from '@reduxjs/toolkit';
import { getRandomQuote } from './actions';
import quotes from '../../utils/quotes';

const quotesSlice = createSlice({
	name: 'quotes',
	initialState: {
		data: null,
		status: 'idle',
		error: null,
		quoteNumber: 0,
		quoteOffline: quotes[0],
	},
	reducers: {
		getRandomQuoteOffline: (state) => {
			if (quotes.length > 0) {
				if (quotes.length - 1 > state.quoteNumber) {
					state.quoteNumber += 1;
				} else {
					state.quoteNumber = 0;
				}
				if (quotes[state.quoteNumber] !== undefined) {
					state.quoteOffline = quotes[state.quoteNumber];
				}
			}
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getRandomQuote.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(getRandomQuote.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.data = action.payload;
			})
			.addCase(getRandomQuote.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			});
	},
});

export const { getRandomQuoteOffline } = quotesSlice.actions;

export default quotesSlice.reducer;
