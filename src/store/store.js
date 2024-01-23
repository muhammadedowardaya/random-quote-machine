import { configureStore } from '@reduxjs/toolkit';
import quoteReducer from '../features/quotes/reducer';
import themeReducer from '../features/theme/reducer';

const store = configureStore({
	reducer: {
		quote: quoteReducer,
		theme: themeReducer,
		// Add other reducers here if needed
	},
});

export { store };
