import React, { Fragment } from "react"
import { IntlContextConsumer, changeLocale } from "gatsby-plugin-intl"
import styles from "./styles.module.scss"

const languageName = {
  en: "English",
  fr: "Français",
  de: "Deutsch",
}

const Language = () => {
  return (
    <Fragment>
      <IntlContextConsumer>
        {({ languages, language: currentLocale }) =>
          languages.map((language, index) => (
            <div
              role="button"
              key={language}
              onClick={() => changeLocale(language)}
              onKeyDown={e => e.keycode === 113 && changeLocale(language)}
              tabIndex={index}
              className={
                currentLocale === language
                  ? styles.selectedLanguage
                  : styles.language
              }
            >
              {languageName[language]}
            </div>
          ))
        }
      </IntlContextConsumer>
    </Fragment>
  )
}

export default Language
