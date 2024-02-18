# GitHub Auth Application

&nbsp;

## How to create OAuth application in GitHub?

[Go to the link & Register a new application](https://github.com/settings/developers)

&nbsp;

## Why React's Strict Mode should disable?

GitHub provides one-time code, but Strict mode rerender our application twice. So,

- In first render: We use one-time code & we get an access token
- In second render: We use the same one-time code & we get an error from server, because we already use the access token in first render

&nbsp;

## What we should knew when working with github auth?

- After authentication, GitHub redirect us to home page with a **code** (code = one-time code ==> only be used once)
- We use that code to get the access token
