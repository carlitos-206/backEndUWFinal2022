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

https://famous-tanuki-4913b3.netlify.app/

### For Users

#### Querying the API

##### 🔥 Fires

Get **all fires**:

```bash
curl http://localhost:8000/fires/
```

<details><summary>Example responses</summary>
<p>

🙂 Returns array of all fire data:

```bash
[{"_id":"62fb42131c5b7ea309f7e0e0","total_acres":null,"containment_datetime":"2014-08-24T18:59:59Z","control_datetime":"2014-08-24T19:01:00Z","daily_acres":0.1,"discovery_acres":null,"estimated_cost_to_date":null,"final_fire_report_approved_date":null,"fire_origin":{"cause":"Natural","general":null,"specific":null},"fire_discovery_datetime":"2014-07-17T20:07:59Z","fire_out_datetime":"2014-08-28T18:59:59Z","incident_name":"DUNCAN HILL 2-ENTIAT","location":{"latitude":null,"longitude":null,"city":null,"county":"Chelan","state":"US-WA"},"predominant_fuel_group":null,"modified_by_system":"wfdss","created_on_datetime":"2014-08-29T01:20:27Z","modified_on_datetime":"2014-08-29T18:46:06Z","source":"IRWIN","admin":{"created":"2022-08-16T07:06:59.277Z","modified":null}},{"_id":"62fb42181c5b7ea309f7e0e1","total_acres":null,"containment_datetime":null,"control_datetime":null,"daily_acres":1,"discovery_acres":1,"estimated_cost_to_date":null,"final_fire_report_approved_date":null,"fire_origin":{"cause":"Unknown","general":null,"specific":null},"fire_discovery_datetime":"2019-10-01T15:21:24Z","fire_out_datetime":null,"incident_name":"KAN RX - NOISY JOHN SALVAGE","location":{"latitude":48.81701,"longitude":-117.2443,"city":null,"county":"Pend Oreille","state":"US-WA"},"predominant_fuel_group":null,"modified_by_system":"wildcad","created_on_datetime":"2019-10-01T15:23:02Z","modified_on_datetime":"2020-11-02T15:51:28Z","source":"IRWIN","admin":{"created":"2022-08-16T07:07:04.286Z","modified":null}},{"_id":"62fb42181c5b7ea309f7e0e4","total_acres":null,"containment_datetime":"2014-07-06T03:40:00Z","control_datetime":"2014-07-06T03:45:00Z","daily_acres":0.5,"discovery_acres":null,"estimated_cost_to_date":null,"final_fire_report_approved_date":null,"fire_origin":{"cause":"Human","general":null,"specific":null},"fire_discovery_datetime":"2014-07-05T23:38:00Z","fire_out_datetime":"2014-07-10T19:38:59Z","incident_name":"JOHNSON CANYON","location":{"latitude":null,"longitude":null,"city":null,"county":"Kittitas","state":"US-WA"},"predominant_fuel_group":null,"modified_by_system":"wfdss","created_on_datetime":"2014-07-06T00:52:19Z","modified_on_datetime":"2014-07-19T21:40:56Z","source":"IRWIN","admin":{"created":"2022-08-16T07:07:04.288Z","modified":null}},{"_id":"62fb42181c5b7ea309f7e0e5","total_acres":null,"containment_datetime":"2017-08-02T21:10:00Z","control_datetime":"2017-08-02T22:54:59Z","daily_acres":0.1,"discovery_acres":0.1,"estimated_cost_to_date":null,"final_fire_report_approved_date":null,"fire_origin":{"cause":"Human","general":null,"specific":null},"fire_discovery_datetime":"2017-08-02T20:23:32Z","fire_out_datetime":"2017-08-06T17:29:00Z","incident_name":"GLENROSE ROAD","location":{"latitude":47.63531,"longitude":-117.3354,"city":null,"county":"Spokane","state":"US-WA"},"predominant_fuel_group":null,"modified_by_system":"wildcad","created_on_datetime":"2017-08-02T20:39:33Z","modified_on_datetime":"2017-08-14T17:03:46Z","source":"IRWIN","admin":{"created":"2022-08-16T07:07:04.288Z","modified":null}},{"_id":"62fb42181c5b7ea309f7e0e6","total_acres":null,"containment_datetime":null,"control_datetime":null,"daily_acres":null,"discovery_acres":null,"estimated_cost_to_date":null,"final_fire_report_approved_date":null,"fire_origin":{"cause":null,"general":null,"specific":null},"fire_discovery_datetime":"2019-08-31T19:01:00Z","fire_out_datetime":null,"incident_name":"781 MYERS RD","location":{"latitude":null,"longitude":null,"city":null,"county":"Yakima","state":"US-WA"},"predominant_fuel_group":null,"modified_by_system":"wfdss","created_on_datetime":"2019-08-31T23:22:30Z","modified_on_datetime":"2019-08-31T23:22:57Z","source":"IRWIN","admin":{"created":"2022-08-16T07:07:04.289Z","modified":null}},{"_id":"62fb42181c5b7ea309f7e0e7","total_acres":null,"containment_datetime":"2019-06-05T21:45:00Z","control_datetime":"2019-06-05T22:20:00Z","daily_acres":0.25,"discovery_acres":0.3,"estimated_cost_to_date":null,"final_fire_report_approved_date":null,"fire_origin":{"cause":"Human","general":null,"specific":null},"fire_discovery_datetime":"2019-06-05T20:47:04Z","fire_out_datetime":"2019-06-10T16:44:00Z","incident_name":"CRAIG","location":{"latitude":47.67908,"longitude":-117.6248,"city":null,"county":"Spokane","state":"US-WA"},"predominant_fuel_group":null,"modified_by_system":"wildcad","created_on_datetime":"2019-06-05T23:38:36Z","modified_on_datetime":"2019-08-05T15:44:04Z","source":"IRWIN","admin":{"created":"2022-08-16T07:07:04.289Z","modified":null}},{"_id":"62fb42181c5b7ea309f7e0e3","total_acres":null,"containment_datetime":"2014-08-14T17:29:59Z","control_datetime":"2014-08-14T22:54:59Z","daily_acres":0.1,"discovery_acres":null,"estimated_cost_to_date":null,"final_fire_report_approved_date":null,"fire_origin":{"cause":"Natural","general":null,"specific":null},"fire_discovery_datetime":"2014-08-13T20:06:59Z","fire_out_datetime":"2014-08-14T23:45:00Z","incident_name":"Poached Bear","location":{"latitude":null,"longitude":null,"city":null,"county":"Pend Oreille","state":"US-WA"},"predominant_fuel_group":null,"modified_by_system":"wfdss","created_on_datetime":"2014-08-14T16:28:21Z","modified_on_datetime":"2014-08-14T23:59:02Z","source":"IRWIN","admin":{"created":"2022-08-16T07:07:04.287Z","modified":null}},{"_id":"62fb42181c5b7ea309f7e0e2","total_acres":null,"containment_datetime":"2016-09-30T01:30:00Z","control_datetime":"2016-09-30T02:29:59Z","daily_acres":0.1,"discovery_acres":0.1,"estimated_cost_to_date":null,"final_fire_report_approved_date":null,"fire_origin":{"cause":"Undetermined","general":null,"specific":null},"fire_discovery_datetime":"2016-09-30T00:07:08Z","fire_out_datetime":"2016-10-31T21:30:00Z","incident_name":"OAKVILLE","location":{"latitude":46.87337,"longitude":-123.2764,"city":null,"county":"Grays Harbor","state":"US-WA"},"predominant_fuel_group":null,"modified_by_system":"wildcad","created_on_datetime":"2016-09-30T18:45:38Z","modified_on_datetime":"2016-11-01T14:54:41Z","source":"IRWIN","admin":{"created":"2022-08-16T07:07:04.287Z","modified":null}},{"_id":"62fb42181c5b7ea309f7e0e8","total_acres":null,"containment_datetime":null,"control_datetime":null,"daily_acres":null,"discovery_acres":0.1,"estimated_cost_to_date":null,"final_fire_report_approved_date":null,"fire_origin":{"cause":"Undetermined","general":null,"specific":null},"fire_discovery_datetime":"2016-10-14T20:32:00Z","fire_out_datetime":null,"incident_name":"2017 BLM Incident Support","location":{"latitude":47.65659,"longitude":-117.3587,"city":null,"county":"Spokane","state":"US-WA"},"predominant_fuel_group":null,"modified_by_system":"firecode","created_on_datetime":"2016-10-14T20:33:47Z","modified_on_datetime":"2016-10-14T20:34:54Z","source":"IRWIN","admin":{"created":"2022-08-16T07:07:04.289Z","modified":null}},{"_id":"62fb42181c5b7ea309f7e0e9","total_acres":null,"containment_datetime":null,"control_datetime":null,"daily_acres":null,"discovery_acres":null,"estimated_cost_to_date":null,"final_fire_report_approved_date":null,"fire_origin":{"cause":null,"general":null,"specific":null},"fire_discovery_datetime":"2015-05-09T17:26:00Z","fire_out_datetime":null,"incident_name":"RUSSELL","location":{"latitude":null,"longitude":null,"city":null,"county":"Yakima","state":"US-WA"},"predominant_fuel_group":null,"modified_by_system":"firecode","created_on_datetime":"2015-05-09T20:43:00Z","modified_on_datetime":"2015-05-09T20:47:16Z","source":"IRWIN","admin":{"created":"2022-08-16T07:07:04.290Z","modified":null}}]
```

