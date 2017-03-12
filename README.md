# Ibis Analytics 2.0
This Ibis Analytics tool builds on top of [Shark Analytics](https://github.com/sharkanalytics/sharkanalytics) on MEAN stack and can be installed on any website and allows site owners to track visits to their page. Angular-ChartJS and Plotly are used for visual graph display.  
The information tracked include:

* Time spent on each page
* Geographic location of each independent user
* Visits to pages
* Clicks to links 

Potential Future improvements:

* Time spent on each session
* Enable time scale change between hour/day/month/year on the line graph
* Strengthen security

## Team
Bobby Phan, Tyler MacKay, Sherry Hsu

## Usage
The Ibis Analytics dashboard displays data sent back from `IbisAnalytics.js` script. 
To track the data on your website and view statistics on the dashboard:

1. Sign up an account on the [Ibises Analytics](https://ibises-analytics.herokuapp.com/) dashboard
2. Input the domain name of your website on the Profile page after `http://`. Don't include leading and trailing slashes
    * For instance: `swankbuyify.herokuapp.com`
3. Download the `IbisAnalytics.js` script and include it in the root html page e.g. `index.html`
    * If your website is a Single Page App, include the script on the index.html 
    * If it has multiple pages, include the script on every page
4. That's it! Happy Tracking!

## Examples
Deploy: `https://ibises-analytics.herokuapp.com/` 

Tracked websites: [Buyify](http://swankbuyify.herokuapp.com/) and [Mastermind](http://master-mind.herokuapp.com/)

## Development
Here are some things to be aware of:
* Security should be enhanced so that each user only has access to their registered domain on the dashboard

## To set up a local deploy of analytics dashboard
1. `npm install`
2. `npm start`
