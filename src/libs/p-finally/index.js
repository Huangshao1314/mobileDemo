
'use strict';

export default async(
  promise,
  onFinally = (() => {})
) => {
  let value = null;
  try {
    value = await promise;
  } catch (error) {
    await onFinally();
    throw error;
  }
  await onFinally();
  return value
};
