import { CSSProperties, useState } from 'react';

import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import { ArticleStateType, defaultArticleState } from '../../constants/articleProps';

import styles from './App.module.scss';

export const App = () => {

	const getCSSProps = (style: ArticleStateType) => {
		return {
			'--font-family': style.fontFamilyOption.value,
			'--font-size': style.fontSizeOption.value,
			'--font-color': style.fontColor.value,
			'--container-width': style.contentWidth.value,
			'--bg-color': style.backgroundColor.value,
		} as CSSProperties;
	};

	const [mainStyle, setMainStyle] = useState<CSSProperties>(getCSSProps(defaultArticleState));

	const updateStyle = (newStyle: ArticleStateType) => {
		setMainStyle(getCSSProps(newStyle));
	}

	return (
		<main
			className={styles.main}
			style={mainStyle}>
			<ArticleParamsForm 
				onSubmit={updateStyle}/>
			<Article />
		</main>
	);
};