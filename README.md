# pitchfork-ratings
Quick user script to add visible ratings to the front page of Pitchfork.com

This is a modified version of http://userscripts.org/scripts/show/49052 updated so it only gets albums. Pitchfork stopped reviewing individual tracks so it was pointless to get the review for those tracks. You would also get "NaN.0" next to every individual track.

If the original author updates his/her script and wants me to take my modification down please just let me know. This was written for my own benefit.

**Changes**:

* I added an "orange" state for mediocre reviews. Now "green" is a review of 7 or higher, "orange" is 5-6.9 and red is below 5.
* Now if a page is unavailable from Pitchfork due to a server issue (500 errors were happening fairly regularly) the script tries again a few times on the failed pages. There is a counter to prevent it from attempting more than a few times to prevent infinite loops. I don't want to DOS attack Pitchfork.
* I've updated this script for the recent layout changes to Pitchfork.
* With version 1.06 I revised this to take into account their pages are now AJAX with state and history and I detect changes to the location object to see if you are on a review page now. This should keep the user from having to refresh the page to see review scores.
* Rewritten in jQuery to make it easier for me to maintain. No more messy and complicated regex to find the score in the response text.  Much easier to create and append the rating to the correct place.
* Relized there were problems with the script in Tampermonkey. I think this has been fixed.

**Usage**:

Install Tampermonkey or Greasemonkey. Go to the raw script in a browser https://github.com//csavio/pitchfork-ratings/raw/master/pitchfork-ratings.user.js and it should ask if you want to install the user script.

Alternately you can go to https://greasyfork.org/en/scripts/13195-show-my-pitchfork-score-search-in-spotify and click install this script. 
