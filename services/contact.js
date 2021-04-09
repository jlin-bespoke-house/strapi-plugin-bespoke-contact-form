'use strict';
const { isDraft: isDraftFn } = require('strapi-utils').contentTypes;

/**
 * `contact` service.
 */

module.exports = {
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
};
