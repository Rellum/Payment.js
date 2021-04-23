docker stop payment-js
docker image rm payment-js:dev
docker build -t payment-js:dev .
docker run \
  --rm \
  --publish 80:80 \
  --publish 443:443 \
  --name payment-js \
  payment-js:dev