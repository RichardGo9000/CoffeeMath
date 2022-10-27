# CoffeeMath v1.5.1

CoffeeMath is a simple tool to give people a short burst of math practice in the morning or whenever you want to hone your mathematical skills 

Current State:
settings menu has event listener to check when topics are clicked by the user, also localforage is included in js files

Next Step:
have quiz check localforage to determin which topics to display

Next Step:
 - [ ] Add geometry questions for square(perimeter, area & find the missing value)


To Do:


Javascript Improvements
- [x] CLEAN UP CODE BASE
- [ ] add skip function when submit is entered twice in quick succession
- [ ] add uninstall function when install option is unchecked
- [ ] localforage to store settings & history
- [ ] shake answer for a couple seconds to indicate wrong answer
- [ ] turn answer red until changed to indicate a wrong response and prevent answer submision until answer changed
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
- [ ]  add toast notification https://izitoast.marcelodolza.com/ 
- [ ]  import localforage from 'https://cdn.skypack.dev/pin/localforage@v1.9.0-Ua6HaBzFSvfonEYhVE2t/min/localforage.js';

HTML Improvements
- [ ] add custom icons
- [x] create a link to an http only version of the app that does not require client side javascript (probably a node application on the server)
- [ ] Add invisible label to answer box indicate use to screen readers
- [ ] create a serverbased version that uses no clientside javascript


CSS Improvements
move gear icon down a little so its not over the battery icon in mobile while keyboard is up
- [x] contrast ratio of 4.5:1 https://contrast-ratio.com/
- [x] set up css sibling selector to hide/show settings menu and fix gear double click glitch
- [ ] color contrast of 4.5:1 between background color and text color
- [ ] use css vars to simplify the color scheme
- [ ] use css imports to separate stylesheet into multiple stylesheets to increas readability
- [ ] change the onselect and (possibly) hover styleing to blue red and green instead of default
- [ ] create a lightmode that is light blue and a darkmode
- [ ] add a stylesheet from javascript that contains more advances css 
- [ ] have a basic css stylesheet in index.html for older browsers

Content Improvements:
- [ ] add difficulty level  
  - [ ] (answer in integers, one half, one quarter,  one decimal place, 2 decimal places 3 decimal places etc)
  - [ ] begin with small numbers 1-9, then 2 then 3 digit numbers 
  - [ ] start with positive numbers then include negative numbers

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
- [ ] Karatsuba algorithm for multiplying large numbers https://getpocket.com/explore/item/mathematicians-discover-the-perfect-way-to-multiply?utm_source=pocket-newtab