❌ Failure—verify database is connected:

```bash
{"error":"Failed to retrieve fire data."}
```
</p>
</details>

Get fires by **specific month and year**:

```bash
# Note the /in/:month/:year format:
curl http://localhost:8000/fires/in/Jul/2014
```

<details><summary>Example responses</summary>
<p>

🙂 Returns array of fires within specified month and year:

```bash
[{"_id":"62fb42131c5b7ea309f7e0e0","total_acres":null,"containment_datetime":"2014-08-24T18:59:59Z","control_datetime":"2014-08-24T19:01:00Z","daily_acres":0.1,"discovery_acres":null,"estimated_cost_to_date":null,"final_fire_report_approved_date":null,"fire_origin":{"cause":"Natural","general":null,"specific":null},"fire_discovery_datetime":"2014-07-17T20:07:59Z","fire_out_datetime":"2014-08-28T18:59:59Z","incident_name":"DUNCAN HILL 2-ENTIAT","location":{"latitude":null,"longitude":null,"city":null,"county":"Chelan","state":"US-WA"},"predominant_fuel_group":null,"modified_by_system":"wfdss","created_on_datetime":"2014-08-29T01:20:27Z","modified_on_datetime":"2014-08-29T18:46:06Z","source":"IRWIN","admin":{"created":"2022-08-16T07:06:59.277Z","modified":null}},{"_id":"62fb42181c5b7ea309f7e0e1","total_acres":null,"containment_datetime":null,"control_datetime":null,"daily_acres":1,"discovery_acres":1,"estimated_cost_to_date":null,"final_fire_report_approved_date":null,"fire_origin":{"cause":"Unknown","general":null,"specific":null},"fire_discovery_datetime":"2019-10-01T15:21:24Z","fire_out_datetime":null,"incident_name":"KAN RX - NOISY JOHN SALVAGE","location":{"latitude":48.81701,"longitude":-117.2443,"city":null,"county":"Pend Oreille","state":"US-WA"},"predominant_fuel_group":null,"modified_by_system":"wildcad","created_on_datetime":"2019-10-01T15:23:02Z","modified_on_datetime":"2020-11-02T15:51:28Z","source":"IRWIN","admin":{"created":"2022-08-16T07:07:04.286Z","modified":null}},{"_id":"62fb42181c5b7ea309f7e0e4","total_acres":null,"containment_datetime":"2014-07-06T03:40:00Z","control_datetime":"2014-07-06T03:45:00Z","daily_acres":0.5,"discovery_acres":null,"estimated_cost_to_date":null,"final_fire_report_approved_date":null,"fire_origin":{"cause":"Human","general":null,"specific":null},"fire_discovery_datetime":"2014-07-05T23:38:00Z","fire_out_datetime":"2014-07-10T19:38:59Z","incident_name":"JOHNSON CANYON","location":{"latitude":null,"longitude":null,"city":null,"county":"Kittitas","state":"US-WA"},"predominant_fuel_group":null,"modified_by_system":"wfdss","created_on_datetime":"2014-07-06T00:52:19Z","modified_on_datetime":"2014-07-19T21:40:56Z","source":"IRWIN","admin":{"created":"2022-08-16T07:07:04.288Z","modified":null}},{"_id":"62fb42181c5b7ea309f7e0e5","total_acres":null,"containment_datetime":"2017-08-02T21:10:00Z","control_datetime":"2017-08-02T22:54:59Z","daily_acres":0.1,"discovery_acres":0.1,"estimated_cost_to_date":null,"final_fire_report_approved_date":null,"fire_origin":{"cause":"Human","general":null,"specific":null},"fire_discovery_datetime":"2017-08-02T20:23:32Z","fire_out_datetime":"2017-08-06T17:29:00Z","incident_name":"GLENROSE ROAD","location":{"latitude":47.63531,"longitude":-117.3354,"city":null,"county":"Spokane","state":"US-WA"},"predominant_fuel_group":null,"modified_by_system":"wildcad","created_on_datetime":"2017-08-02T20:39:33Z","modified_on_datetime":"2017-08-14T17:03:46Z","source":"IRWIN","admin":{"created":"2022-08-16T07:07:04.288Z","modified":null}},{"_id":"62fb42181c5b7ea309f7e0e6","total_acres":null,"containment_datetime":null,"control_datetime":null,"daily_acres":null,"discovery_acres":null,"estimated_cost_to_date":null,"final_fire_report_approved_date":null,"fire_origin":{"cause":null,"general":null,"specific":null},"fire_discovery_datetime":"2019-08-31T19:01:00Z","fire_out_datetime":null,"incident_name":"781 MYERS RD","location":{"latitude":null,"longitude":null,"city":null,"county":"Yakima","state":"US-WA"},"predominant_fuel_group":null,"modified_by_system":"wfdss","created_on_datetime":"2019-08-31T23:22:30Z","modified_on_datetime":"2019-08-31T23:22:57Z","source":"IRWIN","admin":{"created":"2022-08-16T07:07:04.289Z","modified":null}},{"_id":"62fb42181c5b7ea309f7e0e7","total_acres":null,"containment_datetime":"2019-06-05T21:45:00Z","control_datetime":"2019-06-05T22:20:00Z","daily_acres":0.25,"discovery_acres":0.3,"estimated_cost_to_date":null,"final_fire_report_approved_date":null,"fire_origin":{"cause":"Human","general":null,"specific":null},"fire_discovery_datetime":"2019-06-05T20:47:04Z","fire_out_datetime":"2019-06-10T16:44:00Z","incident_name":"CRAIG","location":{"latitude":47.67908,"longitude":-117.6248,"city":null,"county":"Spokane","state":"US-WA"},"predominant_fuel_group":null,"modified_by_system":"wildcad","created_on_datetime":"2019-06-05T23:38:36Z","modified_on_datetime":"2019-08-05T15:44:04Z","source":"IRWIN","admin":{"created":"2022-08-16T07:07:04.289Z","modified":null}},{"_id":"62fb42181c5b7ea309f7e0e3","total_acres":null,"containment_datetime":"2014-08-14T17:29:59Z","control_datetime":"2014-08-14T22:54:59Z","daily_acres":0.1,"discovery_acres":null,"estimated_cost_to_date":null,"final_fire_report_approved_date":null,"fire_origin":{"cause":"Natural","general":null,"specific":null},"fire_discovery_datetime":"2014-08-13T20:06:59Z","fire_out_datetime":"2014-08-14T23:45:00Z","incident_name":"Poached Bear","location":{"latitude":null,"longitude":null,"city":null,"county":"Pend Oreille","state":"US-WA"},"predominant_fuel_group":null,"modified_by_system":"wfdss","created_on_datetime":"2014-08-14T16:28:21Z","modified_on_datetime":"2014-08-14T23:59:02Z","source":"IRWIN","admin":{"created":"2022-08-16T07:07:04.287Z","modified":null}},{"_id":"62fb42181c5b7ea309f7e0e2","total_acres":null,"containment_datetime":"2016-09-30T01:30:00Z","control_datetime":"2016-09-30T02:29:59Z","daily_acres":0.1,"discovery_acres":0.1,"estimated_cost_to_date":null,"final_fire_report_approved_date":null,"fire_origin":{"cause":"Undetermined","general":null,"specific":null},"fire_discovery_datetime":"2016-09-30T00:07:08Z","fire_out_datetime":"2016-10-31T21:30:00Z","incident_name":"OAKVILLE","location":{"latitude":46.87337,"longitude":-123.2764,"city":null,"county":"Grays Harbor","state":"US-WA"},"predominant_fuel_group":null,"modified_by_system":"wildcad","created_on_datetime":"2016-09-30T18:45:38Z","modified_on_datetime":"2016-11-01T14:54:41Z","source":"IRWIN","admin":{"created":"2022-08-16T07:07:04.287Z","modified":null}},{"_id":"62fb42181c5b7ea309f7e0e8","total_acres":null,"containment_datetime":null,"control_datetime":null,"daily_acres":null,"discovery_acres":0.1,"estimated_cost_to_date":null,"final_fire_report_approved_date":null,"fire_origin":{"cause":"Undetermined","general":null,"specific":null},"fire_discovery_datetime":"2016-10-14T20:32:00Z","fire_out_datetime":null,"incident_name":"2017 BLM Incident Support","location":{"latitude":47.65659,"longitude":-117.3587,"city":null,"county":"Spokane","state":"US-WA"},"predominant_fuel_group":null,"modified_by_system":"firecode","created_on_datetime":"2016-10-14T20:33:47Z","modified_on_datetime":"2016-10-14T20:34:54Z","source":"IRWIN","admin":{"created":"2022-08-16T07:07:04.289Z","modified":null}},{"_id":"62fb42181c5b7ea309f7e0e9","total_acres":null,"containment_datetime":null,"control_datetime":null,"daily_acres":null,"discovery_acres":null,"estimated_cost_to_date":null,"final_fire_report_approved_date":null,"fire_origin":{"cause":null,"general":null,"specific":null},"fire_discovery_datetime":"2015-05-09T17:26:00Z","fire_out_datetime":null,"incident_name":"RUSSELL","location":{"latitude":null,"longitude":null,"city":null,"county":"Yakima","state":"US-WA"},"predominant_fuel_group":null,"modified_by_system":"firecode","created_on_datetime":"2015-05-09T20:43:00Z","modified_on_datetime":"2015-05-09T20:47:16Z","source":"IRWIN","admin":{"created":"2022-08-16T07:07:04.290Z","modified":null}}]
```

