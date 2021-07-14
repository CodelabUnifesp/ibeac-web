import {has, isNil, omitBy, size, flatten, entries, isArray} from 'lodash';
import {stringify as baseStringify} from 'querystring';

export default function stringify(args) {
  const allowedArgs = omitBy(args, isNil);
  if (size(allowedArgs) === 0) return '';

  // transforma qualquer array valido [1, 2, ..., N-1] na string "1,2,...,N-1"
  entries(allowedArgs).forEach(([key, value]) => {
    if (isArray(value)) {
      if (value.length === 0) delete allowedArgs[key];
      else allowedArgs[key] = flatten(value).join(',');
    }
  });

  if (size(allowedArgs) === 0) return '';

  return `?${baseStringify(allowedArgs)}`;
}
