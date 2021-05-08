import React from 'react';

import Body from './index.js';

export default {
  title: 'Body',
  component: Body,
  argTypes: {},
};

const Template = (args) => <Body {...args} />;

export const Default = Template.bind({});
