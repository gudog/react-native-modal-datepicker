export default function isMonthIncluded(month, arrayOfDays) {
  if (arrayOfDays && month) {
    return Boolean(
      arrayOfDays.find((d) => {
        return month.isSame(d, "month");
      })
    );
  }
}
