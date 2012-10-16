RWD Retrofit
============

### Allows an existing "desktop site" to co-exist with a "responsive site", while also able to serve the desktop site to a different breakpoint on "mobile"

It's also able to serve the desktop site to a different breakpoint on "mobile" - useful for serving the desktop site to tablets, for example

Returns an object containing the desktop (`rwdRetrofit.desktop`) and optional mobile (`rwdRetrofit.mobile`) media queries as strings for responding to media queries with JS; for example, by using enquire.js (http://wickynilliams.github.com/enquire.js)

Requires: cssua.js (http://cssuseragent.org)

---

**Usage:**

1. Set up the viewport with: `<meta name="viewport" content="width=device-width, initial-scale=1" />`

2. Reference the existing desktop stylesheet with a `<link>` with a relevant media query, eg. `media="all and (min-width: 990px)"` and `class="rwdretro-desktop"`

3. Reference the new responsive stylesheet with a `<link>` with a relevant media query, eg. `media="all and (max-width: 989px)"` and `class="rwdretro-mobile"`

4. Add an optional `data-breakpoint-width="xxx"` attribute to the desktop stylesheet `<link>`, where xxx is the pixel-width that the desktop breakpoint will occur on mobile devices - eg. 768 for iPads and other large tablets

5. Add an optional `data-viewport-width="xxx"` attribute to the desktop stylesheet `<link>`, where xxx is the pixel width that the desktop viewport will be set to on mobile devices

6. Include cssua.js before rwd.retrofit.min.js

---

You can see it in action on: http://www.rubik.com.au