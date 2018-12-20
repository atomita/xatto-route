/*
xatto-route v1.0.0
https://github.com/atomita/xatto-route
Released under the MIT License.
*/
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('xatto')) :
    typeof define === 'function' && define.amd ? define(['exports', 'xatto'], factory) :
    (factory((global['xatto-route'] = {}),global.xatto));
}(this, (function (exports,xatto) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
                t[p[i]] = s[p[i]];
        return t;
    }

    function Route(_a, children) {
        var _b = _a.xa, context = _b.context, extra = _b.extra, props = __rest(_a, ["xa"]);
        var location = props.location || context.location || extra.location || document.location || window.location;
        var flags = props.flags || '';
        var pattern = props.pattern;
        if (null == pattern) {
            pattern = '';
        }
        else if (pattern instanceof RegExp) {
            flags = flags || pattern.flags || '';
            pattern = pattern.source;
        }
        pattern = pattern[0] === '^' ? pattern.slice(1) : pattern;
        pattern = pattern[0] === '/' ? pattern.slice(1) : pattern;
        pattern = new RegExp("^/" + pattern);
        var match = pattern.exec(location.pathname);
        if (!match) {
            return false;
        }
        var route = {
            location: location,
            match: match,
            params: match.groups || {},
            path: match[0],
            pattern: pattern,
        };
        return xatto.x(xatto.x, {}, children.map(function (child) {
            child.props.route = route;
            return child;
        }));
    }

    function getOrigin(loc, location) {
        var protocol = (loc.protocol && ':' !== loc.protocol) ? loc.protocol : location.protocol;
        var host = [loc.hostname, loc.port].filter(Boolean).join(":")
            || [location.hostname, location.port].filter(Boolean).join(":");
        return protocol + "//" + host;
    }
    function RouteLink(_a, children) {
        var extra = _a.xa.extra, props = __rest(_a, ["xa"]);
        return (xatto.x("a", __assign({}, props, { onclick: onClick, tier: props }), children));
    }
    function onClick(context, detail, props, event) {
        var newContext = onClickMain(context, detail, props, event);
        if (props.tier.onclick) {
            return props.tier.onclick(context, detail, props, event) || newContext;
        }
        return newContext;
    }
    var onClickMain = xatto.currentOnly(function (context, detail, props, event) {
        if (!event.defaultPrevented
            && event.button === 0
            && !event.altKey
            && !event.metaKey
            && !event.ctrlKey
            && !event.shiftKey
            && props.target !== "_blank") {
            var location_1 = props.location || context.location || props.xa.extra.location || window.location;
            if (getOrigin(location_1, location_1) === getOrigin(event.currentTarget, location_1)) {
                event.preventDefault();
                var href = props.href;
                var pathname = location_1.pathname;
                if (href !== pathname) {
                    history.pushState(pathname, "", href);
                    return {}; // mutate
                }
            }
        }
    });

    function setPopstateHandle(mutate) {
        var handle = function (e) {
            mutate({});
        };
        addEventListener('popstate', handle);
        return function () {
            removeEventListener('popstate', handle);
        };
    }

    exports.Route = Route;
    exports.RouteLink = RouteLink;
    exports.setPopstateHandle = setPopstateHandle;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=xatto-route.js.map
