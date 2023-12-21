- GET: Get method is **used to retrieve or get the information from the given server using a given URL**.

  - In REST CURD, it performs the read operation.

- POST: **POST method is used to submit data to a server.**

  - Post is **used for sending data to the server** such as uploading a file or transferring some data or adding a new row to the back end table to any kind of web form. In a simple sentence, we can say that the post method is used for **inserting new items in the backend server**.
  - In REST CRUD operation it performs the create operation.

- PUT: The PUT method **modifies an existing resource entirely or creates a new resource.**

  - If I had to change my first name then send PUT request for Update:
    { "first": "Nazmul", "last": "hasan" }
  - So, here in order to update the first name we need to send all the parameters of the data again.
  - The PUT method **modifies an existing resource entirely or creates a new resource.** How does it do that?
    - The API consumer sends the resource ID
    - If the resource exists, the entire resource is replaced with the entire entity
    - If the resource doesn’t exist, a new resource is created

- PATCH: PATCH only **updates the specific fields of the resource** that are specified in the request.

  - Patch request says that we would only **send the data that we need to modify without modifying or effecting other parts of the data.** Ex: if we need to update only the first name, we pass only the first name.
  - **The PATCH method applies a partial update to an existing resource.** This means that **you only need to send the data that you want to update, and it won’t affect or change anything else**. Therefore, if you want to update the first name in the database, you only need to send the first parameter.

- DELETE: The DELETE method is **used to delete a resource specified by its URI.**

- whether GET takes body or not
  - According to the HTTP specification, **the GET request method should not include a request body in the request** message. The purpose of a GET request is to retrieve a resource or information from the server, and the query parameters and headers are typically used to provide any necessary information to the server.

  - Although it is possible to include a body in a GET request, this is not recommended and may not be supported by all servers and clients. Additionally, some proxies and firewalls may strip out the body of a GET request, making it unreliable to use.

  - If you need to send data to the server, you should consider using a different HTTP request method, such as POST, PUT, or PATCH.

- Difference between HTTP and HTTPS

  - Protocol: **HTTP (Hypertext Transfer Protocol) is an unsecured protocol** that is **used to transfer data between a client and a server over the internet**. **HTTPS (Hypertext Transfer Protocol Secure) is a secure version of HTTP that uses SSL/TLS encryption to protect data in transit**.
  - Port: **HTTP typically uses port 80** (by default) for **communication between clients and servers**, while **HTTPS typically uses port 443** (by default).
  - 3. The data which is transferred in HTTP is plain text.
    4. The data which is transferred in HTTPS is encrypted, i.e., ciphertext.
  - 6. This protocol does not need any certificate.
    7. But, this protocol requires an SSL (Secure Socket Layer) certificate.
  - 10. Examples of HTTP websites are Educational Sites, Internet Forums, etc.
    11. Examples of HTTPS websites are shopping websites, banking websites, etc.

  - 1. It is an abbreviation of Hypertext Transfer Protocol
    1. It is an abbreviation of Hypertext Transfer Protocol Secure.
    1. This protocol operates at the application layer.
    1. This protocol operates at the transport layer.
    1. By default, this protocol operates on port number 80.
    1. By default, this protocol operates on port number 443.
    1. The URL (Uniform Resource Locator) of HTTP start with http://
    1. The URL (Uniform Resource Locator) of HTTPS start with https://
    1. Encryption technique is absent in HTTP.
    1. Encryption technique is available or present in HTTPS.
    1. The speed of HTTP is fast as compared to HTTPS.
    1. The speed of HTTPS is slow as compared to HTTP.

    1. It is un-secure.
    1. It is highly secure.

- CORS

  - CORS (Cross-Origin Resource Sharing) is a **security feature that restricts web pages from making requests to a different domain** than the one serving the page. In Node.js, **you use CORS to allow a front-end application running on a different domain to access data from your server.**
  - **It enables cross-domain communication between the front-end and back-end while maintaining security measures to prevent malicious behavior.**
  - Example
    app.use(cors({
    origin: 'http://example.com',
    methods: ['GET']
    }));

- "Cross-Origin Resource Sharing" refers to the situations when a frontend running in a browser has JavaScript code that communicates with a backend, and the backend is in a different "origin" than the frontend.
  - The CORS mechanism supports secure cross-origin requests and data transfers between browsers and servers

- no-cors

  - no-cors is a mode that allows developers to make cross-origin requests without sending CORS headers.
  - When using CORS, the browser will send a preflight request to the server to check whether the server allows cross-origin requests. This preflight request includes the HTTP method, headers, and other metadata of the actual request that will be sent. If the server approves the preflight request, it will include the Access-Control-Allow-Origin header in the response to indicate that the actual request can proceed. In no-cors mode, no preflight request is sent, and the browser does not include any CORS headers in the actual request.
  - CORS headers are used to control which origins, methods, and headers are allowed to access a resource on the server. In no-cors mode, no CORS headers are sent, which means that the server must allow any origin, method, and header to access the resource.

