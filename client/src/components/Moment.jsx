import moment from "moment";

export default function Moment({ date }) {
  const getShortTime = (date) => {
    const now = moment();
    const duration = moment.duration(now.diff(moment(date)));

    if (duration.asSeconds() < 60) {
      return `${Math.floor(duration.asSeconds())}s`;
    } else if (duration.asMinutes() < 60) {
      return `${Math.floor(duration.asMinutes())}m`;
    } else if (duration.asHours() < 24) {
      return `${Math.floor(duration.asHours())}h`;
    } else if (duration.asDays() < 30) {
      return `${Math.floor(duration.asDays())}d`;
    } else if (duration.asMonths() < 12) {
      return `${Math.floor(duration.asMonths())}mo`;
    } else {
      return `${Math.floor(duration.asYears())}y`;
    }
  };
  return getShortTime(date);
}
