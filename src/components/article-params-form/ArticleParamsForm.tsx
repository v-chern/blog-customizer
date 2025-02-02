import styles from './ArticleParamsForm.module.scss';
import React from 'react';
import clsx from 'clsx';
import { SyntheticEvent } from 'react';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { RadioGroup } from 'src/ui/radio-group';

import { useOutsideClickClose } from './hooks/useOutsideClickClose';

import { 
	ArticleStateType, 
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions, 
	fontSizeOptions,
	OptionType
} from 'src/constants/articleProps';

type TArticleParamsFormProps = {
	onSubmit: (newStyle: ArticleStateType) => void;
}

export const ArticleParamsForm = ({onSubmit}: TArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = React.useState(false);
	const [formValues, setFormValues] = React.useState<ArticleStateType>({...defaultArticleState});

	const containterRef = React.useRef<HTMLElement | null> (null);

	const containerStyle = clsx({
		[styles.container]: true,
		[styles.container_open]: isOpen
	});

	const toggleForm = () => {
		setIsOpen(!isOpen);
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

	useOutsideClickClose({
		isOpen,
		rootRef: containterRef,
		onClose: toggleForm
	});

	return (
		<>
			<ArrowButton 
				isOpen={isOpen} 
				onClick={toggleForm} />
			<aside 
				className={containerStyle} 
				ref={containterRef}>
				<form className={styles.form} onSubmit={handleFormSubmit}>
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
						<Button title='Применить' htmlType='submit' type='apply'/>
					</div>
				</form>
			</aside>
		</>
	);
};
