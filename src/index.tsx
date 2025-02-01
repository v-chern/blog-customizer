import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { ArticleStateType, defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {

	let currentStyle: ArticleStateType = {...defaultArticleState};

	const getCSSProps = (style: ArticleStateType) => {
		return {
			'--font-family': style.fontFamilyOption.value,
			'--font-size': style.fontSizeOption.value,
			'--font-color': style.fontColor.value,
			'--container-width': style.contentWidth.value,
			'--bg-color': style.backgroundColor.value,
		} as CSSProperties;
	};

	const [mainStyle, setMainStyle] = useState<CSSProperties>(getCSSProps(currentStyle));

	const updateStyle = (newStyle: ArticleStateType) => {
		currentStyle = newStyle;
		setMainStyle(getCSSProps(currentStyle));
	}

	return (
		<main
			className={clsx(styles.main)}
			style={mainStyle}>
			<ArticleParamsForm currentStyle={currentStyle} onSubmit={updateStyle}/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
