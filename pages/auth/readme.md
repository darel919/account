#### DWS-Account Auth Flow:

To get authentication token, client app must do the following:

1\. Client app opens DWS-Account with rUrl as callback URL. for example: "https://accounts.darelisme.my.id/start?rUrl=https://monobar.darelisme.my.id". rURl should be saved to localStorage of DWS-Account.

2\. DWS-Account should fetch to backend API to get list of approved URLs. We must check if the rUrl is on a approved list. If yes, continue. If not, we display a DWS-Account error page saying "This URL is not authorized to use DWS authentication method."

3\. DWS-Account start auth by navigating to API OAuth endpoint. 

4\. API OAuth page will redirect to google authentication. After successful authentication, Google will redirect to API OAuth "/authorize" endpoint.

5\. After Google redirection to API OAuth endpoint, we redirect back to DWS-Account with token parameter. After we receive the token from callback param, we construct a auth callback to "(client url)/auth?at=(token)\&rt=null", delete the saved "rUrl" in localStorage. then we navigate back to the client's URL.

To get profile data, client app must fetch to API OAuth "/verify" endpoint.

