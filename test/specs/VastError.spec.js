import test from 'ava';
import errorDescriptions from '../../src/errorDescriptions';
import VastError from '../../src/VastError';

const defaultErrorCode = 900;

test('must resolve the correct description for the provided errorCode', (t) => {
  const errorCode = 400;
  const error = new VastError({ errorCode });
  t.is(error.errorCode, errorCode);
  t.is(error.errorDescription, errorDescriptions[errorCode]);
});

test('must use the default errorCode if none is provided', (t) => {
  const error = new VastError();
  t.is(error.errorCode, defaultErrorCode);
  t.is(error.message, errorDescriptions[defaultErrorCode]);
});

test('must allow for custom errors', (t) => {
  const error = new VastError({ errorCode: 666, errorDescription: 'custom error' });
  t.is(error.errorCode, 666);
  t.is(error.message, 'custom error');
});

test('must store custom data', (t) => {
  const error = new VastError({ data: { customValue: 1 } });
  t.deepEqual(error.data, { customValue: 1 });
});

test('must serialize correctly', (t) => {
  const error = new VastError();
  const clone = JSON.parse(JSON.stringify(error));
  t.deepEqual(Object.keys(clone), ['errorCode', 'errorDescription', 'stack']);
});

test('must log correctly', (t) => {
  const error = new VastError();
  t.is(`${error}`, `Vast Error ${defaultErrorCode}: ${errorDescriptions[defaultErrorCode]}`);
});

test('must generate error stack', (t) => {
  const error = new VastError();
  t.is(typeof error.stack, 'string');
});

test('must allow original error stack', (t) => {
  const original = new Error('Humans are dead!');
  const error = new VastError({ error: original });
  t.is(original.stack, error.stack);
});

test('must store original error', (t) => {
  const original = new Error('Afirmative!');
  const error = new VastError({ error: original });
  t.is(original, error.originalError);
});

