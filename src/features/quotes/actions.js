import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

export const getRandomQuote = createAsyncThunk(
	'quotes/getRandomQuote',
	async () => {
		return await api.getRandomQuote();
	}
);
