# IT2810 Project 2

This web application was created during the course IT2810 Web Development at NTNU. The purpose of the application is to visually display interesting statistics from a provided GitLab repository.

![Screenshot](https://user-images.githubusercontent.com/30391413/193851335-1531515b-2751-4186-ada9-2821d08a6793.png)

## Content and functionality

The web application is compatible with all major browsers, and has been tested on multiple computers and mobile phones with different screen/window sizes. We have attempted to create a visually pleasing interface with consistent and deliberate use of colors, fonts and shadows.

The app consists of two main pages: the login page and the stats page.

### Login page

The login page has a form with input fields for the GitLab repository URL and an access token used to authenticate the user. The login page provides validation of the URL and token, and displays an error alert if the submitted credentials are invalid. If the credentials are valid, the user is redirected to the stats page. The URL and token is stored in localStorage and will therefore persist until the user clicks the "Exit repo" button in the navigation bar.

### Stats page

The StatsPage is the main attraction of the application. It features a tab interface with two tabs, Graphs and Leaderboard. The Graphs tab shows a graph where you can display commits, merge requests or issues. This can then be aggregated by weekday, author or time of day. The Leaderboard tab shows a podium with the top 3 contributors to the repository. The leaderboard can be sorted by commits, merge requests or issues closed. The selected tab and the sorting attributes are persistent until the browser tab is closed, allowing the user to refresh the page without losing the provided parameters.

## Technology

The app is written in React with TypeScript and mostly utilizes functional React components. We have used the class component syntax for one component, namely the Navbar component used on the stats page. This decision was made since the functionality of this component is rather primitive, and thus it would work fine as a class component.

We have used a variety of React hooks in the project:

- useState for making sure that state is handled properly
- useEffect for side effects when a page renders or a variable is changed, such as API calls
- useContext for making sure that the repoURI and repoToken are
  available by all components
  - We made our context handle all writing and reading from localStorage. This was done to make sure that the context was the only thing that had to be changed if we wanted to change the way we stored the data.
- useMemo for expensive filtering/processing of data from API

### Libraries

We have used the following third party libraries:

- [Material UI](https://mui.com) for certain elements like alerts, loading indicators and icons
- [Recharts](https://recharts.org/en-US/) for the graph in the StatsPage under the graph tab
- [React Router](https://reactrouter.com/en/main) for routing between pages
- [React Tabs](https://www.npmjs.com/package/react-tabs) for the tab interface on the stats page

### Responsive design

The web application is compatible with all major browsers, and has been tested on multiple computers and mobile phones with different screen/window sizes. We have dealt with responsive design by using the following features/properties:

- Viewport property in HTML
- CSS Media queries
- CSS Flexbox
- `vw` and `vh` units

TODO: Have we really used vw/vh?

### HTML5 Web Storage

The application utilizes both localStorage and sessionStorage to allow persistance. In localStorage we store the user provided repository URL and its access token. This is done to make sure that the user can continue from where they left off, even if they close and re-open the browser. In sessionStorage we save the current tab the user is on and what options they have chosen in the dropdown menus. This is done to make sure that the user can refresh the page without the options resetting to the defaults.

### GitLab API

The GitLab API is called using Javascript's built-in Fetch API. This API makes it easy to load external data in an asynchronous way (AJAX).

TODO: Add endpoints

### Testing

We have implemented both component testing and snapshot testing with Jest and React Testing Library.

#### Component tests

Component tests are useful to rapidly test React components, making sure that the component is rendered correctly when certain props are provided. We have written one component test to get a feel for the setup and general idea of component testing.

#### Snapshot tests

Snapshot tests compares the current HTML DOM tree to a snapshot of the DOM tree at an earlier stage of development. This is particularly useful with a project that is close to finished, but still being maintained. Snapshot testing will make it easy to discover breaking changes before they are deployed to production. In this project, we have implemented snapshot tests for the login page and the stats page.

### GitLab CI/CD

To improve the workflow regarding Git and merge requests, we have implemented a CI/CD pipeline in GitLab that does the following:

1. Checks formatting rules by running Prettier on all files in the project.

2. Checks for code quality issues by running ESLint.

3. Runs all automated tests (component tests and snapshot tests).

4. Tries to build a production version of the React app.

5. Deploys the application to the virtual machine provided by the course staff (only on `main` branch).

If any of these checks fail, GitLab will refuse to merge the merge request. This enforces a certain level of code quality throughout the project, and helps catching bugs and other issues before they are merged to the production branch.
