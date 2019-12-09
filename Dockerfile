FROM node:12.9.1-alpine
ENV NODE_ENV=production
WORKDIR /whelp
COPY package.json /whelp/package.json
RUN npm install --silent
WORKDIR /whelp/frontend
COPY /frontend/package.json /whelp/frontend/package.json
WORKDIR /whelp
RUN npm run frontend-install --silent
COPY . /whelp
RUN npm run build --prefix frontend
CMD ["npm","start"]