# Testing (TODO)

- Write doc for testing strategy, highlight the following points:
  - Unit test is for truly unit stuffs, utilities, etc.
  - Integration test is Studio alone, isolated from backends, we should mock network calls
  - Cypress/E2E test is for interacting with the whole stack and be able to play/see the result -> good for demoing in a sense
  - `TODO` Mock server request instead of engine method, maybe this is the better way to write test?
    https://kentcdodds.com/blog/stop-mocking-fetch?ck_subscriber_id=564011516
    https://github.com/mswjs/msw
