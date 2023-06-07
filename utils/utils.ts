export function relativeDate(date: string) {
  const delta = Math.round((+new Date() - Number(new Date(date))) / 1000);

  const minute = 60;
  const hour = minute * 60;
  const day = hour * 24;

  if (delta < 30) {
    return "just now";
  } else if (delta < minute) {
    return delta + "s";
  } else if (delta < 2 * minute) {
    return "a minute ago";
  } else if (delta < hour) {
    return Math.floor(delta / minute) + "m";
  } else if (Math.floor(delta / hour) == 1) {
    return "1h";
  } else if (delta < day) {
    return Math.floor(delta / hour) + "h";
  } else if (delta < day * 2) {
    return "1d";
  } else {
    return delta + "d";
  }
}
