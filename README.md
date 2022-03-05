# CoffeeMath v1.1

CoffeeMath is a simple tool to give people a short burst of math practice in the morning or whenever you want to hone your mathematical skills 

Current State:
CM is an installable PWA that presents questions from the default subjects list then presents an overview

Next Step:
clean up code base



To Do:


Javascript Improvements
- [ ] CLEAN UP CODE BASE
- [ ] add uninstall function when install option is unchecked
- [ ] localforage to store settings & history
- [ ] shake answer for a couple seconds to indicate wrong answer
- [ ] turn answer red until changed to indicate a wrong response and prevent answer submision until answer changed
- [ ] add snackbar feedback and encouragement https://www.w3schools.com/howto/howto_js_snackbar.asp
- [ ] add link from each question to a view that details more information about the question and what was wrong with the answer
- [ ] make it so each part of the question can be hovered over to present a hint or description of what is going on in this part of the problem
- [ ] make it add a lesson component that explains each concept in more detail, this should start out as a text description with animated examples
- [ ] get elements of overview card to line up in the center ov the screen instead of each being centered on their own
- [ ] link to http only version should be default and gear should be revealed by javascript
- [ ] have setOverviewCard() add the overview class to app div, then remove it to show next quiz
- [ ] add ability to move to another quiz from the overview card
- [ ] find a more robust way of caching files that doesn't fail if one file is unavailable 
- [ ]  check for alt-tab and ctrl-shift-i here, these keystrokes on difficult questions could indicate cheating.
- [ ]  inject questionCard and overviewcard into app div with the setupQuestionCard() and setupOverviewCard() respectively
- [ ]  add class correctAnswer or incorrectAnswer repectively to input box until answer changes


HTML Improvements
- [ ] add custom icons
- [ ] create a link to an http only version of the app that does not require client side javascript (probably a node application on the server)
- [ ] Add invisible label to answer box indicate use to screen readers


CSS Improvements
- [x] set up css sibling selector to hide/show settings menu and fix gear double click glitch
- [ ] color contrast of 4.5:1 between background color and text color
- [ ] use css vars to simplify the color scheme
- [ ] use css imports to separate stylesheet into multiple stylesheets to increas readability
- [ ] change the onselect and (possibly) hover styleing to blue red and green instead of default
- [ ] create a lightmode that is light blue and a darkmode

Subjects to add:
- [ ] percentile
- [ ] percent of 
- [ ] percentage
- [ ] probability
- [ ] tipping
- [ ] geometry
- [ ] graphing
- [ ] lying with graphs
- [ ] fractions (cooking examples)
- [ ] interest & compound interest
- [ ] amatorization
- [ ] other practical applications
- [ ] formula trivia