❌ Failure—verify database is connected:

```bash
{"error":"Failed to retrieve fire data."}
```
</p>
</details>


Get a **single fire event**:

```bash
# /fires/:fireId format, :fireId being a fire's unique id:
curl http://localhost:8000/fires/62fb42181c5b7ea309f7e0e8
```

<details><summary>Example responses</summary>
<p>

🙂 Returns object of fire's data:

```bash
{"_id":"62fb42181c5b7ea309f7e0e8","total_acres":null,"containment_datetime":null,"control_datetime":null,"daily_acres":null,"discovery_acres":0.1,"estimated_cost_to_date":null,"final_fire_report_approved_date":null,"fire_origin":{"cause":"Undetermined","general":null,"specific":null},"fire_discovery_datetime":"2016-10-14T20:32:00Z","fire_out_datetime":null,"incident_name":"2017 BLM Incident Support","location":{"latitude":47.65659,"longitude":-117.3587,"city":null,"county":"Spokane","state":"US-WA"},"predominant_fuel_group":null,"modified_by_system":"firecode","created_on_datetime":"2016-10-14T20:33:47Z","modified_on_datetime":"2016-10-14T20:34:54Z","source":"IRWIN","admin":{"created":"2022-08-16T07:07:04.289Z","modified":null}}
```

