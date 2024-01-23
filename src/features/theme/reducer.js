import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
	name: 'theme',
	initialState: {
		color: 1,
	},
	reducers: {
		incrementColor: (state) => {
			if (state.color < 10) {
				state.color += 1;
			} else {
				state.color = 1;
			}
		},
	},
});

export const { incrementColor } = themeSlice.actions;
export default themeSlice.reducer;
