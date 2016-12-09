const compareMomentDates = (a, b) => {
  if (a.valueOf() < b.valueOf()) {
    return -1
  } else if (a.valueOf() > b.valueOf()) {
    return 1
  } else{
    return 0
  }
}
  
export default function sortDates(arrayOfDates) {
  return arrayOfDates.sort(compareMomentDates)
}
