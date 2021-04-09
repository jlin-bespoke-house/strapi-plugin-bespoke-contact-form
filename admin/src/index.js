import React from 'react';
import pluginPkg from '../../package.json';
import pluginId from './pluginId';
import App from './containers/App';
import Initializer from './containers/Initializer';
import lifecycles from './lifecycles';
import trads from './translations';

export default strapi => {
  const pluginDescription = pluginPkg.strapi.description || pluginPkg.description;
  const icon = pluginPkg.strapi.icon;
  const name = pluginPkg.strapi.name;

  const plugin = {
    blockerComponent: null,
    blockerComponentProps: {},
    description: pluginDescription,
    icon,
    id: pluginId,
    initializer: Initializer,
    injectedComponents: [],
    isReady: false,
    isRequired: pluginPkg.strapi.required || false,
    layout: null,
    lifecycles,
    mainComponent: App,
    name,
    preventComponentRendering: false,
    trads,
    // settings: {
    //   menuSection: {
    //     id: pluginId,
    //     title: {
    //       id: pluginId,
    //       defaultMessage: 'Bespoke Contact Form'
    //     },
    //     links: [{
    //       title: {
    //         id: `${pluginId}.config`,
    //         defaultMessage: 'Configuration'
    //       },
    //       to: `${strapi.settingsBaseURL}/${pluginId}/config`,
    //       Component: () => <div>test</div>
    //     }]
    //   }
    // },
    // menu: {
    //   pluginsSectionLinks: [
    //     {
    //       destination: `/plugins/${pluginId}`,
    //       icon,
    //       label: {
    //         id: `${pluginId}.plugin.name`,
    //         defaultMessage: name,
    //       },
    //       name,
    //       permissions: [
    //         {
    //           action: 'plugins::bespoke-contact-form.settings.configure',
    //           subject: null,
    //         },
    //       ],
    //     },
    //   ],
    // },
  };

  return strapi.registerPlugin(plugin);
};
