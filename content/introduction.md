## API Reference

The FreshCom API is organized around [REST](http://en.wikipedia.org/wiki/Representational_State_Transfer). The API has predictable, resource-oriented URLs, and uses HTTP response codes to indicate API errors. We use built-in HTTP features, like HTTP authentication and HTTP verbs, which are understood by off-the-shelf HTTP clients. We support [cross-origin resource sharing](http://en.wikipedia.org/wiki/Cross-origin_resource_sharing), allowing you to interact securely with our API from a client-side web application. JSON is returned by all API responses, including errors.


The FreshCom API tries to follow [JSONAPI v1.0 Specification](http://jsonapi.org/) as much as possible. It is recommended you briefly read through the spec to understand the general format of the API.

## Recommended Tools for Web

FreshCom recommends the following tools for your client-side web application:

- [VueJS](https://vuejs.org/) - Progressive front-end framework.
- [Vue Router](https://router.vuejs.org) - Official router for VueJS.
- [Vuex](https://vuex.vuejs.org) - Centralized State Management for Vue.js.
- [axios](https://github.com/mzabriskie/axios) - Promise based HTTP client.

Most of FreshCom's [official client-side web applications](https://google.ca) are built using VueJS as the core framework.
However the FreshCom API works with any modern client-side stack. Please check out the [Getting Started](https://google.ca)
guide for more detail.

