import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import { addLocaleData, IntlProvider } from 'react-intl';

import englishLocaleData from 'react-intl/locale-data/en';
import spanishLocaleData from 'react-intl/locale-data/es';
import messages from './messages';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

addLocaleData([...englishLocaleData, ...spanishLocaleData]);

const language = (navigator.languages && navigator.languages[0]) || navigator.language || navigator.userLanguage;
const languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0];

const i18nMessages = messages[languageWithoutRegionCode] || messages[language] || messages.en;

ReactDOM.render(
  <IntlProvider locale={language} messages={i18nMessages}>
    <App />
  </IntlProvider>,
  document.getElementById('root')
);
registerServiceWorker();
