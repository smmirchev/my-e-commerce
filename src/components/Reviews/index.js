import React from "react"
import { useIntl } from "gatsby-plugin-intl"
import styles from "./styles.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Reviews = ({ reviewsNumber }) => {
  const intl = useIntl()
  return (
    <div className={styles.reviewsContainer}>
      <div>
        <FontAwesomeIcon icon="star" className={styles.fontAwesomeIcon} />
        <FontAwesomeIcon icon="star" className={styles.fontAwesomeIcon} />
        <FontAwesomeIcon icon="star" className={styles.fontAwesomeIcon} />
        <FontAwesomeIcon icon="star" className={styles.fontAwesomeIcon} />
        <FontAwesomeIcon
          icon="star"
          className={`${styles.fontAwesomeIcon} ${styles.faded}`}
        />
      </div>
      <p>
        {`(${reviewsNumber}) 
        ${intl.formatMessage({
          id: "components.reviews.reviews",
        })}`}
      </p>
    </div>
  )
}

export default Reviews