- how to pass array in query params javascript?

  - Example
    let myArray = [1, 2, 3];
    let queryString = "?myArray=" + encodeURIComponent(JSON.stringify(myArray));
    let url = "http://example.com/api" + queryString;
  - In the above example, JSON.stringify() is used to convert the array to a string, and **encodeURIComponent()** **is used to encode the string so that it can be safely added to the URL.** Then, the query string is added to the API endpoint URL to create the full URL with the query parameters.
  - const myArray = [1, 2, 3];
    const encodedArray = myArray.join(',');
    const url = `https://example.com/myEndpoint?myArray=${encodedArray}`;
  - const myArray = [1, 2, 3];
    const params = new URLSearchParams();
    params.append('myArray', myArray);
    const url = `https://example.com/myEndpoint?${params.toString()}`;

  - On the server-side, you can then parse the query string and decode the array string using JSON.parse(). For example, in Node.js:

    const url = require('url');

    // Parse the URL
    const parsedUrl = url.parse(req.url, true);

    // Get the array from the query string
    const myArray = JSON.parse(parsedUrl.query.myArray);

- What Are HTTP Status Codes?

  - The 1xx status codes – informational requests
  - The 2xx status codes – successful requests
  - The 3xx status codes – redirects
  - The 4xx status codes – client errors
  - The 5xx status codes – server errors

- What is 304 code?
  **An HTTP 304 not modified status code** means that **the website you're requesting hasn't been updated since the last time you accessed it.** Typically, your browser will save (or cache) web pages so it doesn't have to repeatedly download the same information.

  - How to Fix an HTTP 304 Status Code (6 Potential Methods)
    - Clear the Browser's Cache Data.
    - Run a Malware Scan.
    - Disable Your Browser's Extensions.
    - Flush the DNS and Reset the TCP/IP.
    - Try Using the Google Public DNS.
    - Check Your Server Configuration Files for Incorrect Redirect Instructions.

- Provider

  - In the React Context API, the Provider and Consumer components are used to set up a shared data source, and to retrieve data from that source in child components.

  - **The Provider component is used to define the context and to provide the data that will be shared.** It accepts a "value" prop that can be any data type, such as a string, number, object, or even a function. The value prop is then made available to any child component that uses the matching Consumer component.

  - The Provider component is going to be used to wrap the components that are going to have access to our context.
    <NotesContext.Provider value={this.state.notes}>
    ...
    </Notes.Provider>

  - The Provider component receives a prop called value, which can be accessed from all the components that are wrapped inside Provider, and it will be responsible to grant access to the context data.

