Scrawl Ninja:
- Two Separate Projects
  - Back: REST API
    - Just poops out JSON, doesn't render templates
    - Goal to be as lightweight as possible

    - Infrastructure Plan
      - DigitalOcean droplet
      - Domain Name: scrawl.ninja (DONE)

    - Tech Plan
      - Express
      - Knex (w/ Bookshelf?)
      - ES2015 (native via Node 6 -- only supported functionality)
      - Minimal and light
        - Minimal dependencies
        - Quick builds
        - Avoiding transpiling/grunt/gulp if possible

    - Storage
      - Maria
      - Tables
        - Posts
        - Comments

    - Test Plan
      - Mocha, expect (chai), spy/stub (sinon)
      - Run tests in isolation (migrations in before Each)

  - Front: React/Redux

    - Bundling
      - Webpack with babel

    - Tech Plan
      - Redux, React, ES2015 (transpiled for browser)
      - Hits API for notes, parses JSON and renders notes as react components
      - Redux state management

    - Product Plan
      - Supports Creating Notes, Searching Notes by Title
      - Shows X number of notes per page
        - Involves paginating API

    - Test Plan
      - Mocha, expect (chai), spy/stub (sinon)
      - Don't spend too much time figuring out testing with ES2015!

