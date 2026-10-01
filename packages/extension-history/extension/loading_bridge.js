(function () {
  "use strict"; /*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
  var a = a || {};
  a.global = this || self;
  a.exportPath_ = function (b, c, d, e) {
    b = b.split(".");
    e = e || a.global;
    for (var f; b.length && (f = b.shift());)
      if (b.length || c === void 0)
        e = e[f] && e[f] !== Object.prototype[f] ? e[f] : (e[f] = {});
      else if (!d && a.isObject(c) && a.isObject(e[f]))
        for (var g in c) c.hasOwnProperty(g) && (e[f][g] = c[g]);
      else e[f] = c;
  };
  a.CLOSURE_DEFINES =
    typeof CLOSURE_DEFINES !== "undefined"
      ? CLOSURE_DEFINES
      : a.global.CLOSURE_DEFINES;
  a.CLOSURE_UNCOMPILED_DEFINES =
    typeof CLOSURE_UNCOMPILED_DEFINES !== "undefined"
      ? CLOSURE_UNCOMPILED_DEFINES
      : a.global.CLOSURE_UNCOMPILED_DEFINES;
  a.define = function (b, c) {
    return c;
  };
  a.FEATURESET_YEAR = 2012;
  a.DEBUG = !1;
  a.LOCALE = "en";
  a.TRUSTED_SITE = !0;
  a.DISALLOW_TEST_ONLY_CODE = !a.DEBUG;
  a.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING = !1;
  a.readFlagInternalDoNotUseOrElse = function (b, c) {
    var d = a.getObjectByName(a.FLAGS_OBJECT_);
    b = d && d[b];
    return b != null ? b : c;
  };
  a.FLAGS_OBJECT_ = "CLOSURE_FLAGS";
  a.FLAGS_STAGING_DEFAULT = !0;
  a.CLOSURE_TOGGLE_ORDINALS =
    typeof CLOSURE_TOGGLE_ORDINALS === "object"
      ? CLOSURE_TOGGLE_ORDINALS
      : a.global.CLOSURE_TOGGLE_ORDINALS;
  a.readToggleInternalDoNotCallDirectly = function (b) {
    var c = a.CLOSURE_TOGGLE_ORDINALS;
    b = c && c[b];
    return typeof b !== "number"
      ? !!b
      : !!(a.TOGGLES_[Math.floor(b / 30)] & (1 << (b % 30)));
  };
  a.TOGGLE_VAR_ = "_F_toggles";
  a.TOGGLES_ = a.global[a.TOGGLE_VAR_] || [];
  a.GENDERED_MESSAGES_ENABLED = !0;
  a.GrammaticalGender_ = { OTHER: 0, MASCULINE: 1, FEMININE: 2, NEUTER: 3 };
  a.GRAMMATICAL_GENDER_MAP_ = {
    FEMININE: a.GrammaticalGender_.FEMININE,
    MASCULINE: a.GrammaticalGender_.MASCULINE,
    NEUTER: a.GrammaticalGender_.NEUTER,
  };
  a.viewerGrammaticalGender_ =
    a.GRAMMATICAL_GENDER_MAP_[
      a.GENDERED_MESSAGES_ENABLED && a.global._F_VIEWER_GRAMMATICAL_GENDER
    ] || a.GrammaticalGender_.OTHER;
  a.msgKind = {};
  a.msgKind.MASCULINE =
    a.viewerGrammaticalGender_ === a.GrammaticalGender_.MASCULINE;
  a.msgKind.FEMININE =
    a.viewerGrammaticalGender_ === a.GrammaticalGender_.FEMININE;
  a.msgKind.NEUTER = a.viewerGrammaticalGender_ === a.GrammaticalGender_.NEUTER;
  a.LEGACY_NAMESPACE_OBJECT_ = a.global;
  a.provide = function (b) {
    if (a.isInModuleLoader_())
      throw Error("goog.provide cannot be used within a module.");
    a.constructNamespace_(b);
  };
  a.constructNamespace_ = function (b, c, d) {
    a.exportPath_(b, c, d, a.LEGACY_NAMESPACE_OBJECT_);
  };
  a.NONCE_PATTERN_ = /^[\w+/_-]+[=]{0,2}$/;
  a.getScriptNonce_ = function (b) {
    b = (b || a.global).document;
    return (b = b.querySelector && b.querySelector("script[nonce]")) &&
      (b = b.nonce || b.getAttribute("nonce")) &&
      a.NONCE_PATTERN_.test(b)
      ? b
      : "";
  };
  a.VALID_MODULE_RE_ = /^[a-zA-Z_$][a-zA-Z0-9._$]*$/;
  a.module = function () {};
  a.module.get = function () {
    return null;
  };
  a.module.getInternal_ = function () {
    return null;
  };
  a.requireDynamic = function () {
    return null;
  };
  a.importHandler_ = null;
  a.uncompiledChunkIdHandler_ = null;
  a.setImportHandlerInternalDoNotCallOrElse = function (b) {
    a.importHandler_ = b;
  };
  a.setUncompiledChunkIdHandlerInternalDoNotCallOrElse = function (b) {
    a.uncompiledChunkIdHandler_ = b;
  };
  a.maybeRequireFrameworkInternalOnlyDoNotCallOrElse = function () {};
  a.ModuleType = { ES6: "es6", GOOG: "goog" };
  a.moduleLoaderState_ = null;
  a.isInModuleLoader_ = function () {
    return a.isInGoogModuleLoader_() || a.isInEs6ModuleLoader_();
  };
  a.isInGoogModuleLoader_ = function () {
    return (
      !!a.moduleLoaderState_ && a.moduleLoaderState_.type == a.ModuleType.GOOG
    );
  };
  a.isInEs6ModuleLoader_ = function () {
    if (a.moduleLoaderState_ && a.moduleLoaderState_.type == a.ModuleType.ES6)
      return !0;
    var b = a.LEGACY_NAMESPACE_OBJECT_.$jscomp;
    return b
      ? typeof b.getCurrentModulePath != "function"
        ? !1
        : !!b.getCurrentModulePath()
      : !1;
  };
  a.module.declareLegacyNamespace = function () {
    a.moduleLoaderState_.declareLegacyNamespace = !0;
  };
  a.module.preventModuleExportSealing = function () {
    a.moduleLoaderState_.preventModuleExportSealing = !0;
  };
  a.declareModuleId = function (b) {
    if (a.moduleLoaderState_) a.moduleLoaderState_.moduleName = b;
    else {
      var c = a.LEGACY_NAMESPACE_OBJECT_.$jscomp;
      if (!c || typeof c.getCurrentModulePath != "function")
        throw Error(
          'Module with namespace "' + b + '" has been loaded incorrectly.',
        );
      c = c.require(c.getCurrentModulePath());
      a.loadedModules_[b] = { exports: c, type: a.ModuleType.ES6, moduleId: b };
    }
  };
  a.setTestOnly = function (b) {
    if (a.DISALLOW_TEST_ONLY_CODE)
      throw (
        (b = b || ""),
        Error(
          "Importing test-only code into non-debug environment" +
            (b ? ": " + b : "."),
        )
      );
  };
  a.forwardDeclare = function () {};
  a.getObjectByName = function (b, c) {
    b = b.split(".");
    c = c || a.global;
    for (var d = 0; d < b.length; d++)
      if (((c = c[b[d]]), c == null)) return null;
    return c;
  };
  a.addDependency = function () {};
  a.ENABLE_DEBUG_LOADER = !1;
  a.logToConsole_ = function (b) {
    a.global.console && a.global.console.error(b);
  };
  a.require = function () {};
  a.requireType = function () {
    return {};
  };
  a.basePath = "";
  a.abstractMethod = function () {
    throw Error("unimplemented abstract method");
  };
  a.addSingletonGetter = function (b) {
    b.instance_ = void 0;
    b.getInstance = function () {
      if (b.instance_) return b.instance_;
      a.DEBUG &&
        (a.instantiatedSingletons_[a.instantiatedSingletons_.length] = b);
      return (b.instance_ = new b());
    };
  };
  a.instantiatedSingletons_ = [];
  a.LOAD_MODULE_USING_EVAL = !0;
  a.SEAL_MODULE_EXPORTS = a.DEBUG;
  a.PREVENT_MODULE_EXPORTS_SEALING_SYMBOL_ =
    typeof Symbol === "function" ? Symbol("preventModuleExportSealing") : null;
  a.loadedModules_ = {};
  a.DEPENDENCIES_ENABLED = !1;
  a.ASSUME_ES_MODULES_TRANSPILED = !1;
  a.TRUSTED_TYPES_POLICY_NAME = "goog";
  a.loadModule = function (b) {
    var c = a.moduleLoaderState_;
    try {
      a.moduleLoaderState_ = {
        moduleName: "",
        declareLegacyNamespace: !1,
        preventModuleExportSealing: !1,
        type: a.ModuleType.GOOG,
      };
      var d = {},
        e = d;
      if (typeof b === "function") e = b.call(void 0, e);
      else if (typeof b === "string")
        e = a.loadModuleFromSource_.call(void 0, e, b);
      else throw Error("Invalid module definition");
      var f = a.moduleLoaderState_.moduleName;
      if (typeof f === "string" && f) {
        if (a.moduleLoaderState_.declareLegacyNamespace)
          a.constructNamespace_(f, e, d !== e);
        else if (
          a.SEAL_MODULE_EXPORTS &&
          Object.seal &&
          typeof e == "object" &&
          e != null
        )
          if (a.moduleLoaderState_.preventModuleExportSealing) {
            if (
              a.PREVENT_MODULE_EXPORTS_SEALING_SYMBOL_ &&
              Object.defineProperty
            )
              try {
                Object.defineProperty(
                  e,
                  a.PREVENT_MODULE_EXPORTS_SEALING_SYMBOL_,
                  { value: !0, writable: !1, enumerable: !1, configurable: !0 },
                );
              } catch (g) {}
          } else
            (a.PREVENT_MODULE_EXPORTS_SEALING_SYMBOL_ &&
              Object.prototype.hasOwnProperty.call(
                e,
                a.PREVENT_MODULE_EXPORTS_SEALING_SYMBOL_,
              )) ||
              Object.seal(e);
        a.loadedModules_[f] = {
          exports: e,
          type: a.ModuleType.GOOG,
          moduleId: a.moduleLoaderState_.moduleName,
        };
      } else throw Error('Invalid module name "' + f + '"');
    } finally {
      a.moduleLoaderState_ = c;
    }
  };
  a.loadModuleFromSource_ = function (b) {
    eval(a.CLOSURE_EVAL_PREFILTER_.createScript(arguments[1]));
    return b;
  };
  a.normalizePath_ = function (b) {
    b = b.split("/");
    for (var c = 0; c < b.length;)
      b[c] == "."
        ? b.splice(c, 1)
        : c && b[c] == ".." && b[c - 1] && b[c - 1] != ".."
          ? b.splice(--c, 2)
          : c++;
    return b.join("/");
  };
  a.loadFileSync_ = function (b) {
    if (a.global.CLOSURE_LOAD_FILE_SYNC)
      return a.global.CLOSURE_LOAD_FILE_SYNC(b);
    try {
      var c = new a.global.XMLHttpRequest();
      c.open("get", b, !1);
      c.send();
      return c.status == 0 || c.status == 200 ? c.responseText : null;
    } catch (d) {
      return null;
    }
  };
  a.typeOf = function (b) {
    var c = typeof b;
    return c != "object" ? c : b ? (Array.isArray(b) ? "array" : c) : "null";
  };
  a.isArrayLike = function (b) {
    var c = a.typeOf(b);
    return c == "array" || (c == "object" && typeof b.length == "number");
  };
  a.isDateLike = function (b) {
    return a.isObject(b) && typeof b.getFullYear == "function";
  };
  a.isObject = function (b) {
    var c = typeof b;
    return (c == "object" && b != null) || c == "function";
  };
  a.getUid = function (b) {
    return (
      (Object.prototype.hasOwnProperty.call(b, a.UID_PROPERTY_) &&
        b[a.UID_PROPERTY_]) ||
      (b[a.UID_PROPERTY_] = ++a.uidCounter_)
    );
  };
  a.hasUid = function (b) {
    return !!b[a.UID_PROPERTY_];
  };
  a.removeUid = function (b) {
    b !== null && "removeAttribute" in b && b.removeAttribute(a.UID_PROPERTY_);
    try {
      delete b[a.UID_PROPERTY_];
    } catch (c) {}
  };
  a.UID_PROPERTY_ = "closure_uid_" + ((Math.random() * 1e9) >>> 0);
  a.uidCounter_ = 0;
  a.cloneObject = function (b) {
    var c = a.typeOf(b);
    if (c == "object" || c == "array") {
      if (typeof b.clone === "function") return b.clone();
      if (typeof Map !== "undefined" && b instanceof Map) return new Map(b);
      if (typeof Set !== "undefined" && b instanceof Set) return new Set(b);
      c = c == "array" ? [] : {};
      for (var d in b) c[d] = a.cloneObject(b[d]);
      return c;
    }
    return b;
  };
  a.bindNative_ = function (b, c, d) {
    return b.call.apply(b.bind, arguments);
  };
  a.bindJs_ = function (b, c, d) {
    if (!b) throw Error();
    if (arguments.length > 2) {
      var e = Array.prototype.slice.call(arguments, 2);
      return function () {
        var f = Array.prototype.slice.call(arguments);
        Array.prototype.unshift.apply(f, e);
        return b.apply(c, f);
      };
    }
    return function () {
      return b.apply(c, arguments);
    };
  };
  a.bind = function (b, c, d) {
    a.bind =
      (a.TRUSTED_SITE && a.FEATURESET_YEAR > 2012) ||
      (Function.prototype.bind &&
        Function.prototype.bind.toString().indexOf("native code") != -1)
        ? a.bindNative_
        : a.bindJs_;
    return a.bind.apply(null, arguments);
  };
  a.partial = function (b, c) {
    var d = Array.prototype.slice.call(arguments, 1);
    return function () {
      var e = d.slice();
      e.push.apply(e, arguments);
      return b.apply(this, e);
    };
  };
  a.now = function () {
    return Date.now();
  };
  a.globalEval = function (b) {
    (0, eval)(b);
  };
  a.getCssName = function (b, c) {
    function d(g) {
      g = g.split("-");
      for (var q = [], k = 0; k < g.length; k++) q.push(e(g[k]));
      return q.join("-");
    }
    function e(g) {
      return a.cssNameMapping_[g] || g;
    }
    if (String(b).charAt(0) == ".")
      throw Error(
        'className passed in goog.getCssName must not start with ".". You passed: ' +
          b,
      );
    var f = a.cssNameMapping_
      ? a.cssNameMappingStyle_ == "BY_WHOLE"
        ? e
        : d
      : function (g) {
          return g;
        };
    b = c ? b + "-" + f(c) : f(b);
    return a.global.CLOSURE_CSS_NAME_MAP_FN
      ? a.global.CLOSURE_CSS_NAME_MAP_FN(b)
      : b;
  };
  a.setCssNameMapping = function (b, c) {
    a.cssNameMapping_ = b;
    a.cssNameMappingStyle_ = c;
  };
  a.GetMsgOptions = function () {};
  a.USE_GET_MSG_OVERRIDE = !1;
  a.getMsg = function (b, c, d) {
    d && d.html && (b = b.replace(/</g, "&lt;"));
    d &&
      d.unescapeHtmlEntities &&
      (b = b
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&apos;/g, "'")
        .replace(/&quot;/g, '"')
        .replace(/&amp;/g, "&"));
    c &&
      (b = b.replace(/\{\$([^}]+)}/g, function (e, f) {
        return c != null && f in c ? c[f] : e;
      }));
    return b;
  };
  a.getMsgWithFallback = function (b) {
    return b;
  };
  a.exportSymbol = function (b, c, d) {
    a.exportPath_(b, c, !0, d);
  };
  a.exportProperty = function (b, c, d) {
    b[c] = d;
  };
  a.weakUsage = function (b) {
    return b;
  };
  a.inherits = function (b, c) {
    function d() {}
    d.prototype = c.prototype;
    b.superClass_ = c.prototype;
    b.prototype = new d();
    b.prototype.constructor = b;
    b.base = function (e, f, g) {
      for (
        var q = Array(arguments.length - 2), k = 2;
        k < arguments.length;
        k++
      )
        q[k - 2] = arguments[k];
      return c.prototype[f].apply(e, q);
    };
  };
  a.scope = function (b) {
    if (a.isInModuleLoader_())
      throw Error("goog.scope is not supported within a module.");
    b.call(a.global);
  };
  a.identity_ = function (b) {
    return b;
  };
  a.createTrustedTypesPolicy = function (b) {
    var c = null,
      d = a.global.trustedTypes;
    if (!d || !d.createPolicy) return c;
    try {
      c = d.createPolicy(b, {
        createHTML: a.identity_,
        createScript: a.identity_,
        createScriptURL: a.identity_,
      });
    } catch (e) {
      a.logToConsole_(e.message);
    }
    return c;
  };
  a.CodeLocation = { DO_NOT_USE: "", DO_NOT_USE_ME_EITHER: "." };
  a.callerLocation = function () {
    return "";
  };
  a.callerLocationIdInternalDoNotCallOrElse = function (b) {
    return b;
  };
  function h(b, c = `unexpected value ${b}!`) {
    throw Error(c);
  }
  const l = acquireVsCodeApi(),
    m = document.getElementById("loading-details"),
    n = document.getElementById("loading-error"),
    p = document.getElementById("error-message-text"),
    r = document.getElementById("retry-button"),
    t = document.getElementById("report-button"),
    u = document.getElementById("loading-indicator"),
    v = document.getElementById("host-input-container"),
    w = document.getElementById("host-input"),
    x = document.getElementById("host-submit-button"),
    y = document.getElementById("host-input-message"),
    z = document.getElementById("list-of-hosts");
  r.addEventListener("click", () => {
    l.postMessage({ type: "retry" });
  });
  t &&
    t.addEventListener("click", () => {
      l.postMessage({ type: "reportIssue" });
    });
  x.addEventListener("click", () => {
    w && l.postMessage({ type: "submitHost", host: w.value });
  });
  w.addEventListener("keydown", (b) => {
    b.key === "Enter" && x.click();
  });
  window.addEventListener("message", (b) => {
    switch (b.data.type) {
      case "message":
        n &&
          u &&
          v &&
          ((n.style.visibility = "hidden"),
          n.classList.remove("visible"),
          (u.style.display = "flex"),
          (u.style.visibility = "visible"),
          (v.style.display = "none"));
        m &&
          (b.data.message
            ? ((m.textContent = b.data.message), (m.style.opacity = "0.8"))
            : (m.style.opacity = "0"));
        break;
      case "error":
        n &&
          u &&
          v &&
          ((n.style.visibility = "visible"),
          n.classList.add("visible"),
          (u.style.display = "none"),
          (v.style.display = "none"));
        p &&
          (b.data.error
            ? ((p.textContent = b.data.error),
              p.classList.add("visible"),
              (p.style.display = "block"))
            : (p.classList.remove("visible"), (p.style.display = "none")));
        break;
      case "promptHost":
        n &&
          u &&
          v &&
          ((n.style.visibility = "hidden"),
          n.classList.remove("visible"),
          (u.style.display = "none"),
          (v.style.display = "flex"));
        w && ((w.value = b.data.currentHost), w.focus(), w.select());
        if (z && ((z.textContent = ""), b.data.hosts))
          for (let c of b.data.hosts) {
            let d = document.createElement("button");
            d.className = "host-option";
            let e = document.createElement("span");
            e.textContent = c;
            let f = document.createElement("span");
            f.textContent = "\u2192";
            f.className = "host-option-arrow";
            d.appendChild(e);
            d.appendChild(f);
            d.addEventListener("click", () => {
              l.postMessage({ type: "submitHost", host: c });
            });
            z.appendChild(d);
          }
        y &&
          (y.textContent =
            b.data.message ??
            "Enter your Cloudtop hostname to start Jetski in Cider");
        break;
      case void 0:
        console.warn(
          `[Jetski] Received undefined message type in the loading view: ${b.data}`,
        );
        break;
      default:
        h(b.data, `Unknown message type: ${b.data.type}`);
    }
  });
  l.postMessage({ type: "ready" });
})();
//# sourceMappingURL=loading_bridge.sourcemap
