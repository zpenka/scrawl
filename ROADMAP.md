Scrawl Ninja:
- Two Separate Projects
  - Back: REST API
    - Just poops out JSON, doesn't render templates
    - Goal to be as lightweight as possible

    - Tech Plan
      - Express
      - Knex
      - ES2015 (native via Node 6 -- only supported functionality)
      - Minimal and light
        - Minimal dependencies
        - Quick builds
        - Avoiding transpiling/grunt/gulp if possible

    - Storage
      - Maria
      - Tables
        - Notes

    - Test Plan
      - Mocha, expect (chai), spy/stub (sinon)
      - Run tests in isolation (migrations in before Each)
