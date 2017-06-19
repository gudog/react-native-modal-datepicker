export default function dayBelongsToWeek(day, week) {
  return day.isBetween(
    week.clone().startOf("week"),
    week.clone().endOf("week")
  );
}
