# Employee-Directory

# Requirement

Employee-Directory must display a list of "employees" from a database. A user should be able to view information about each employee. 

A user must be able to sort employees by at least one attribute.

A user must be able to filter employees by at least one attribute. 

# Implementation

The requirement's a bit sparse, so I filled in a fair amount of behavior. 

Functionality to do CRUD on employees isn't specifically asked for, so a seed file is provided to put some employees out there to view, sort, and filter. (Please see my Slack asking how to run a seed file in Heroku...(Fyi, I added screenshots to the docs folder showing the sorting and filtering behaviors.))

Despite it seemingly not being required, there IS CRUD code in the app. (My starting point was one of the activities that had CRUD in it; it was easier to leave in and make it work than delete it all.) A user can add, update and delete employees, and can open a employee detail page (with barely anything on it, TBH). 

A user can sort and filter by one of three attributes: first name, last name, and position. The choice of atttribute to act on is controlled by radio buttons. Choosing one of the sort radio buttons will sort directly. Choosing a filter radio button will use the value in a text field as the filter criteria. 

# Things I Don't Like So Much

I struggled with a few things in this homework, and also implemented a few things in ways I'd never do IRL. 

Filter is text-driven. If you want to filter by position, you have to type a position title and spell it right for it to work. I'd probably really want to do a dropdown loaded from a table.

Filter is not very robust in terms of doing things out of order. You do need to enter the filter criteria first, then click the radio button. 

Filter is an equality check-only. That is, it doesn't do a LIKE check. If you type "McLau" and hit the radio button, it'd be good to get any employees whose last names start with "McLau". Today that will return nothing. 

At first I tried to accomplish filtering and sorting by calls to the database. Not sure why now, tbh, it's not a great idea to keep hitting a DB for no reason. But I couldn't get the routing to work, so I switched to .filter () and .sort (). 

To reset from a filter (or sort, if that's what you want to do) I DO hit the database to reload the full dataset. Ideally, for a small dataset like this, I'd have two copies on the frontend, one for the entire datatset, which I could restore pretty easily without hitting the DB, and another that's the viewable dataset, on which I'd apply filtering and sorting criteria. 

I got some practice "mastering" radio buttons and updating state while figuring out how to make radio buttons one-at-a-time within groups. The UI tool I used to work in handled that for you automatically. I wonder if React has something like that built in? 

