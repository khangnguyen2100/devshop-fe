const aufix = 'đ';
const formatNumber = (number = 0) => {
  if (!number) return '0' + aufix;
  const parts = `${number}`.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  let strNumber = parts.join(',');
  if (parts[parts.length - 1] === '') {
    return strNumber.substring(0, strNumber.length - 1) + aufix;
  }
  return strNumber + aufix;
};
export { formatNumber };
