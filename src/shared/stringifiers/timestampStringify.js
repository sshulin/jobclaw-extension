import * as dayjs from 'dayjs';

const timestampStringify = (dateTimestamp) => {
  return dayjs(dateTimestamp).format('DD.MM.YYYY HH:mm');
}

export default timestampStringify;
