export default function isDayIncluded(day, arrayOfDays) {
  if (arrayOfDays && day) {
    return Boolean(
      arrayOfDays.find((d) => {
        return day.isSame(d, "day");
      })
    );
  }
}
