sequenceDiagram
browser->>server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
Note right of browser: Browser sends a request to create a new note.
server->>browser: {content: "important note", date: "2023-09-12T08:02:05.111Z"}
Note left of server: Server sends the content and date as response `<br>` and browser just adds the new note by manipulating  `<br>` the javascript it fetched earlier.
