import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import config from "../config.json";


/**
 * 
 * @returns {string}
 */
export default function useTranslation() {
    const { lang } = useParams();

    const selectedLanguage = useMemo(() => config.supported_translations.includes(lang) ? lang : config.default_translation, [lang]);

    /**
     * 
     * @param {string} key 
     * @param  {...any} args
     * @returns 
     */
    const translate = (key, ...args) => {
        const entry = config.translations[key];
        let translation = entry && entry[selectedLanguage] ? entry[selectedLanguage] : key;

        if (args.length > 0) {
            translation = translation.replace(/{(\d+)}/g, (match, index) => {
                return typeof args[index] !== 'undefined' ? args[index] : match;
            });
        }

        return translation;
    };

    const getLanguage = () => selectedLanguage;

    return { translate, getLanguage };
}
