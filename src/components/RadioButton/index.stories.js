import React from 'react';

import RadioButton from './index.js';

export default {
  title: 'RadioButton',
  component: RadioButton,
  argTypes: {},
};

const Template = (args) => <RadioButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Texto...',
  width: '50%',
};
