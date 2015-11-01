# workshops
ICN.BG Docker Workshop demo app

_Note_: You will need to set port via environment variable and create demo file then declare it in the variable:

* `EXPOSE_PORT`: the port that your app will listen to
* `DEMO_FILE`: the file that your app will read and print to the browser

# Instructions #
```
git clone https://github.com/icnbg/docker-workshop.git
cd docker-workshop
npm install
echo "hello world" >> index.html
export EXPOSE_PORT = 8080
export DEMO_FILE = index.html
node index.js
```
