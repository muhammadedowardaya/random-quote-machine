import React from 'react';
import './styles/App.css';
import { useDispatch, useSelector } from 'react-redux';
import { getRandomQuote } from './features/quotes/actions';
import { updateRootTheme } from './utils/themeManajer';
import { incrementColor } from './features/theme/reducer';

import { FaQuoteLeft } from 'react-icons/fa6';
import {
	changeLanguage,
	getRandomQuoteOffline,
} from './features/quotes/reducer';

function App() {
	const [isOnline, setIsOnline] = React.useState(navigator.onLine);

	const theme = useSelector((state) => state.theme);
	const quoteOnline = useSelector((state) => state.quote.data);
	const quoteOffline = useSelector((state) => state.quote.quoteOffline);
	const status = useSelector((state) => state.quote.status);
	const quoteNumber = useSelector((state) => state.quote.quoteNumber);
	const language = useSelector((state) => state.quote.language);

	const dispatch = useDispatch();
	const textRef = React.useRef(null);
	const authorRef = React.useRef(null);

	React.useEffect(() => {
		const handleOnline = () => {
			setIsOnline(true);
		};
		const handleOffline = () => {
			setIsOnline(false);
		};
		window.addEventListener('online', handleOnline);
		window.addEventListener('offline', handleOffline);

		return () => {
			window.removeEventListener('online', handleOnline);
			window.removeEventListener('offline', handleOffline);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	React.useEffect(() => {
		if (language === 'EN') {
			dispatch(getRandomQuote());
		} else if (language === 'ID') {
			dispatch(getRandomQuoteOffline());
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isOnline]);

	const updateClasses = () => {
		if (textRef.current && authorRef.current) {
			if (status !== 'succeeded') {
				textRef.current.classList.remove('fadein');
				authorRef.current.classList.remove('fadein');
			} else {
				textRef.current.classList.add('fadein');
				authorRef.current.classList.add('fadein');
			}
		}
	};

	React.useEffect(() => {
		updateClasses();
		if (isOnline) {
			if (status === 'succeeded') {
				updateRootTheme(theme.color);
			}
		} else {
			updateRootTheme(theme.color);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [status, quoteNumber]);

	const newQuoteHandler = () => {
		if (isOnline && language === 'EN') {
			dispatch(getRandomQuote());
		} else {
			dispatch(getRandomQuoteOffline());
		}
		dispatch(incrementColor());
	};

	const changeLanguageHandler = () => {
		if (isOnline) {
			dispatch(changeLanguage());
		} else {
			alert('Please check your internet :)');
		}
	};

	let quoteOnlineResult = '';
	let quoteOfflineResult = '';

	if (isOnline === true && quoteOnline !== null && language === 'EN') {
		quoteOnlineResult = quoteOnline;
	}

	if (
		(isOnline === false && quoteOffline !== null && language === 'ID') ||
		language === 'ID'
	) {
		quoteOfflineResult = quoteOffline;
	}

	return (
		<div id="quote-box">
			<div id="text" ref={textRef}>
				<FaQuoteLeft className="quote-icon" />
				{quoteOnlineResult.quote}
				{quoteOfflineResult.quote}
			</div>
			<div id="author" ref={authorRef}>
				{isOnline === true && quoteOnline !== null && language === 'EN'
					? `- ${quoteOnline.author}`
					: ''}
				{(isOnline === false && language === 'ID') || language === 'ID'
					? `- ${quoteOffline.author}`
					: ''}
			</div>
			<div className="quote-box__action">
				<a
					href="https://twitter.com/intent/tweet"
					target="_top"
					id="tweet-quote"
					className="btn"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						fill="currentColor"
						className="bi bi-twitter-x"
						viewBox="0 0 16 16"
					>
						<path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
					</svg>
				</a>
				<div id="language" onClick={changeLanguageHandler}>
					Version : {language === 'ID' ? 'EN' : 'ID'}
				</div>
				<button
					id="new-quote"
					onClick={newQuoteHandler}
					className="btn"
					disabled={
						(status === 'succeeded' && isOnline === true) || isOnline === false
							? false
							: true
					}
				>
					New Quotes
				</button>
			</div>
		</div>
	);
}

export default App;
