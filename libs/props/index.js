import PropTypes from 'prop-types';

import { integerType, positiveIntegerType, negativeIntegerType } from './integer';
import rangeType from './range';
import regexType from './regex';

PropTypes.integer = integerType;
PropTypes.positiveInteger = positiveIntegerType;
PropTypes.negativeInteger = negativeIntegerType;
PropTypes.range = rangeType;
PropTypes.regex = regexType;

export default PropTypes;