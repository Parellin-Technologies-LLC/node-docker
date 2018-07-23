# node-docker
A boilerplate Node.js API with Docker

Following this tutorial:
https://nodejs.org/en/docs/guides/nodejs-docker-webapp/

Build the image:
```
docker build -t docker-test .
```

List images:
```
docker images
```

Run the docker build:
```
docker run -p 0:80 -d docker-test
```

Get container id:
```
docker ps
```

Show container logs:
```
docker logs [container-id]
```

Enter the container:
```
docker exec -it [container-id] /bin/bash
```

Test container:
```
curl -i localhost:80
```
