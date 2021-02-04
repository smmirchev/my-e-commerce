export const upperCase = str => {
  const value = str.replace(/-/g, " ")
  const words = value.split(" ")
  return words
    .map(word => {
      return word[0].toUpperCase() + word.substring(1)
    })
    .join(" ")
}
