# SimplePWA7
Merging the CoffeeMath base into a SimplePWA4

Current State:
correctly presents random questions and advances quiz when correct answer is supplied, the report is logged to console

Next Step:
once the quiz is complete a report needs to be presented to the user, to acheive this we need a card that is controled by css to hide/show the settings menu and the contents of the card are then injected as questionCard and reportCard



To Do:
create a html only version that only sends queries to a server for clients without javascript

- [ ] add uninstall function when install option is unchecked

- [x] set up css sibling selector to hide/show settings menu and fix gear double click glitch

- [ ] localforage to store settings & history

- [ ] shake answer for a couple seconds to indicate wrong answer

- [ ] turn answer red until changed to indicate a wrong response and prevent answer submision until answer changed

- [ ] add snackbar feedback and encouragement https://www.w3schools.com/howto/howto_js_snackbar.asp

- [ ] change the onselect and (possibly) hover styleing to blue red and green instead of default

- [ ] use css vars to simplify the color scheme
