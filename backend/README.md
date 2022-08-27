# Washington Wildfires Community

## Problem: Washington's Wildfires

<!--
Determine your problem statement  (Product person leads this process)
  * Include this in the repo's README.md
  * No strict formatting requirements, but must cover:
    * Scope: Who is experiencing this problem? How many people? What type of 
    people (e.g. elderly, Nicaraguans, new parents, etc)?
    * Impact: How does this problem impact these potential customers?
    * Causes: What are some of the causes of this problem?
    * Other solutions: Are there other available solutions? Why are they not 
    sufficient??
-->

The Washington state Deparment of Natural Resources responds to an average of 
`1,541 wildfires` per year, and this number is expected to rise: More trees 
fall, decay, and become ample fuel for wildland fires due to extreme weather 
patterns reducing annual snowpack, driving up disease, invasive parasites, and
hotter, drier summers.[^1] As climate change challenges our local forests to 
recover from annual fire seasons, these fuel sources pile up and ignite, 
resulting in catastrophic events like the 2020 West Coast fire season.[^2]

During the 2020 Labor Day windstorm fires across Washington scorched over 
`500,000 acres` in the span of less than `36 hours`, burning down the 
communities of Malden and Pine City and destroying `181 homes`.[^3] These winds 
traveled the West Coast, fanning historic fires in Oregon and California that 
burnt a total of `10,000,000 acres` and cost nearly `$20 billion in damages` by 
the time the year was over.[^4] [^5] The smoke resulting from these fires 
produced readings over `200 AQI` in local major cities;[^6] a level of particle
pollution deemed “Very Unhealthy” and described as increasing “the risk of 
health effects for everyone” by the Environmental Protection Agency.[^7]

**The problem:** How can we provide information about wildfires throughout 
Washington state’s history in a way that’s...:

1. Accessible to the public,
2. Helpful to the public in analyzing fires of the past?

[^1]: (2022). *Wildfire at-a-glance.* Washington State Department of Natural 
Resources. https://www.dnr.wa.gov/publications/rp_fire_wildfire_at_a_glance.pdf
[^2]: Williams, A., et al. (2019). Observed impacts of anthropogenic climate 
change on wildfire in California. *Earth's Future, Volume 7* (Issue 8). 892-910.
https://doi.org/10.1029/2019EF001210
[^3]: O'Sullivan, Joseph. (2022). *Washington state's wildfires have now 
destroyed more than 626,000 acres, 181 homes.* The Seattle Times. 
https://www.seattletimes.com/seattle-news/environment/washington-states-wildfires-have-now-destroyed-more-than-626000-acres181-homes/
[^4]: (2022). *Billion-dollar weather and climate disasters.* National Centers 
for Environmental Information. https://www.ncei.noaa.gov/access/billions/events
[^5]: (2020). *National large incident year-to-date report.* Geographic Area 
Coordination Center. https://web.archive.org/web/20201229021815/https://gacc.nifc.gov/sacc/predictive/intelligence/NationalLargeIncidentYTDReport.pdf
[^6]: Cline, S., & Flaccus, G. (2020). 
*Seeping under doors, bad air from West's fires won't ease up.* 
Associated Press. 
https://apnews.com/article/portland-wildfires-health-washington-oregon-41d19571e31aa18ba762c4e5b0282e8f
[^7]: (2018). *Air quality index basics.* Environmental Protection Agency.
https://web.archive.org/web/20180618144741/https://airnow.gov/index.cfm?action=aqibasics.aqi

## Solution: Washington Wildfires Community

