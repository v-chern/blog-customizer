import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import React from 'react';
import { SyntheticEvent } from 'react';
import { Select } from 'src/ui/select';


import { ArticleStateType, backgroundColors, contentWidthArr, defaultArticleState, fontColors, fontFamilyOptions, fontSizeOptions, OptionType } from 'src/constants/articleProps';
import { Separator } from 'src/ui/separator';
import { RadioGroup } from 'src/ui/radio-group';
import { createPortal } from 'react-dom';

type TArticleParamsFormProps = {
	currentStyle: ArticleStateType;
	onSubmit: (newStyle: ArticleStateType) => void;
}

export const ArticleParamsForm = ({currentStyle, onSubmit}: TArticleParamsFormProps) => {
	const [formState, setFormState] = React.useState(false);
	const [formValues, setFormValues] = React.useState<ArticleStateType>(currentStyle);

	const containterRef = React.useRef<HTMLElement | null> (null);

	const toggleForm = () => {
		setFormState(!formState);
		containterRef.current?.classList.toggle(styles.container_open)
	}

	const handleFormReset = () => {
		setFormValues({...defaultArticleState});
		onSubmit({...defaultArticleState});
		toggleForm();
	};

	const handleFormSubmit = (e: SyntheticEvent) => {
		e.preventDefault();
		onSubmit(formValues);
		toggleForm();
	};

	const handleExternalClick = (event: MouseEvent) => {
		if (formState && containterRef.current && !containterRef.current.contains(event.target as Node) ) {
			toggleForm();
		}
	}

	React.useEffect(() => {
		document.addEventListener('mousedown', handleExternalClick);
		return () => {
			document.removeEventListener('mousedown', handleExternalClick);
		};
	}, [formState]);
	
	return (
		<>
			<ArrowButton 
				isOpen={formState} 
				onClick={toggleForm} />
			<aside 
				className={styles.container} 
				ref={containterRef}>
				<form className={styles.form}>
					<div className={styles.inputsContainer}>
						<h2 className={styles.title}>Задайте параметры</h2>
						<Select 
							title='Шрифт'
							selected={formValues.fontFamilyOption} 
							options={fontFamilyOptions}
							onChange={(selected: OptionType) =>
								setFormValues((prev) => ({ ...prev, fontFamilyOption: selected }))
							}
						/>
						
						<RadioGroup
							title='Размер шрифта'
							selected={formValues.fontSizeOption}
							options={fontSizeOptions}
							onChange={(selected: OptionType) =>
								setFormValues((prev) => ({ ...prev, fontSizeOption: selected }))
							}
							name='font-size'
						/>

						<Select 
							title='Цвет шрифта'
							selected={formValues.fontColor} 
							options={fontColors}
							onChange={(selected: OptionType) =>
								setFormValues((prev) => ({ ...prev, fontColor: selected }))
							}
						/>

						<Separator />

						<Select
							title='Цвет фона'
							selected={formValues.backgroundColor}
							options={backgroundColors}
							onChange={(selected: OptionType) =>
								setFormValues((prev) => ({ ...prev, backgroundColor: selected }))
							}
						/>

						<Select
							title='Ширина контента'
							selected={formValues.contentWidth}
							options={contentWidthArr}
							onChange={(selected: OptionType) =>
								setFormValues((prev) => ({ ...prev, contentWidth: selected }))
							}
						/>
					</div>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' onClick={handleFormReset}/>
						<Button title='Применить' htmlType='submit' type='apply' onClick={handleFormSubmit}/>
					</div>
				</form>
			</aside>
		</>
	);
};
