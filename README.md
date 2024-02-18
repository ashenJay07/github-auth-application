# GitHub Auth Application

&nbsp;

## How to create OAuth application in GitHub?

[Go to the link & Register a new application](https://github.com/settings/developers)

## Why React's Strict Mode should disable?

GitHub provides one-time code, but Strict mode rerender our application twice. So,

- In first render: We use one-time code & we get an access token
- In second render: We use the same one-time code & we get an error from server, because we already use the access token in first render
