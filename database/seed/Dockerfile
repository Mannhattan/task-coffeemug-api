FROM mongo:latest

ARG DB_HOST
ENV ENV_DB_HOST=$DB_HOST
ARG DB_USERNAME
ENV ENV_DB_USERNAME=$DB_USERNAME
ARG DB_PASSWORD
ENV ENV_DB_PASSWORD=$DB_PASSWORD
ARG DB_INITIALDB
ENV ENV_DB_INITIALDB=$DB_INITIALDB

COPY data/products.json /products.json
CMD mongoimport --host $ENV_DB_HOST --username $ENV_DB_USERNAME --password $ENV_DB_PASSWORD --authenticationDatabase admin --db $ENV_DB_INITIALDB --collection products --type json --file /products.json --jsonArray