
The following exercise is meant to evaluate the candidates ability to structure a codebase, write readable, testable, beautiful code that's scalable and maintainable.

### Description

_You will build:_ Advanced Countdown App

A multipage application, with a bottom navigation bar, including 2 tabs. 

The first tab will include a configuration page. The page should include the following:
1. A date picker, where both date and time can be specified
2. A button that says "start"

When the "start" button is pressed, it should simulate an Api request (with the date as a parameter), and the simulated Api response returns the date of the request body + 2 minutes.

When the simulated Api response is received, with the date in the response body, the App should start counting down to that date.

The second page, should include a list of all active countdowns, with each row representing one countdown based on an Api response. The list will grow the more "start" is pressed on page one. Once countdown reaches 0 for a row, the row should automatically be removed.

Lastly, a global view, present on all screens (no matter which tab is selected, even if a subpage is navigated to from the first or second page) should be present. The global view should display the countdown closest to the expiring across all active countdowns.

Note:
- All views must always reflect the latest data
- Implement unit tests for all business logic

### Instructions

1. Note the time you started the task
2. Start by noting your initial thoughts on how you're going to solve this task in a README file
3. Solve the task
4. Note the time when the task was finished
5. Prepare presenting the case for the next meeting (explain the code)