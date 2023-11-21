export function capitalizeFirstLetters(a: string) {
  const array = a.split(' ');
  for (let i = 0; i < array.length; i++) {
    array[i] = array[i][0].toUpperCase() + array[i].substring(1);
  }

  return array.join(' ');
}
