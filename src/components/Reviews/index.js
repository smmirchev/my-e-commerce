import React from "react"
import styles from "./styles.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Reviews = ({ reviewsNumber }) => {
  return (
    <div className={styles.reviewsContainer}>
      <div>
        <FontAwesomeIcon icon="star" className={styles.fontAwesomeIcon} />
        <FontAwesomeIcon icon="star" className={styles.fontAwesomeIcon} />
        <FontAwesomeIcon icon="star" className={styles.fontAwesomeIcon} />
        <FontAwesomeIcon icon="star" className={styles.fontAwesomeIcon} />
      </div>
      <p>({reviewsNumber})</p>
    </div>
  )
}

export default Reviews
