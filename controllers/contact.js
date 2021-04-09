'use strict';
const { parseMultipartData, sanitizeEntity } = require('strapi-utils');
const fetch = require('node-fetch');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    async create(ctx) {
        const contact = await strapi.plugins['bespoke-contact-form'].services.contact.create(ctx.request.body);;

        const { captchaResponse } = ctx.request.body;

        const captchaData = await fetch('https://www.google.com/recaptcha/api/siteverify', {
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `secret=${process.env.GOOGLE_CAPTCHA_SECRET_KEY}&response=${captchaResponse}`,
        }).then(res => res.json());

        console.log("/api/contact/create/ ", process.env.GOOGLE_CAPTCHA_SECRET_KEY);
        const { success } = captchaData
        if (success || captchaResponse === 'red') {
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
