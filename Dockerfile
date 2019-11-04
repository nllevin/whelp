FROM node:12.9.1-alpine

WORKDIR /whelp
ENV NODE_ENV = production
ENV PATH /whelp/node_modules/.bin:$PATH
COPY package.json /whelp/package.json
RUN npm install --silent
WORKDIR /whelp/frontend
COPY /frontend/package.json /whelp/frontend/package.json
WORKDIR /whelp
RUN npm run frontend-install
COPY . /whelp
CMD ["npm","run","prod"]