❌ Not found—verify `:fireId` in request is correct and that database is
connected:

```bash
{"error":"Failed to retrieve fire data."}
```
</p>
</details>

##### 🗨️ Comments

Get **all comments** for a **single fire event**:

```bash
# Use /fires/:fireId/comments to get the comments of the fire with :fireId:
curl http://localhost:8000/fires/62fb42131c5b7ea309f7e0e0/comments
```

<details><summary>Example responses</summary>
<p>

🙂 Returns array of all comments about the fire with `:fireId`:

```bash
[{"_id":"630250491f3d48c59da2eec7","username":"User1","text":"Khanh Test fire comments","fire_id":"62fb42131c5b7ea309f7e0e0","createdDate":"2022-08-22T07:00:00.000Z"},{"_id":"63041c5a1f1480d6cecaa999","text":"testest","fire_id":"62fb42131c5b7ea309f7e0e0","username":"User1","createdDate":"2022-08-23T00:16:26.173Z"}]
```

❌ No comments found for given `:fireId`:

```bash
{"error":"No comments found for fireid: 62fb42131c5b7ea309f7e0e0"}
```
</p>
</details>

Get a **single comment**:

```bash
# Use /fires/comments/:commentId to get the comment with the same :commentId:
curl http://localhost:8000/fires/comments/630250491f3d48c59da2eec7
```

