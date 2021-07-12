export default function decodeDate(date) {
  const day = date.substring(0, 2);
  const month = date.substring(2, 4);
  const year = date.substring(4);

  return `${year}-${month}-${day}`;
}
