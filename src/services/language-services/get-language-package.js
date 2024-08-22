import plLanguage from '../../language/polishLanguage.json';

const getLanguagePackage = (language) => {
	switch (language) {
		case 'pl':
			return plLanguage;
		default:
			return {};
	}
};

export default getLanguagePackage;
