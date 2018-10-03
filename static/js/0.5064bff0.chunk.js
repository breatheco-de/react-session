webpackJsonp([0],{

/***/ 255:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "frontMatter", function() { return frontMatter; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

;

var frontMatter = {};

var ReactMarkdown = function (_React$PureComponent) {
  _inherits(ReactMarkdown, _React$PureComponent);

  function ReactMarkdown() {
    _classCallCheck(this, ReactMarkdown);

    return _possibleConstructorReturn(this, (ReactMarkdown.__proto__ || Object.getPrototypeOf(ReactMarkdown)).apply(this, arguments));
  }

  _createClass(ReactMarkdown, [{
    key: "render",
    value: function render() {
      var props = this.props;

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        "div",
        null,
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          "p",
          { align: "center" },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { src: "https://assets.breatheco.de/apis/img/images.php?blob&random&cat=icon&tags=breathecode,128" })
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("p", null),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          "h2",
          { align: "center" },
          " React Session Management "
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("p", null),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          "p",
          null,
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "a",
            { href: "https://GitHub.com/breatheco-de/react-session.js/graphs/commit-activity" },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { src: "https://img.shields.io/badge/Maintained-yes-green.svg", alt: "Maintenance" })
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "a",
            { href: "https://www.npmjs.com/package/bc-react-session" },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { src: "https://img.shields.io/npm/v/bc-react-session.svg", alt: "npm" })
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "a",
            { href: "https://www.npmjs.com/package/bc-react-session" },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { src: "https://img.shields.io/npm/dm/bc-react-session.svg", alt: "npm" })
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "a",
            { href: "https://github.com/breatheco-de/react-session/blob/master/LICENSE" },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { src: "https://img.shields.io/github/license/Naereen/StrapDown.js.svg", alt: "GitHub license" })
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          "p",
          null,
          "Create and maintain persisten login sessions on the browser (even if the website is refreshed). Checkout the ",
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "a",
            { href: "https://breatheco-de.github.io/react-session/" },
            "live demo"
          ),
          "."
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          "blockquote",
          null,
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "p",
            null,
            "Note: Extremely easy integration with ",
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              "a",
              { href: "https://github.com/ReactTraining/react-router" },
              "React Router"
            ),
            "."
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          "h2",
          null,
          "Installation"
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          "pre",
          null,
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "code",
            { className: "hljs language-shell" },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              "span",
              { className: "hljs-meta" },
              "$"
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              "span",
              { className: "bash" },
              " npm i --save bc-react-session"
            ),
            "\n"
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          "h2",
          null,
          "Usage"
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          "ol",
          null,
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "li",
            null,
            "Open a session by doing ",
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              "code",
              null,
              "Session.login();"
            ),
            ":"
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          "pre",
          null,
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "code",
            { className: "hljs language-js" },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              "span",
              { className: "hljs-keyword" },
              "import"
            ),
            " ",
            "{",
            "Session",
            "}",
            " ",
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              "span",
              { className: "hljs-keyword" },
              "from"
            ),
            " ",
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              "span",
              { className: "hljs-string" },
              "'bc-react-session'"
            ),
            ";",
            "\n",
            "\n",
            "Session.start(",
            "{",
            " ",
            "\n",
            "    ",
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              "span",
              { className: "hljs-attr" },
              "payload"
            ),
            ": ",
            "{",
            "\n",
            "        ",
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              "span",
              { className: "hljs-comment" },
              "// (optional) any info you want to save on the persisten session"
            ),
            "\n",
            "    ",
            "}",
            ",",
            "\n",
            "    ",
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              "span",
              { className: "hljs-attr" },
              "expiration"
            ),
            ": ",
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              "span",
              { className: "hljs-number" },
              "86400000"
            ),
            "; ",
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              "span",
              { className: "hljs-comment" },
              "// (optional) defaults to 1 day"
            ),
            "\n",
            "}",
            ");",
            "\n"
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          "ol",
          { start: 2 },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "li",
            null,
            "Close the session by doing ",
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              "code",
              null,
              "Session.destroy();"
            ),
            ":"
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          "pre",
          null,
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "code",
            { className: "hljs language-js" },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              "span",
              { className: "hljs-keyword" },
              "import"
            ),
            " ",
            "{",
            "Session",
            "}",
            " ",
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              "span",
              { className: "hljs-keyword" },
              "from"
            ),
            " ",
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              "span",
              { className: "hljs-string" },
              "'bc-react-session'"
            ),
            ";",
            "\n",
            "\n",
            "Session.destroy();",
            "\n"
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          "ol",
          { start: 3 },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "li",
            null,
            "Retrieve the session and payload from anywhere"
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          "pre",
          null,
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "code",
            { className: "hljs language-js" },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              "span",
              { className: "hljs-keyword" },
              "import"
            ),
            " ",
            "{",
            "Session",
            "}",
            " ",
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              "span",
              { className: "hljs-keyword" },
              "from"
            ),
            " ",
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              "span",
              { className: "hljs-string" },
              "'bc-react-session'"
            ),
            ";",
            "\n",
            "\n",
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              "span",
              { className: "hljs-keyword" },
              "const"
            ),
            " session = Session.getSession();",
            "\n",
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              "span",
              { className: "hljs-keyword" },
              "const"
            ),
            " payload = Session.getPayload();",
            "\n",
            "\n",
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              "span",
              { className: "hljs-built_in" },
              "console"
            ),
            ".log(session.isValid); ",
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              "span",
              { className: "hljs-comment" },
              "// will be true if is not expired or innactive"
            ),
            "\n",
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              "span",
              { className: "hljs-built_in" },
              "console"
            ),
            ".log(payload); ",
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              "span",
              { className: "hljs-comment" },
              "// anything you have set on the session payload is stored here"
            ),
            "\n"
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          "h2",
          null,
          "That is it!!"
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          "h3",
          null,
          "Some other functionalities:"
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          "ol",
          null,
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "li",
            null,
            "Listen to session changes"
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          "pre",
          null,
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "code",
            { className: "hljs language-js" },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              "span",
              { className: "hljs-comment" },
              "// listen to session changes"
            ),
            "\n",
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              "span",
              { className: "hljs-keyword" },
              "const"
            ),
            " unsubscribe = Session.onChange(",
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              "span",
              { className: "hljs-function" },
              "(",
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "span",
                { className: "hljs-params" },
                "session"
              ),
              ") =>"
            ),
            " ",
            "{",
            "\n",
            "  ",
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              "span",
              { className: "hljs-built_in" },
              "console"
            ),
            ".log(session);",
            "\n",
            "  ",
            "\n",
            "  ",
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              "span",
              { className: "hljs-keyword" },
              "if"
            ),
            "(session.expired) ",
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              "span",
              { className: "hljs-built_in" },
              "console"
            ),
            ".log(",
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              "span",
              { className: "hljs-string" },
              "'The session has expired'"
            ),
            ")",
            "\n",
            "  ",
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              "span",
              { className: "hljs-keyword" },
              "if"
            ),
            "(session.autenticated) ",
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              "span",
              { className: "hljs-built_in" },
              "console"
            ),
            ".log(",
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              "span",
              { className: "hljs-string" },
              "'No one has logged in'"
            ),
            ")",
            "\n",
            "  ",
            "\n",
            "}",
            ");",
            "\n",
            " ",
            "\n",
            " ",
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              "span",
              { className: "hljs-comment" },
              "//unsubscribe to session changes if needed"
            ),
            "\n",
            "unsubscribe();",
            "\n"
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          "ol",
          { start: 2 },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "li",
            null,
            "Wait for session expiration callback"
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          "pre",
          null,
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "code",
            { className: "hljs language-js" },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              "span",
              { className: "hljs-comment" },
              "// you need to enforce before calling the login method."
            ),
            "\n",
            "Session.onExpiration(",
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              "span",
              { className: "hljs-function" },
              "(",
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "span",
                { className: "hljs-params" },
                "session"
              ),
              ") =>"
            ),
            " session.destroy()); ",
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              "span",
              { className: "hljs-comment" },
              "//you can destroy the session if it expires"
            ),
            "\n"
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          "ol",
          { start: 3 },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "li",
            null,
            "Change reset the session payload whenever you want"
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          "pre",
          null,
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "code",
            { className: "hljs language-js" },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              "span",
              { className: "hljs-keyword" },
              "import"
            ),
            " ",
            "{",
            "Session",
            "}",
            " ",
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              "span",
              { className: "hljs-keyword" },
              "from"
            ),
            " ",
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              "span",
              { className: "hljs-string" },
              "'bc-react-session'"
            ),
            ";",
            "\n",
            "\n",
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              "span",
              { className: "hljs-comment" },
              "// pass a new username that will override previous one (if any)"
            ),
            "\n",
            "Session.setPayload(",
            "{",
            "\n",
            "    ",
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              "span",
              { className: "hljs-attr" },
              "username"
            ),
            ": ",
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              "span",
              { className: "hljs-string" },
              "'alesanchezr'"
            ),
            "\n",
            "}",
            ");",
            "\n"
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          "ol",
          { start: 4 },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "li",
            null,
            "Check session expiration"
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          "pre",
          null,
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "code",
            { className: "hljs language-cpp" },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              "span",
              { className: "hljs-keyword" },
              "const"
            ),
            " session = Session.getSession();",
            "\n",
            "console.",
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              "span",
              { className: "hljs-built_in" },
              "log"
            ),
            "(session.expired); ",
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              "span",
              { className: "hljs-comment" },
              "// boolean"
            ),
            "\n"
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          "ol",
          { start: 5 },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "li",
            null,
            "Make a Private Route using react router"
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          "p",
          null,
          "The library brings a component called ",
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "code",
            null,
            "<PrivateRoute />"
          ),
          " to make your routes private without any extra code."
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          "pre",
          null,
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "code",
            { className: "hljs language-jsx" },
            "<BrowserRouter>",
            "\n",
            "    ",
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              "span",
              { className: "xml" },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "span",
                { className: "hljs-tag" },
                "<",
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  "span",
                  { className: "hljs-name" },
                  "div"
                ),
                ">"
              ),
              "\n",
              "        "
            ),
            "<PrivateRoute exact path='/profile' component=",
            "{",
            "PrivateLayout",
            "}",
            " />",
            "\n",
            "    ",
            "</div>",
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              "span",
              { className: "xml" },
              "\n",
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "span",
                { className: "hljs-tag" },
                "</",
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  "span",
                  { className: "hljs-name" },
                  "BrowserRouter"
                ),
                ">"
              )
            ),
            "\n"
          )
        )
      );
    }
  }]);

  return ReactMarkdown;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.PureComponent);

/* harmony default export */ __webpack_exports__["default"] = (ReactMarkdown);

/***/ })

});
//# sourceMappingURL=0.5064bff0.chunk.js.map