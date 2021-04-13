docker build -t payment-js:dev .
docker run \
  --rm \
  --publish 80 \
  --publish 443 \
  --name payment-js \
  payment-js:dev