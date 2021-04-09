'use strict';

/**
 * `alwaysFail` policy.
 */

module.exports = async (ctx, next) => {
  return ctx.unauthorized('This is forbidden');
};
