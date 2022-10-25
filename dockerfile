FROM cypress/included:10.9.0
# make directory inside container
RUN mkdir /app
WORKDIR /app
COPY package.json /app
RUN npm install
# copy cypress code from host to container
COPY . /app
RUN npx cypress verify && npx cypress run --browser chrome