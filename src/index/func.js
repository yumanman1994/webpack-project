import lodash from 'lodash-es';

export function func1(value) {
  return lodash.isArray(value);
}

export function func2(value) {
  console.log(value);
  return value === null;
}
