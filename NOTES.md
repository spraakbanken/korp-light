## Some quick notes

- Icons are from feathericons.co (MIT license) and lucide (ISC license) and Bootstrap (MIT)
- We used the korp logo to make the one for korpi.
- We use two global contexts, the CorporaContext(contains all selected corpora) and the SettingsContext (contains all selected Settings). We tried to use state object (with react-router) between Landing and ResultsPage, but this was more difficult than I'd predicted. That's why a lot of code is duplicated between these two pages.
- Selection of corpora are hardcoded (frontend/src/services/) in peterCorpora.json (for Peter's genre-based divisions of corpus) and testdata.json (large json object of corpora at Språkbanken).
- pages:
  - ErrorPage: not used properly, we had this set up for undefined endpoints (see src/pages/routes.jsx)
  - SettingsPage: not used, was for internal testing of components, now Settings is a modal
  - HelpPage: not used
  - LandingPage and ResultsPage have a lot of duplicated code, especially in regard to the search query (see handleSubmit(event) function). In this function, we are building the url for the results (navigate('/') function) when the using hits enter. This function is not called when an item in the user's history is clicked, this is a bug we havent been able to fix. Instead, the resultspage shows a cached version of the results.
  - The bulk of the logic is shared between ResultsCard, ResultsPanel and ResultsPage. These parts of korpi are hardest to decipher and are in dire need of refactor.
    - ResultsCard are the individual entries seen in the results list, if språkbanken API is selected, these cards can be clicked to show Title, Datum, Författare and Källa.
    - ResultsPanel are a collection of multiple cards from the same corpora, but it also shows the StatisticsPanel and DefintionPanel.
    - ResultsPage is the entire page but also shows the individual ResultsPanels.
  - We have not sanitized the input to the search boxes in korpi,

## Bugs

- History is using localStorage to create a search_history object. Sometimes the history is resurrected when the user closes the webbrowser and opens up korpi again, even though the individual items were deleted. I don't know how to fix this bug.
- ProgressBar component does not run when the user searches from LandingPage, it only works when new searches are made from the resultspage.
- When extendedsearch is turned on and then turned off, korpi cannot search for simple queries again! I think this is due to how we have set up the code, with extendedsearch we are using the wordsDict state. See AdvancedSearch.jsx component where this state is defined.
- I suspect the extendedsearch bug might be due to the query condition here, since once extendedserach is clicked, wordsDict becomes active and the default state always has an empty object (length > 1).
  ```javascript
  let query;
  if (wordsDict && Object.keys(wordsDict).length > 1) {
    query = buildQuery(wordsDict);
  } else {
    query = `[word = "${event}"]`;
  }
  ```
- I think you should be able to define a new, custom wordsDict state from the beginning and use it for both simple and advanced searches.
  Statistics needs to button presses, I'm not sure why it doesn't fetch everything on the first click. We are using ChartJS for the graphs. The statistics query is directly made to Korp WebAPI with getStatisticsOverTime in /services/api.
