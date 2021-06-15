'use strict';
const { isDraft: isDraftFn } = require('strapi-utils').contentTypes;
const fetch = require('node-fetch');
const mailchimp = require("@mailchimp/mailchimp_marketing");

const { MAILCHIMP_SECRET_KEY, MAILCHIMP_SERVER_PREFIX, MAILCHIMP_LIST_ID } = process.env;
mailchimp.setConfig({
  apiKey: MAILCHIMP_SECRET_KEY,
  server: MAILCHIMP_SERVER_PREFIX
});

const listId = MAILCHIMP_LIST_ID;

debugger;
/**
 * `contact` service.
 */

module.exports = {
  async verifyCaptcha(captchaResponse) {
    return await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `secret=${process.env.GOOGLE_CAPTCHA_SECRET_KEY}&response=${captchaResponse}`,
    }).then(res => res.json())
      .catch(err => {
        console.log('bespoke-contact-form/services/contact/verifyCaptcha', err);
        return { success: false };
      });
  },
  async create(data, { files } = {}) {
    const isDraft = isDraftFn(data, strapi.plugins['bespoke-contact-form'].models.contact);
    const validData = await strapi.entityValidator.validateEntityCreation(
      strapi.plugins['bespoke-contact-form'].models.contact,
      data,
      { isDraft }
    );

    const entry = await strapi.query('contact', 'bespoke-contact-form').create(validData);

    if (files) {
      await strapi.entityService.uploadFiles(entry, files, {
        model: 'contact',
        source: 'bespoke-contact-form'
      });
      return this.findOne({ id: entry.id });
    }

    return entry;
  },

  async subscribeToMailchimp(firstName, lastName, email) {
    if (MAILCHIMP_SECRET_KEY && MAILCHIMP_SERVER_PREFIX && MAILCHIMP_LIST_ID) {
      try {
        const response = await mailchimp.lists.addListMember(listId, {
          email_address: email,
          status: "subscribed",
          merge_fields: {
            FNAME: firstName,
            LNAME: lastName
          }
        });
      } catch (e) {
        console.error('ERROR: bespoke-contact-form/services/contact/subscribeToMailchimp:', e);
      }
    } else {
      console.warn('FAILED: bespoke-contact-form/services/contact/subscribeToMailchimp:', 'Mailchimp env variables missing');
    }
  }
};
