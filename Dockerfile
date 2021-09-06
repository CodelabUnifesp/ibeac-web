# pull official base image
FROM node:16-alpine3.11

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
RUN yarn install
RUN yarn install -g eslint
RUN yarn install react-scripts@4.0.3 -g

# add app
COPY . ./

# start app
CMD ["yarn", "start"]