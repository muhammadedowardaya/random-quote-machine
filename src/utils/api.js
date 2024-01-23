const api = (() => {
    const BASE_URL = 'https://api.api-ninjas.com/v1/quotes';
	const apiKey = 'I4S49NfswBwke5MYeDTW7w==IjMWqQyxTA0Wn0Tj';
	const options = {
		method: 'GET',
		headers: {
			'X-Api-Key': apiKey,
			'Content-Type': 'application/json',
		},
	};

	const getRandomQuote = async () => {
		try {
			const response = await fetch(BASE_URL, options);
			const result = await response.json();
			return result[0];
		} catch (error) {
			console.error(error);
		}
	};

    return {
        getRandomQuote
    }
})()

export default api;