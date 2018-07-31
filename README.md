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
docker run -p 0:3000 -d docker-test
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
curl -i localhost:3000
```

### Benchmarking

`pm2 start ecosystem.config.js`

`time curl 0.0.0.0:3000/ping` (expected request time ~2ms, expected internal time ~130 μs)

**CPU**
`curl 0.0.0.0:3000/cpu`
**Memory**
`curl 0.0.0.0:3000/mem`
**IO**
`curl 0.0.0.0:3000/io`
