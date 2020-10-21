import addSpacers from './addSpacers';

const numberStringify = (value) => {
  const floated = parseInt(value * 100)/100;

  const integer = parseInt(value);
  const centesimal = parseInt((floated - integer)*100);

  return (addSpacers(integer) + (centesimal ? ('.' + centesimal) : ''));
}

export default numberStringify;
