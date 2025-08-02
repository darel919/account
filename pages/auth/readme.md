#### DWS-Account Auth Flow (Updated):

The authentication flow with rUrl parameter handling:

1. Client app opens DWS-Account with rUrl as callback URL: "https://accounts.darelisme.my.id/start?rUrl=https://monobar.darelisme.my.id"

2. DWS-Account saves rUrl to localStorage and checks authentication by calling `/auth/app` endpoint with the rUrl in the Origin header:
   - If backend returns 200: URL is allowed, proceed with authentication
   - If backend returns 403: URL is not allowed, show error page

3. The backend determines URL authorization based on the Origin header containing the requesting URL.

4. Authentication callback processing is handled through the `/auth` route, which retrieves the saved rUrl from localStorage and redirects back to the client with the authentication token.

5. After successful authentication, the client receives the callback at "(client url)/auth?at=(token)&rt=null"

To get profile data, client app must fetch to API OAuth "/verify" endpoint.

