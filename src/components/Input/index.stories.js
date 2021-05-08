import React from 'react';

import Input from './index.js';

export default {
  title: 'Input',
  component: Input,
  argTypes: {},
};

const Template = (args) => <Input {...args} />;

export const Default = Template.bind({});
Default.args = {
  placeholder: 'Informe um valor...',
};
