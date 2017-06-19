// @flow
export default function isDayIncluded(
  day: moment$Moment,
  arrayOfDays: Array<moment$Moment>
): boolean {
  if (arrayOfDays && day) {
    return Boolean(
      arrayOfDays.find(d => {
        return day.isSame(d, "day");
      })
    );
  }
  return false;
}
