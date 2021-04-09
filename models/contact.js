'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#lifecycle-hooks)
 * to customize this model
 */

const _ = require('lodash');
const { contactEmailTemplate } = require('../emailTemplates');

module.exports = {
    lifecycles: {
        afterCreate: async (result, data) => {
            await strapi.plugins.email.services.email.sendTemplatedEmail({
                to: process.env.BESPOKE_CONTACT_FORM_EMAIL,
                replyTo: data.emailAddress
            },
            contactEmailTemplate,
            _.pick(data, ['firstName', 'lastName', 'emailAddress', 'cellPhone', 'city', 'groupName', 'dateDesired', 'numberOfRooms', 'questions']));
        }
    }
};
