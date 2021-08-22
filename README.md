### Description

Backend for the Typenote application. Uses MongoDB for the database, and mongoose for connection. Express web framework for handling requests. Currently, I have no plans to expose any end points to the public. Every post method should be JSON.

---

### Authentication

For authentication there are two end points

-   Creating a new account: `/user/sign-up`
-   Signing an existing user: `/user/sign-in`

---

### Sign-up

For signing up or creating a new account, `/user/sign-up` path should be used.
Required Params:

-   List item
