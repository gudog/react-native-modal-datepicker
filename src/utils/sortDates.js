// @flow
const compareMomentDates = (a, b) => {
  if (a.valueOf() < b.valueOf()) {
    return -1;
  } else if (a.valueOf() > b.valueOf()) {
    return 1;
  }
  return 0;
};

export default function sortDates(
  arrayOfDates: Array<moment$Moment>
): Array<moment$Moment> {
  return arrayOfDates.sort(compareMomentDates);
}
