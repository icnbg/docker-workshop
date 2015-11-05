#  ICN.Bg Docker Workshop

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

	---
	Web UI
	1. Create RC from our image (already pushed to the registry)
	2. Create Service for our RC



PHP/Redis Guestbook:

	cd ../php-redis/
	cat Dockerfile
	docker build -t guestbook .
	docker run -d --name redis-master redis
	docker run -d --name redis-slave redis redis-server --slaveof redis-master 6379
	docker run -d --name guestbook -p 80:80 guestbook
	curl localhost:80
	docker logs guestbook

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
