sequenceDiagram

browser->> server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note
Note right of browser: Browser sends a post request to the server (add a new note).

server->> browser: HTTP Redirect https://studies.cs.helsinki.fi/exampleapp/notes
note right of browser: Server redirects the browser to /exampleapp/notes (provided  in the location header).

browser->>server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/notes
server->>browser: HTML-code
browser->>server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
server->>browser: main.css
browser->>server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.js
server->>browser: main.js

Note right of browser: browser starts executing js-code that requests JSON data from the server
browser ->>server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
server->>browser: [{ content: "Web development is fun", date: "2020-05-23" }, ...]

Note right of browser: browser executes the event handler which renders notes in the web page`
