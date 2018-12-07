import  createPropType  from './createPropTypes';

const integerType = createPropType((props, propName, componentName) => {
  const value = props[propName];

  if (!Number.isInteger(value)) {
    return new Error(`Invalid prop ${propName} of ${componentName}, should be integer.`);
  }
});

const positiveIntegerType = createPropType((props, propName, componentName) => {
  const value = props[propName];

  if (!Number.isInteger(value) || value <= 0) {
    return new Error(`Invalid prop ${propName} of ${componentName}, should be positive integer.`);
  }
});

const negativeIntegerType = createPropType((props, propName, componentName) => {
  const value = props[propName];

  if (!Number.isInteger(value) || value >= 0) {
    return new Error(`Invalid prop ${propName} of ${componentName}, should be negative integer.`);
  }
});

export {integerType, positiveIntegerType, negativeIntegerType};