<details><summary>Example responses</summary>
<p>

🙂 Returns comment object with `:commentId`:

```bash
{"_id":"630250491f3d48c59da2eec7","username":"example_user","text":"This is a comment.","fire_id":"62fb42131c5b7ea309f7e0e0","createdDate":"2022-08-22T07:00:00.000Z"}
```

❌ No comments found for given `:commentId`:

```bash
{"error":"No comments found for commentId: 630250491f3d48c59da2eec7"}
```
</p>
</details>

Get **all comments** posted by a **single user**:

```bash
# Use /fires/comments/user/:username to get all comments posted by :username:
curl http://localhost:8000/fires/comments/user/User1
```

<details><summary>Example responses</summary>
<p>

🙂 Returns array of comments posted by the user with `:username`:

```bash
[{"_id":"630250491f3d48c59da2eec7","username":"User1","text":"Khanh Test fire comments","fire_id":"62fb42131c5b7ea309f7e0e0","createdDate":"2022-08-22T07:00:00.000Z"},{"_id":"630314f418fa079d5f4b4b47","username":"User1","text":"Khanh Test get All Comments by userid","fire_id":"62fb42221c5b7ea309f7e0f3","createdDate":"2022-08-21T07:00:00.000Z"},{"_id":"63041c5a1f1480d6cecaa999","text":"testest","fire_id":"62fb42131c5b7ea309f7e0e0","username":"User1","createdDate":"2022-08-23T00:16:26.173Z"},{"_id":"630a10d2b0cbaf4fe936e835","text":"Khanh test unittest creating comment","fire_id":"62fb42181c5b7ea309f7e0e8","username":"User1","createdDate":"2022-08-27T12:40:50.741Z"}]
```

