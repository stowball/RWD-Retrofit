/*
 * RWD Retrofit v1.7
 * Allows an existing "desktop site" to co-exist with a "responsive site", while also able to serve the desktop site to a different breakpoint on "mobile" - useful for serving the desktop site to tablets, for example
 *
 * Returns an object containing the desktop (rwdRetrofit.desktop) and optional mobile (rwdRetrofit.mobile) media queries as strings for responding to media queries with JS; for example, by using enquire.js (http://wickynilliams.github.com/enquire.js)
 *
 *
 * Usage:
 * 1. Set up the viewport with: <meta name="viewport" content="width=device-width, initial-scale=1" />
 * 2. Reference the existing desktop stylesheet with a <link> with a relevant media query, eg. media="all and (min-width: 990px)" and class="rwdretrofit-desktop"
 * 3. Reference the new responsive stylesheet with a <link> with a relevant media query, eg. media="all and (max-width: 989px)" and class="rwdretrofit-mobile"
 * 4. Add an optional data-breakpoint-width="xxx" attribute to the desktop stylesheet <link>, where xxx is the pixel width that the desktop breakpoint will occur on mobile devices - eg. 768 for iPads and other large tablets
 * 5. Add an optional data-viewport-width="xxx" attribute to the desktop stylesheet <link>, where xxx is the pixel width that the desktop viewport will be set to on mobile devices
 * 6. Add an optional data-debug="true" attribute to the desktop stylesheet <link> to force non-touch devices to use the data-breakpoint-width override
 *
 * Copyright (c) 2013 Izilla Partners Pty Ltd
 *
 * http://www.izilla.com.au
 *
 * Licensed under the MIT license
 */
;var rwdRetrofit = (function() {
	if (!document.querySelector || !document.getElementsByClassName || typeof(document.documentElement.clientWidth) == 'undefined')
		return;
	
	var meta = document.querySelector('meta[name="viewport"]'),
		desktop = document.getElementsByClassName('rwdretrofit-desktop'),
		mobile = document.getElementsByClassName('rwdretrofit-mobile');
	
	if (!meta || desktop.length === 0 || mobile.length === 0)
		return;
	
	var supportsTouch = 'ontouchstart' in window,
		content = 'content',
		media = 'media',
		initialContent = meta && meta.getAttribute(content),
		desktopContent = 'width=980',
		duration = 250,
		supportsOrientationChange = 'onorientationchange' in window,
		orientationEvent = supportsOrientationChange ? 'orientationchange' : 'resize',
		desktopMQ = desktop[0].getAttribute(media),
		mobileMQ = mobile[0].getAttribute(media),
		dataBreakpointWidth = desktop[0].getAttribute('data-breakpoint-width'),
		breakpointWidth,
		dataViewportWidth = desktop[0].getAttribute('data-viewport-width'),
		dataDebug = desktop[0].getAttribute('data-debug'),
		mediaQueries = {};
	
	if (supportsTouch || dataDebug === 'true') {
		if (dataBreakpointWidth)
			breakpointWidth = dataBreakpointWidth;
		else
			breakpointWidth = desktopMQ.replace(/.*?min-width:\s?(\d*).*/g, '$1');
					
		if (dataViewportWidth && parseInt(dataViewportWidth) >= parseInt(breakpointWidth)) {
			desktopContent = desktopContent.replace(/\d+/, dataViewportWidth);
		}
		else {
			if (breakpointWidth > 980)
				desktopContent = desktopContent.replace(/\d+/, breakpointWidth);
		}
	}
	else {
		breakpointWidth = desktopMQ.replace(/.*?min-width:\s?(\d*).*/g, '$1');
	}
	
	desktopMQ = desktopMQ.replace(/(min-width:\s?)\d*/g, '$1' + breakpointWidth);
	mobileMQ = mobileMQ.replace(/(max-width:\s?)\d*/g, '$1' + (breakpointWidth-1));
	
	mediaQueries.desktop = desktopMQ,
	mediaQueries.mobile = mobileMQ;
	
	if (supportsTouch || dataDebug === 'true') {
		for (var i=0; i < desktop.length; i++) {
			desktop[i].setAttribute(media, desktopMQ);
		}
		
		for (var j=0; j < mobile.length; j++) {
			mobile[j].setAttribute(media, mobileMQ);
		}
	}

	if (supportsTouch) {
		function switchViewport() {
			meta.setAttribute(content, initialContent);
			window.setTimeout(function() {
				if (document.documentElement.clientWidth >= breakpointWidth)
					meta.setAttribute(content, desktopContent);
			}, duration);
		}
		
		switchViewport();
		window.addEventListener(orientationEvent, switchViewport, false);
	}
	
	return mediaQueries;
})();