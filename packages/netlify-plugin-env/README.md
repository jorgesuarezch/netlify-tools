# netlify plugin env

This plugin helps to have your env variables separated by deploy context in a seamless way.

## Why

It is pretty common to have multiple environments to test apps rigorously before promoting changes to production. This way, the app can be delivered with more confidence.

Netlify provides a great mechanism called [deploy contexts](https://docs.netlify.com/site-deploys/overview/#deploy-contexts). This mechanism allow to configure as many custom deploy contexts as you want, all you need is to add a new branch to your configuration. For instance, a branch called `staging` will match a deploy context called `staging`

That's great, isn't it? However there is a little limitation for configuring environment variables per deploy context. The only way to override an env variable for a context is through `netlify.toml`, which means code needs to be changed and sensitive information could be exposed.

So, this plugin aims to fix that.

**Note** [`@netlify-tools/cli`](../cli/README.md) can help with setting env variables by context

## How it works

In order for this plugin to work properly env variables names need to have the format: **`[VARIABLE]__[DEPLOY-CONTEXT]__`**, so the plugin will check the `process.env` and will set for `[VARIABLE]` the value of `[VARIABLE]__[DEPLOY-CONTEXT]__` if the current deploy context and **`[DEPLOY-CONTEXT]`** matches.

For instance:

```bash
AUTH_TOKEN=supersecret
AUTH_TOKEN__STAGING__=secret@
```

the plugin will override the `AUTH_SECRET` value with the one for `AUTH_TOKEN__STAGING__`.

```js
AUTH_SECRET === AUTH_TOKEN__STAGING__ === secret@
```

The next table show a few examples

| Deploy Context | Branch Deploy? | Variable                               | Notes                                                                                                                                        |
| -------------- | -------------- | -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| production     | ---            | AUTH_TOKEN`__PRODUCTION__`             | predefined deploy context                                                                                                                    |
| deploy-preview | ---            | AUTH_TOKEN`__DEPLOY-PREVIEW__`         | predefined deploy context                                                                                                                    |
| branch-deploy  | ---            | AUTH_TOKEN`__BRANCH-DEPLOY__`          | predefined deploy context                                                                                                                    |
| ---            | staging        | AUTH_TOKEN`__STAGING__`                |                                                                                                                                              |
| ---            | feature/login  | AUTH_TOKEN`__FEATURE-LOGIN__`          |                                                                                                                                              |
| deploy-preview | staging        | AUTH_TOKEN`__DEPLOY-PREVIEW-STAGING__` | allow combination between predefined deploy context and branch deploys. This is great for preview having different configuration per preview |

# Usage

## Add the plugin

Add a `[[plugins]]` entry to your `netlify.toml` file:

```toml
[[plugins]]
package = '@netlify-tools/netlify-plugin-env'
```
