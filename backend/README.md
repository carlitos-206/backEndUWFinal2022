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

## Solution: {APP_NAME}

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

**Washington Wildfires Community** is an interactive map of Washington State's historic wildfires 
with data sourced from Wildland Fire Interagency Geospatial Services (WFIGS).
We've filtered the data to make it leaner and more specific to Washington state.
Registered users will be able to make comments on the data provided.

* 🔥 Features data on fires from the last 5 years, including dates, ignition 
causes, cost of damages, location, and (maybe) more  
* 🔎 Examine fires by response region
* 📊 Sign up, log in, and modify regional fire data as a user

### Technologies

* *MongoDB* for fire data
* *Firestore* for user authentication

### Routes

So far:
"/GET "
`/signin`

"/POST "
`/register`

"/GET "
`/:fireID`

"/GET"
/allFires

"/POST"
`/:firestoreID/createComment/:fireID`

"/PUT"
`/:firestoreID/update/:commentId/:fireID`

"/DElETE"
`/:firestoreID/delete/:commentID`


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