<!--
Design a solution (Database & Front End people lead this process)
  * Include this in the repo's README.md
  * General overview of what you plan to build
  * Description of the databases that will be built and the collections they'll 
  contain, planned schema for documents in the collections, and source for this 
  data (manually creating from information found on the Washington Department of 
  Fish & Wildlife website? importing a publicly available dataset of Tweets? 
  converting then importing from a publicly available API of Library of Congress
  catalog?)
  * List of endpoints the API will have
  * List of any external tools that will be necessary (not libraries, like 
  React, but separate systems or third party tools, like a second database
  * Describe the functionality that the front end app will have
-->


**Washington Wildfires Community** is an interactive map of Washington State's 
historic wildfires with data sourced from Wildland Fire Interagency Geospatial 
Services (WFIGS). We've filtered the data to make it leaner and more specific to
Washington state. Registered users will be able to make comments on the data 
provided.

* 🔥 Features data on fires from the last 5 years, including dates, ignition 
causes, cost of damages, location, and more
* 🔎 Examine fires by month & year
* 🗨️ Sign up, log in, and start a discussion on recent fires
* 🔖 Revisit fires of your interest using bookmarks

### Live Website

{{URL_TO_DEPLOYED_APP}}

### For Users

#### Querying the API

##### 🔥 Fires

Get **all fires**:

```bash
curl http://localhost:5000/fires/
```

Get fires by **specific month and year**:

```bash
# Note the /in/:month/:year format:
curl http://localhost:5000/fires/in/Jul/2014
```

Get a **single fire event**:

```bash
# /fires/:fireId format, :fireId being a fire's unique id:
curl http://localhost:5000/fires/62fb42181c5b7ea309f7e0e8
```

##### 🗨️ Comments

Get **all comments** for a **single fire event**:

```bash
# Use /fires/:fireId/comments to get the comments of the fire with :fireId:
curl http://localhost:5000/fires/62fb42131c5b7ea309f7e0e0/comments
```

Get a **single comment**:

```bash
# Use /fires/comments/commentId to get the comment with the same :commentId:
curl http://localhost:5000/fires/comments/630250491f3d48c59da2eec7
```

Get **all comments** posted by a **single user**:

```bash
# Use /fires/comments/user/:username to get all comments posted by :username:
curl http://localhost:5000/fires/comments/user/User1
```

**Create** a **new comment**:

```bash
# REQUIRED: JSON object with a "text" property containing comment's text.
# (/fires/:fireId/user/:userId/comments)
curl -X POST -H "Content-Type: application/json" -d '{"text":"Wow! What a hot fire!"}' http://localhost:5000/fires/62fb42131c5b7ea309f7e0e0/user/User1/comments
```

**Edit** a **comment**:

```bash
# Edit a comment specified by its :commentId.
# (/fires/comments/:commentId)
curl -X PUT -H "Content-Type: application/json" -d '{"text": "Updated comment..."}' http://localhost:5000/fires/comments/6303d66a816e5c3e74ac0980
```

**Delete** a **comment**:

```bash
# Delete a comment specified by its :commentId.
# (/fires/comments/:commentId)
curl -X DELETE http://localhost:5000/fires/comments/6303d66a816e5c3e74ac0980
```

##### 🔖 Bookmarks

Get a **bookmark**:

```bash
# Get a bookmark specified by its :bookmarkId.
# (/fires/bookmarks/bookmarkId)
curl http://localhost:5000/fires/bookmarks/6303ec16a84112a7a4be6753
```

Get **all of a user's bookmarks**:

```bash
# Get :username's bookmarks using /fires/user/:username/bookmarks:
curl http://localhost:5000/fires/user/User1/bookmarks
```

Get **all of a fire's bookmarks**:

```bash
# Get :fireId's bookmarks using /fires/:fireId/bookmarks:
curl http://localhost:5000/fires/62fb42181c5b7ea309f7e0e8/bookmarks
```

**Create** a **new bookmark**:

```bash
# REQUIRES: Empty JSON object ('{}').
# URI FORMAT: /fires/:fireId/user/:userId/bookmarks
curl -X POST -H "Content-Type: application/json" -d '{}' http://localhost:5000/fires/62fb42131c5b7ea309f7e0e0/user/User1/bookmarks
```

**Delete** a **bookmark**:

```bash
# Delete :bookmarkId's bookmark using /fires/bookmarks/:bookmarkId.
curl -X DELETE http://localhost:5000/fires/bookmarks/6303e187a84112a7a4be6752
```

### For Developers

#### Setting Up & Running

You'll need to serve the **backend** and **frontend** to run the app locally and
develop its functionality.

1. **Serve the backend:**
  * Enter `/backend`: `cd backend`
  * `npm install` to install all backend packages
  * `npm start` to serve the backend at `https://localhost:5000`
2. **Serve the frontend:**
  * Enter `/frontend/fire-app`: `cd frontend/fire-app`
  * `npm install` to install all frontend packages
  * `npm start` to serve the frontend at `https://localhost:3000`

You should now be able to access the app's frontend at `http://localhost:3000`
and use the app's full functionality.

**‽** *Frontend isn't getting data* - Confirm backend is being served @ 
`https://localhost:5000`. If it's not, run `npm start` in `/backend`.

**‽** *Backend/frontend won't serve* - Confirm your `5000` & `3000` ports
aren't being used by other applications. If they are, quit the other
applications or change the ports the backend and frontend use. The backend port
can be changed in `/backend/server.js`.

#### Testing

**Testing the API routes:**
  * Enter `/backend`: `cd backend`
  * `npm test` from `/backend` to run the Jest test suite
  * Test files are located in `/backend/routes`

**‽** *Tests aren't running* - Make sure `/backend` package dependencies are
installed. Run `npm install` in `/backend`, then try `npm test` again.

## Project Timeline

<!--
Plan a work timeline(Project Manager leads this process)
  * Include this in the repo's README.md
  * Create a high level work timeline. List the work items that you plan to 
  complete, organized by each of the 5 remaining weeks until the presentation 
  (Sept 6).
-->

| Duration (WK)| MainTasks      | Sub Tasks     | Sub Task Items |Primary Resource |
| :----------- | :------------: | :------------ | :------------  | :------------   |
| WK6   	      |   DataBase     |               |                | Carlos          |
|              |                | Data Selection|                | Carlos          |
|              |                | Data Download |                | Carlos          |
|              |                | Data Transform|                | Carlos          |
|              |                | Data Load MGg |                | Carlos          | 
| WK6 - WK7    |   API          |               |                |                 |
|              |                | Router        |                | Joel            |
|              |                |               | GET            | Joel            |
|              |                |               | POST           | Joel            |
|              |                |               | PUT            | Khanh           |
|              |                |               | DELETE         | Khanh           |
|              |                | Interface     |                | Khanh           |
|              |                |               | GET            | Joel            |
|              |                |               | POST           | Joel            |
|              |                |               | PUT            | Khanh           |
|              |                |               | DELETE         | Khanh           |
| WK6 - WK7    |  Deploy        |               |                | Khanh\Joel      |
| WK6          |                |  Web Hosting  |                | Khanh           |
| WK7          |                |  Authenticate |                | Joel            |
| WK6 - WK8    |   Front End    |               |                | Meghan/Carlos   |
| WK6          |                | Template Desg |                | Meghan/Carlos   |
| WK6          |                | Login         |                | Meghan/Carlos   |
| WK6          |                | Fire Event Dis|                | Meghan/Carlos   |
| WK6          |                | Balloon for   |                | Meghan/Carlos   |
|              |                | Details       |                |                 |
| WK7          |                | Modify Btn    |                | Meghan/Carlos   |
| WK7 - WK8    |                | Delete Btn    |                | Meghan/Carlos   |
| WK7 - WK8    |                | Design Doc    |                | Meghan/Carlos   |
| WK7 - WK8    |  Unit Test     |               |                | Joel/Khanh      |
| WK7          |                |               | GET            | Joel            |
| WK7          |                |               | POST           | Joel            |
| WK7          |                |               | PUT            | Khanh           |
| WK8          |                |               | DELETE         | Khanh           |
| WK9          |  Presentation  |               |                | Team B          |
