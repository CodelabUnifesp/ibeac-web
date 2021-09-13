# pull official base image
FROM node:16-alpine3.11

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
RUN yarn install
RUN yarn global add eslint
RUN yarn global add react-scripts@4.0.3

# add app
COPY . ./

# start app
CMD ["yarn", "start"]