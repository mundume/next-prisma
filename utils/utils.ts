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
  } else if (delta < day * 3) {
    return "2d";
  } else if (delta < day * 4) {
    return "3d";
  } else if (delta < day * 5) {
    return "4d";
  } else if (delta < day * 6) {
    return "5d";
  } else if (delta < day * 7) {
    return "6d";
  } else if (delta > day * 8 && delta <= day * 14) {
    return "1w";
  } else if (delta > day * 14 && delta <= day * 21) {
    return "2w";
  } else if (delta > day * 21 && delta <= day * 30) {
    return "3w";
  } else {
    return "30d+";
  }
}
