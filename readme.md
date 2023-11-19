# Load balancing using Nginx

## Project Setup:
* We have a node.js application which runs on port 7777.
* Create a docker image for this application: 
    * `docker build -t my-server:1.0 ./server`
* Spawn multiple instances of this application :
    ```
    * docker run -p 1111:7777 -d my-server:1.0
    * docker run -p 1112:7777 -d my-server:1.0
    * docker run -p 1113:7777 -d my-server:1.0
    * docker run -p 1114:7777 -d my-server:1.0
    ```
* Now, 4 instances of this application are running on port 1111,1112,1113 and 1114 respectively.

* Now, we will use Nginx to load balance the requests Changes in `nginx.conf` file:
    * Define these server instances under a server proxy named `backend-server`:
        ```
        upstream backend-server{
            server 127.0.0.1:1111;
            server 127.0.0.1:1112;
            server 127.0.0.1:1113;
            server 127.0.0.1:1114;
        }
        ```
    * Use `proxy_pass` in root location mapping:
        ```
        location / {
            # Refer to the server proxy
            proxy_pass http://backend-server/;
        }
        ```
    * Expose port `8095` for this nginx server.
        ```
        listen 8095;
        ```
* Now when we try to access the application using `http://localhost:8095`, we can see this request is served by different instances for different attempts (because of load balancing by Nginx):
    ```
    I am an endpoint with IP 172.17.0.3
    I am an endpoint with IP 172.17.0.2
    I am an endpoint with IP 172.17.0.1
    ...
    ```
