import { ensureValidator, toString, typeOf } from './utils';

/**
 * Validator to handle type checking via typeof
 * @param {string} expectedType The type the validator expects
 * @returns {function} Validator function
 */
export function createTypeValidator(expectedType) {
  return function(value) {
    if (typeof value !== expectedType) {
      return `Expected type ${expectedType} but received ${typeOf(value)}`;
    }
  }
}

/**
 * Validator to handle strict equality checking
 * @param {string} expectedValue The value the validator expects
 * @returns {function} Validator function
 */
export function createEqualityValidator(expectedValue) {
  return function(value) {
    if (value !== expectedValue) {
      return `Expected value to equal ${toString(expectedValue)} but received ${toString(value)}`;
    }
  }
}

/**
 * Validator to structurally type check an object
 * @param {object} validators Key value pairs of propertyName -> validator
 * @returns {function} Validator function
 */
export function createShapeValidator(validators) {
  return function(value, context) {
    const error = ensureValidator('object')(value, context);
    if (error) {
      return error;
    }

    for (const [key, validator] of Object.entries(validators)) {
      const error = ensureValidator(validator)(value[key], context(key));
      if (error) {
        return error;
      }
    }
  }
}

/**
 * Validator to type check all items in an array
 * @param {object} validator The validator to run against all items in the array
 * @returns {function} Validator function
 */
export function createArrayValidator(validator) {
  return function(values, context) {

    if (!Array.isArray(values)) {
      return [`Expected type array but received ${typeOf(values)}`, context];
    }

    for (const [index, value] of values.entries()) {
      const error = ensureValidator(validator)(value, context(index));
      if (error) {
        return error;
      }
    }
  }
}