❌ No comments by `:username` found:

```bash
{"error":"No comments found for username: User1"}
```
</p>
</details>

**Create** a **new comment**:

```bash
# REQUIRED: JSON object with a "text" property containing comment's text.
# (/fires/:fireId/user/:username/comments)
curl -X POST -H "Content-Type: application/json" -d '{"text":"Wow! What a hot fire!"}' http://localhost:8000/fires/62fb42131c5b7ea309f7e0e0/user/User1/comments
```

<details><summary>Example responses</summary>
<p>

🙂 Returns comment's `newObjectId` and a success `message`:

```bash
{"newObjectId":"630a9846237279c09dc6e821","message":"Comment created! ID: 630a9846237279c09dc6e821"}
```

❌ `:username` is blank in request:

```bash
{"error":"UserName must not be blank."}
```

❌ Comment `text` is blank in request:

```bash
{"error":"Comments must not be blank."}
```

❌ Comment won't post. Validate syntax of request and backend status:

```bash
{"error":"Something went wrong. Please try again."}
```
</p>
</details>

**Edit** a **comment**:

```bash
# Edit a comment specified by its :commentId.
# (/fires/comments/:commentId)
curl -X PUT -H "Content-Type: application/json" -d '{"text": "Updated comment..."}' http://localhost:8000/fires/comments/6303d66a816e5c3e74ac0980
```

