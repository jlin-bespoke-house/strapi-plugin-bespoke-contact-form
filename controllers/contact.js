'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async create(ctx) {
    const localServices = strapi.plugins['bespoke-contact-form'].services;
    const { captchaResponse } = ctx.request.body;
    const { success } = await localServices.contact.verifyCaptcha(captchaResponse);

    if (success || (captchaResponse === 'red' && process.env.NODE_ENV === 'development')) {
      await strapi.plugins['bespoke-contact-form'].services.contact.create(ctx.request.body);
      return {
        success: true,
        message: "Contact request received!"
      };
    } else {
      ctx.send({
        success: false,
        message: "The captcha failed"
      }, 429);
    }
  },
};
