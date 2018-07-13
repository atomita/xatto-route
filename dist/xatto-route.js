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
        var _b = _a.xa, context = _b.context, extra = _b.extra, attrs = __rest(_a, ["xa"]);
        var location = attrs.location || context.location || extra.location || window.location;
        var flags = attrs.flags || '';
        var pattern = attrs.pattern;
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
        var child = children[0];
        return match && __assign({}, child, { attributes: __assign({}, child.attributes, { route: {
                    location: location,
                    match: match,
                    params: match.groups || {},
                    path: match[0],
                    pattern: pattern,
                } }) });
    }

    function getOrigin(loc, location) {
        var protocol = (loc.protocol && ':' !== loc.protocol) ? loc.protocol : location.protocol;
        var host = [loc.hostname, loc.port].filter(Boolean).join(":")
            || [location.hostname, location.port].filter(Boolean).join(":");
        return protocol + "//" + host;
    }
    function RouteLink(_a, children) {
        var extra = _a.xa.extra, attrs = __rest(_a, ["xa"]);
        var href = attrs.href;
        var onclick = attrs.onclick;
        attrs.onclick = function (e, ctx, ext) {
            if (onclick) {
                onclick(e, ctx, ext);
            }
            if (!e.defaultPrevented
                && e.button === 0
                && !e.altKey
                && !e.metaKey
                && !e.ctrlKey
                && !e.shiftKey
                && attrs.target !== "_blank") {
                return function (mutate, context) {
                    var location = attrs.location || context.location || extra.location || window.location;
                    if (getOrigin(location, location) === getOrigin(e.currentTarget, location)) {
                        e.preventDefault();
                        var pathname = location.pathname;
                        if (href !== pathname) {
                            history.pushState(pathname, "", href);
                            mutate();
                        }
                    }
                };
            }
        };
        return (xatto.x("a", __assign({}, attrs), children));
    }

    function setPopstateHandle(mutate) {
        var handle = function (e) {
            mutate();
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