<details><summary>Example responses</summary>
<p>

🙂 Returns object of updated comment with `commentId`:

```bash
{"_id":"630250491f3d48c59da2eec7","username":"example_user","text":"This is a comment.","fire_id":"62fb42131c5b7ea309f7e0e0","createdDate":"2022-08-22T07:00:00.000Z"}
```

❌ Cannot update comment. Verify that comment exists and backend is working:

```bash
{"error":"Something went wrong. 0 comment was updated. Please try again."}
```

❌ Failure—check status of backend:

```bash
{"error":"Something went wrong. Please try again!"}
```
</p>
</details>

**Delete** a **comment**:

```bash
# Delete a comment specified by its :commentId.
# (/fires/comments/:commentId)
curl -X DELETE http://localhost:8000/fires/comments/6303d66a816e5c3e74ac0980
```

<details><summary>Example responses</summary>
<p>

🙂 Returns message confirming deletion:

```bash
{"message":"Deleted 1 comment."}
```

❌ Cannot delete comment. Verify that comment exists:

```bash
{"error":"Something went wrong. 0 comments were deleted. Please try again."}
```
</p>
</details>

##### 🔖 Bookmarks

Get a **bookmark**:

```bash
# Get a bookmark specified by its :bookmarkId.
# (/fires/bookmarks/bookmarkId)
curl http://localhost:8000/fires/bookmarks/6303ec16a84112a7a4be6753
```

<details><summary>Example responses</summary>
<p>

🙂 Returns object of bookmark's data:

```bash
{"_id":"6303ec16a84112a7a4be6753","username":"User1","fire_id":"62fb42181c5b7ea309f7e0e8","createdDate":"2022-08-21T07:00:00.000Z"}
```

❌ Bookmark with given `:bookmarkId` not found:

```bash
{"error":"Failed to retrieve bookmark!"}
```
</p>
</details>

Get **all of a user's bookmarks**:

```bash
# Get :username's bookmarks using /fires/user/:username/bookmarks:
curl http://localhost:8000/fires/user/User1/bookmarks
```

<details><summary>Example responses</summary>
<p>

🙂 Returns array of `:username`'s bookmarks:

```bash
[{"_id":"6303ec16a84112a7a4be6753","username":"User1","fire_id":"62fb42181c5b7ea309f7e0e8","createdDate":"2022-08-21T07:00:00.000Z"},{"_id":"6303f55f984a6bbf4f98e6f6","fire_id":"62fb42131c5b7ea309f7e0e0","username":"User1","createdDate":"2022-08-22T21:30:07.487Z"},{"_id":"63095e9d1b9bf737af33097c","fire_id":"62fb42181c5b7ea309f7e0e9","username":"User1","createdDate":"2022-08-27T00:00:29.066Z"}]
```

❌ Bookmarks from `:username` not found:

```bash
{"error":"Failed to retrieve bookmarks for a username: badUsername"}
```

❌ Server failure:

```bash
{"error":"Failed to retrieve bookmark!"}
```
</p>
</details>

Get **all of a fire's bookmarks**:

```bash
# Get :fireId's bookmarks using /fires/:fireId/bookmarks:
curl http://localhost:8000/fires/62fb42181c5b7ea309f7e0e8/bookmarks
```

<details><summary>Example responses</summary>
<p>

🙂 Returns array of bookmarks of fire with given `:fireId`:

```bash
[{"_id":"6303ec16a84112a7a4be6753","username":"User1","fire_id":"62fb42181c5b7ea309f7e0e8","createdDate":"2022-08-21T07:00:00.000Z"},{"_id":"6303efeea84112a7a4be6754","username":"User2","fire_id":"62fb42181c5b7ea309f7e0e8","createdDate":"2022-08-22T07:00:00.000Z"}]
```

