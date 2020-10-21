const addSpacers = (value) => {
  let nStr = value + '';
  nStr = nStr.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return nStr;
}

export default addSpacers;
