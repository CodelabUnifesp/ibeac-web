export default function encodeDate(date) {
  debugger;
  const splitedDate = date.split('-');

  return `${splitedDate[2]}${splitedDate[1]}${splitedDate[0]}`;
}