- Consumer

  - **The Consumer component is used to access the data provided by the Provider component.** It should be used inside the child component that needs the data, and takes a function as its child that receives the context value as a parameter.
  - After you wrap all the components that are going to need access to the context with the Provider component, you need to tell which component is going to consume that data.
  - The Consumer component allows a React component to subscribe to the context changes. The component makes the data available using a render prop.
    <NotesContext.Consumer>
    {values => <h1>{value</h1>}
    </Notes.Consumer>

  - Use case
    - Some sample use cases where the Context API proves helpful are: Theming — Pass down app theme. i18n — Pass down translation messages. Authentication — Pass down current authenticated user.

- why node js is a single threaded language
  - **A Node.js application runs on single thread and the event loop also runs on the same thread**. Hence, we can say Node.js is single-threaded
  - As Node.js **follows Single-Threaded with Event Loop Model inspired by JavaScript Event-based model with JavaScript callback mechanism**. So, node.js is single-threaded similar to JavaScript

- How to manage the huge data in service API and what type of caching should be used

  - Managing huge amounts of data in a service API can be challenging, but there are several techniques that can be used to improve performance and reduce the load on your API servers. One such technique is caching.
  - Caching is the process of storing frequently accessed data in memory or on disk to reduce the number of requests made to the API server. Caching can significantly improve the performance of your application and reduce the load on your servers, especially when dealing with large amounts of data.
  - There are several types of caching that can be used in JavaScript, including:
  - Browser caching: This type of caching involves storing data in the user's browser cache. Browser caching can be useful for static data that doesn't change frequently, such as images, CSS, and JavaScript files.
  - Server-side caching: This type of caching involves storing data on the server side in memory or on disk. Server-side caching can be used to cache frequently accessed data, such as database queries or API responses.
  - CDN caching: This type of caching involves storing data on a Content Delivery Network (CDN) that is distributed across multiple servers. CDN caching can be used to improve the performance of static assets, such as images and videos, by caching them on multiple servers closer to the user.
  - When deciding which type of caching to use, consider the type of data you are caching, the frequency of updates, and the size of the data. Additionally, be aware of the caching mechanism you are using and make sure it is set up correctly to prevent stale or outdated data from being served to users.
  - Another technique for managing large amounts of data in a service API is pagination. Pagination involves breaking up large sets of data into smaller chunks, or pages, that can be loaded and displayed incrementally. This can help reduce the amount of data that needs to be loaded at once, improving performance and reducing the load on your servers.
  - Finally, consider using a database that is designed to handle large amounts of data, such as MongoDB or Cassandra, and optimize your database queries to minimize the amount of data that needs to be fetched from the database. This can help reduce the load on your database servers and improve the performance of your API.

- HTTP Protocols

  - HTTP (Hypertext Transfer Protocol) is a standard protocol used to transfer data over the internet. HTTP is the foundation of the World Wide Web, and it is used by web browsers to request and receive web pages, as well as by web servers to send those pages to the browsers.

  - In JavaScript, HTTP protocols are used to make requests and receive responses from web servers. JavaScript can make HTTP requests using several different methods, such as XMLHttpRequest (XHR), the Fetch API, or third-party libraries.

  - HTTP requests in JavaScript typically involve specifying a URL to request and an HTTP method to use (e.g. GET, POST, PUT, DELETE). The request can also include additional data, such as query parameters, request headers, or a request body. When the server receives the request, it sends a response back, which typically includes a status code (e.g. 200 OK, 404 Not Found), response headers, and a response body.

  - HTTP protocols are important in JavaScript because they allow web applications to communicate with web servers, retrieve data from APIs, and interact with web pages. By making HTTP requests and receiving responses, JavaScript code can dynamically update web pages, interact with APIs, and provide a more interactive and responsive user experience

- How to make node js working as multi threaded

  1. Cluster module:
     Node.js is built on top of the V8 JavaScript engine and by default, it runs on a single thread. However, Node.js has a built-in cluster module that allows you to create child processes that can run on separate threads and take advantage of multi-core CPUs.
  2. Worker Threads API:
     Node.js also provides a built-in worker_threads module that allows you to create worker threads that can run on separate threads and perform CPU-intensive tasks. Unlike the cluster module, which creates child processes, the worker_threads module creates lightweight threads within the same process.

  - Note that multi-threading in Node.js can be complex and requires careful handling of shared resources and synchronization between threads.

- middleware

  - In Express.js, middleware is a function that receives three arguments: the request object, the response object, and the next function in the application's request-response cycle. Middleware functions can modify the request and response objects, and they can also terminate the request-response cycle by sending a response to the client.
  - Middleware functions can handle requests before they are passed on to the next middleware or to the route handler. This allows for processing of data, handling errors, and performing other operations before the response is sent to the client.
  - Middleware functions can be used to secure your application against attacks
  - Middleware functions can handle errors that occur during the request-response cycle
  - Middleware functions can be used to authenticate users, authorize access to certain routes or resources, and manage sessions.

- Authentication:

  - Authentication is the process of verifying the identity of a user or system, usually by verifying a username and password or other credentials.
  - The main goal of authentication is to establish trust and ensure that the user or system is who they claim to be.
  - Authentication is typically done at the beginning of a session, such as when a user logs in to a web application.
  - Authentication is focused on identity and the process of verifying that identity.
k

- Authorization:

  - Authorization is the process of determining what actions or resources a user or system is allowed to access, based on their identity and role.
  - The main goal of authorization is to control access to resources and ensure that only authorized users or systems can perform certain actions or access certain resources.
  - Authorization is typically done after authentication, as it requires knowledge of the user's identity and role.
  - Authorization is focused on access control and determining what actions or resources a user is allowed to access.

- security schemes in rest API

  - OAuth 2.0: This is a widely adopted authorization framework that allows for secure authentication and authorization of users and applications. OAuth 2.0 uses access tokens to grant permissions to resources and is often used in conjunction with OpenID Connect for user authentication.

    - One example of using OAuth 2.0 in a REST API is when a user logs in to a web application using their Google or Facebook account. The user is redirected to the OAuth provider's website, where they authenticate themselves and grant the application permission to access their resources. The application receives an access token that can be used to access the user's resources, such as their profile information or email address.

  - JSON Web Tokens (JWT): JWT is a standard for creating secure access tokens that can be used to authenticate users and applications. JWTs are often used in REST APIs to provide secure access to resources without requiring the user to constantly re-authenticate.

    - An example of using JWT in a REST API is when a user logs in to a web application using their email and password. After successful authentication, the server creates a JWT containing the user's information and signs it with a secret key. The JWT is then sent back to the client, which can store it in a cookie or local storage. The client includes the JWT with each subsequent request to the server, which can verify the token's authenticity and extract the user's information from it.

    - Here are some reasons why we use security schemes in REST APIs:
      - Protect against unauthorized access: Security schemes such as authentication and authorization help ensure that only authorized users or applications are allowed to access the API's resources.
      - Prevent data breaches: By securing REST APIs, we can prevent unauthorized access to sensitive data and protect it from theft or misuse.
      - Comply with regulations: Many industries have regulations or standards that require the use of specific security measures to protect sensitive data. Securing REST APIs can help organizations comply with these regulations and avoid penalties.
      - Maintain trust with users: When users access an API, they expect their data to be protected and secure. By implementing security schemes, we can maintain the trust of users and protect their privacy.
      - Prevent attacks: REST APIs are vulnerable to a variety of attacks such as SQL injection, cross-site scripting (XSS), and cross-site request forgery (CSRF). By using security schemes, we can prevent these attacks and protect the API from malicious activity.

- what are pipe functions
  - In Node.js, pipes are a powerful mechanism for streaming data between different parts of an application. A pipe function in Node.js allows us to connect the output of one stream to the input of another stream, making it easy to process data in a pipeline.
  - Here's an example of using the pipe function in Node.js:
    const fs = require('fs');
    const readStream = fs.createReadStream('file.txt');
    const writeStream = fs.createWriteStream('copy.txt');
    readStream.pipe(writeStream);

- what are nodejs inbuilt modules you have used so far

  - fs: for interacting with the file system, such as reading and writing files.
  - http and https: for creating HTTP and HTTPS servers and making HTTP requests.
  - path: for working with file and directory paths.
  - stream: for working with streams of data, such as reading and writing large files or processing real-time data.

- How to manage the huge data in service API and what type of caching should be used in node
  When it comes to managing huge amounts of data in a service API, there are several strategies you can use to improve performance and reduce latency:

  - Use pagination: Instead of returning all the data in a single response, you can break it up into smaller chunks and return it in multiple responses. This can help reduce the amount of data being transferred and processed at any given time.
  - Use caching: Caching can be used to store frequently accessed data in memory or on disk, reducing the number of times it needs to be retrieved from the database. In Node.js, you can use a caching library like Redis or Memcached to implement caching.
  - Use compression: You can use compression to reduce the size of the data being transferred between the client and server. Node.js provides the built-in zlib module for compression.
  - Use indexing: If you're working with a database, you can use indexing to improve the performance of data queries. Indexing can help speed up data retrieval by creating a lookup table that maps data to specific keys.

- Unit testing and integration testing are two different types of testing in Node.js:
  - Integration testing: In integration testing, multiple units or modules of code are tested together to ensure that they work correctly when integrated with each other. Integration testing focuses on verifying that the different parts of the system work together as expected. In Node.js, you can use testing frameworks like Supertest, Superagent, or Frisby to write and run integration tests.

- Is nodejs is single threaded and why it is single threaded
  Yes, Node.js is single threaded. The reason for this is that Node.js is built on top of the V8 JavaScript engine, which is itself single threaded. This means that Node.js can only execute one piece of code at a time on a single CPU core.

  However, this does not mean that Node.js is incapable of handling concurrent requests or tasks. Node.js uses an event-driven, non-blocking I/O model that allows it to efficiently handle multiple requests at the same time without the need for multiple threads. When a request comes in, Node.js adds it to an event loop and continues executing the rest of the code. When the request is completed, the event loop notifies Node.js, which then sends the response back to the client.

  This approach allows Node.js to handle large numbers of concurrent connections with a minimal amount of resources, making it an ideal choice for building scalable web applications. Additionally, Node.js provides support for spawning child processes, which can be used to take advantage of multi-core CPUs for parallel processing.

- How to make node js working as multi threaded
  Node.js is designed to be a single threaded system, but there are ways to make it work with multiple threads. Here are a few ways to achieve multi-threading in Node.js:
  - Worker Threads: Node.js provides a built-in module called "worker_threads" that allows you to spawn multiple worker threads. Each worker thread runs in a separate thread of execution and can communicate with the main thread using a messaging API. This approach can be used to perform CPU-intensive tasks in parallel with the main thread.
  - Cluster Module: Node.js also provides a built-in "cluster" module that allows you to spawn multiple worker processes. Each worker process runs in a separate process and can communicate with the main process using inter-process communication (IPC). This approach can be used to handle large numbers of incoming connections by distributing the load across multiple worker processes.
  - External Libraries: There are several external libraries available for Node.js that provide multi-threading support. For example, the "threads" library provides a way to create and manage worker threads in Node.js. Similarly, the "pm2" library provides process management capabilities and can be used to manage multiple Node.js processes.  
    It's important to note that multi-threading comes with its own set of challenges, such as increased complexity and the potential for race conditions and other synchronization issues. Therefore, it's important to carefully evaluate the trade-offs before implementing multi-threading in your Node.js application.
