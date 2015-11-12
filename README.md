#  ICN.Bg Docker Workshop


## Edit: The php-redis example doesn't work on docker 1.9. Additional info provided after the 1.8.2 example

### Docker CLI

	https://docs.docker.com/v1.8/reference/commandline/run/
	https://docs.docker.com/v1.8/reference/commandline/build/
	https://docs.docker.com/v1.8/reference/commandline/exec/
	https://docs.docker.com/v1.8/reference/commandline/images/
	https://docs.docker.com/v1.8/reference/commandline/login/
	https://docs.docker.com/v1.8/reference/commandline/logs/
	https://docs.docker.com/v1.8/reference/commandline/ps/
	https://docs.docker.com/v1.8/reference/commandline/pull/
	https://docs.docker.com/v1.8/reference/commandline/push/
	https://docs.docker.com/v1.8/reference/commandline/rm/
	https://docs.docker.com/v1.8/reference/commandline/rmi/
	https://docs.docker.com/v1.8/reference/commandline/start/
	https://docs.docker.com/v1.8/reference/commandline/stop/



### Images, Containers and Dockerfiles:

	https://hub.docker.com/_/nginx/
	https://github.com/nginxinc/docker-nginx/blob/4e5332fa50a1f8f73657417c6bfe249bbb3b110d/Dockerfile

### Examples

	git clone https://github.com/plamer/workshop.git
	
Nodejs Hello:v1:

	docker images
	docker pull redis && docker pull php:5-apache && docker pull node
	docker images

	cd workshop
	cd hello_v1
	npm install
	export EXPOSE_PORT=8080
	node hello.js
	---
	rm -rf node_modules/
	docker build -t hello:v1 .
	docker run -d --name hello-node1 -p 8080:8080 -e "EXPOSE_PORT=8080" hello:v1
	docker ps
	curl localhost:8080
	docker logs hello-node1


Nodejs Hello:v2:

	cd ../hello_v2
	cat Dockerfile
	docker build -t hello:v2 .
	docker run -d --name hello-node2 -p 8081:8081 -e "EXPOSE_PORT=8081" hello:v2
	docker ps
	Oops?
	docker ps -a
	docker logs hello-node2
	docker rm hello-node2
	docker run -d --name hello-node2 -p 8081:8081 -e "EXPOSE_PORT=8081" -e "DEMO_FILE=file" hello:v2
	docker ps
	curl localhost:8081
	docker logs hello-node2

	---
	v2 - ICNApps
	docker login -u workshop -e support@icn.bg docker.icnhost.net:5000
	// Enter password
	docker tag hello:v2 docker.icnhost.net:5000/workshop/hello:v2
	docker push docker.icnhost.net:5000/workshop/hello:v2

	---
	Web UI
	1. Create RC from our image (already pushed to the registry)
	2. Create Service for our RC



PHP/Redis Guestbook:

### Works on 1.8.2 (1.8.X)

	cd ../php-redis/
	cat Dockerfile
	docker build -t guestbook .
	docker run -d --name redis-master redis
	docker run -d --name redis-slave redis redis-server --slaveof redis-master 6379
	docker run -d --name guestbook -p 80:80 guestbook
	curl localhost:80
	docker logs guestbook

### For 1.9+

        cd ../php-redis/
        docker network create --subnet=10.10.10.0/24 guestbook
        cat Dockerfile
        docker build -t guestbook .
        docker run -d --name redis-master --net=guestbook redis
        docker run -d --name redis-slave --net=guestbook redis redis-server --slaveof redis-master 6379
        docker run -d --name guestbook -p 80:80 --net=guestbook guestbook

	---
	ICNApps
	docker tag guestbook docker.icnhost.net:5000/workshop/guestbook
	docker push docker.icnhost.net:5000/workshop/guestbook

	---
	Web UI
	1. Create redis-master RC
	2. Create redis-master SVC
	3. Create redis-slave (overwrite standart cmd)
	4. Create redis-slave SVC
	5. Create guestbook RC
	6. Create guestbook SVC

---

### Immutable Servers/Infrastructure

Immutable Servers are a deployment model that mandates that no application updates, security patches, or configuration changes happen on production systems. If any of these layers needs to be modified, a new image is constructed, pushed and cycled into production. When you deploy an update to your application, you should create new instances (servers and/or containers) and destroy the old ones, instead of trying to upgrade them in-place. Once your application is running, you don’t touch it! The benefits come in the form of repeatability, reduced management overhead, easier rollbacks, etc.


### Microservices

A microservice is an isolated, loosely-coupled unit of development that works on a single concern. This is similar to the old "Unix" way of doing things: do one thing, and do it well. Matters such as how to "combine" whatever is provided by the service are left to higher layers or to policy. This usually means that microservices tend to avoid interdependencies: if one microservice has a hard requirement for other microservices, then you should ask yourself if it makes sense to make them all part of the same unit.
