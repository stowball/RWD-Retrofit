RWD Retrofit
============

### Allows an existing "desktop site" to co-exist with a "responsive site", while also able to serve the desktop site to a different breakpoint on "mobile"

It's also able to serve the desktop site to a different breakpoint on mobile touch devices - useful for serving the desktop site to tablets, for example

Returns an object containing the desktop (`rwdRetrofit.desktop`) and optional mobile (`rwdRetrofit.mobile`) media queries as strings for responding to media queries with JS; for example, by using enquire.js (http://wickynilliams.github.com/enquire.js)

---

**Usage:**

1. Set up the viewport with: `<meta name="viewport" content="width=device-width, initial-scale=1" />`

2. Reference the existing desktop stylesheet in a `<link>` with a relevant media query, eg. `media="all and (min-width: 990px)"` and `class="rwdretrofit-desktop"`

3. Reference the new responsive stylesheet in a `<link>` with a relevant media query, eg. `media="all and (max-width: 989px)"` and `class="rwdretrofit-mobile"`

4. Add an optional `data-breakpoint-width="xxx"` attribute to the desktop stylesheet `<link>`, where xxx is the pixel-width that the desktop breakpoint will occur on mobile devices - eg. 768 for iPads and other large tablets

5. Add an optional `data-viewport-width="xxx"` attribute to the desktop stylesheet `<link>`, where xxx is the pixel width that the desktop viewport will be set to on mobile devices

6. Add an optional data-debug="true" attribute to the desktop stylesheet `<link>` to force non-touch devices to use the `data-breakpoint-width` override

---

You can see it in action on: http://www.rubik.com.au