sequenceDiagram

browser->>server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa

Note right of browser: Browser requests the page
server->>browser: HTML-code
browser->>server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css

Note right of browser: Browser requests the CSS
server->>browser: main.css
browser->>server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa.js

Note right of browser: Browser requests the JS
server->>browser: main.js

Note right of browser: browser starts executing js-code that requests JSON data from server
browser ->>server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
server->>browser: [{ content: "HTML is easy", date: "2019-05-23" }, ...]

Note right of browser: browser executes the event handler that renders notes to display
