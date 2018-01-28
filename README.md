# Think about write software specification before build it

In my opinion, view from top-down or outside-in a NodeJs app is:
1. server = app + port
2. app = router + many middleware
3. middleware = otherLibrary + intergrationOtherLibraryCode
4. otherLibrary = configOf(otherLibrary) + (logger | mailer | persitentIntergration (repository | service ) | thirtPartyCodeIntergration) 

Just like a end user, i can't know completely what i want to build until i saw a little a part of software, i used it, i experiment with it after that i want to have a little change so software engineer(builder) will 

