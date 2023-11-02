console.info('options.js begin', window?.location?.href);

import './options.css';

import { initOptionsPage, mountOptionsPage } from '@ahstream/hx-chrome-lib';

initOptionsPage();

const options = [
  {
    header: 'General',
    hiddenKey: '',
    options: [
      ['description', 'Lorem Ipsum'],

      ['property', 'CLOSE_TABS_BUT_ME', 'CLOSE_TABS_BUT_ME'],
      ['property', 'CLOSE_TABS_BUT_ONE_MINIMIZE', 'CLOSE_TABS_BUT_ONE_MINIMIZE'],
    ],
  },
];

mountOptionsPage(options);