❌ Bookmarks of `:fireId` not found:

```bash
{"error":"Failed to retrieve bookmarks for fire_id: 62fb42181c5b7ea309f7e0e8"}
```

❌ Server failure:

```bash
{"error":"Failed to retrieve bookmark!"}
```
</p>
</details>

**Create** a **new bookmark**:

```bash
# REQUIRES:
# • Empty JSON object ('{}')
# • Existing :username & :fireId
# URI FORMAT: /fires/:fireId/user/:username/bookmarks
curl -X POST -H "Content-Type: application/json" -d '{}' http://localhost:8000/fires/62fb42131c5b7ea309f7e0e0/user/User1/bookmarks
```

<details><summary>Example responses</summary>
<p>

🙂 Returns bookmark's `newObjectId` and a success `message`:

```bash
{"newObjectId":"630aa05d237279c09dc6e823","message":"Bookmark created! ID: 630aa05d237279c09dc6e823"}
```

❌ `:username` in request is blank:

```bash
{"error":"UserName must not be blank."}
```

❌ Cannot create new bookmark—verify backend is connected to database:

```bash
{"error":"Something went wrong. Please try again."}
```
</p>
</details>

**Delete** a **bookmark**:

```bash
# Delete :bookmarkId's bookmark using /fires/bookmarks/:bookmarkId.
curl -X DELETE http://localhost:8000/fires/bookmarks/6303e187a84112a7a4be6752
```

<details><summary>Example responses</summary>
<p>

🙂 Returns `message` confirming deletion of bookmark:

```bash
{"message":"Deleted one bookmark."}
```

❌ Cannot delete bookmark—verify bookmark exists:

```bash
{"error":"Something went wrong. 0 bookmarks were deleted. Please try again."}
```
</p>
</details>

##### 👥 Users

**Register** a user:

```bash
curl -X POST -H "Content-Type: application/json" -d '{"username":"example", "email":"example@example.com","password":"supersecretpswd!", "firstName":"Carlos", "lastName":"Caceres"}' http://localhost:8000/users/register
```

<details><summary>Example responses</summary>
<p>

🙂 Returns user's `newObjectId` and a success `message`:

```bash
{"newObjectId":"630a8b31cb9c53a0e62a53e3","message":"User created! ID: 630a8b31cb9c53a0e62a53e3"}
```

❌ Email already exists:

```bash
{"Error":"Email already exists"}
```

❌ Error. Verify `username`, `password`, `email`, `firstName` & `lastName` aren't missing from your request:

```bash
{"Error":"Failed to Create User"}
```
</p>
</details>

**Sign in** as a user:

```bash
curl -X POST -H "Content-Type: application/json" -d '{"usernameOrEmail":"user1","password":"secrets!"}' http://localhost:8000/users/login
```

<details><summary>Example responses</summary>
<p>

🙂 Returns signed-in user's `username` and `email`:

```bash
{"username":"my_username","email":"example@example.com"}
```

❌ User not found, given specified parameters:

```bash
{"error":"Failed to locate user"}
```
</p>
</details>

### For Developers

#### Setting Up & Running

You'll need to serve the **backend** and **frontend** to run the app locally and
develop its functionality.

1. **Serve the backend:**
  * Enter `/backend`: `cd backend`
  * `npm install` to install all backend packages
  * `npm start` to serve the backend at `https://localhost:8000`
2. **Serve the frontend:**
  * Enter `/frontend/fire-app`: `cd frontend/fire-app`
  * `npm install` to install all frontend packages
  * `npm start` to serve the frontend at `https://localhost:3000`

You should now be able to access the app's frontend at `http://localhost:3000`
and use the app's full functionality.

**‽** *Frontend isn't getting data* - Confirm backend is being served @ 
`https://localhost:8000`. If it's not, run `npm start` in `/backend`.

**‽** *Backend/frontend won't serve* - Confirm your `8000` & `3000` ports
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
