"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CookieConsent = function () {
  function CookieConsent() {
    _classCallCheck(this, CookieConsent);

    this.numberOfListItems = 20;
    this.cookieExpiryTimeInDays = 1;
    this.listOfVendors = [];
    this.listOfAcceptedVendors = [];
    this.vendrosListURL = "https://vendorlist.consensu.org/vendorlist.json";
    this.headerCss = "text-align: center;font-size: 20px;border-bottom: 1px solid #b3b3b3;";
    this.windowCss = "position: absolute;top: 50%; left: 50%; transform: translate(-50%, -50%); width: 100%; max-width: 600px; height: 800px; background-color: #fff;";
    this.buttonCss = "font-size: 18px;padding-left:30px;padding-right:30px;padding-top:4px;padding-bottom:4px;border:none;outline:none;background-color: #cccccc;";
    this.privacyPolicyButtonCss = "background-color: #f2f2f2;text-decoration: none;border-radius: 4px;padding-top: 4px;padding-bottom: 4px;padding-left: 10px;padding-right: 10px;";
    this.footerCss = "border-top: 1px solid #b3b3b3;display: flex;height: 60px;line-height:60px;position: absolute;width: 100%;bottom: 0;";
    this.fullSizeContainerCss = "width: 100%;height: 100vh;position: absolute;margin: -8px;background-color: rgba(0, 0, 0, 0.8);";
    this.acceptPrivacyPolicyButtonCss = "margin-left: 20px;padding-left: 10px;padding-right: 10px;padding-top: 4px;padding-bottom: 4px;border: none;";
  }

  _createClass(CookieConsent, [{
    key: "disableScroll",
    value: function disableScroll() {
      document.getElementsByTagName('html')[0].style.overflow = 'hidden';
    }
  }, {
    key: "enableScroll",
    value: function enableScroll() {
      document.getElementsByTagName('html')[0].style.overflow = 'auto';
    }
  }, {
    key: "createWindow",
    value: function createWindow() {
      var fullSizeContainer = document.createElement('div');
      fullSizeContainer.setAttribute("id", "full-size-container");
      fullSizeContainer.style.cssText = this.fullSizeContainerCss;

      var cookieWindowContainer = document.createElement('div');
      cookieWindowContainer.style.cssText = this.windowCss;
      cookieWindowContainer.setAttribute("id", "cookie-consent-window");

      fullSizeContainer.appendChild(cookieWindowContainer);
      document.getElementsByTagName('body')[0].appendChild(fullSizeContainer);
    }
  }, {
    key: "createHeader",
    value: function createHeader() {
      var header = document.createElement('div');
      header.style.cssText = this.headerCss;
      header.setAttribute("id", "header");
      document.getElementById('cookie-consent-window').appendChild(header);
      var para = document.createElement("p");
      var node = document.createTextNode("GDPR consent");
      para.appendChild(node);
      var element = document.getElementById("header");
      element.appendChild(para);
    }
  }, {
    key: "createList",
    value: function createList() {
      var _this = this;

      this.getVendorsList().then(function (data) {
        _this.listOfVendors = data.vendors;

        var listContainer = document.createElement('div');
        listContainer.style.overflowY = "scroll";
        listContainer.style.height = "676px";
        listContainer.setAttribute("id", "vendors-list");

        var listElement = document.createElement('ul');

        document.getElementById('cookie-consent-window').appendChild(listContainer);
        listContainer.appendChild(listElement);

        var cookieConsentWindow = document.getElementById('cookie-consent-window');
        var footer = document.getElementById('footer');
        cookieConsentWindow.insertBefore(listContainer, footer);

        for (var counter = 0; counter < _this.numberOfListItems; ++counter) {
          _this.createListItem(counter, listElement, _this.listOfVendors[counter].id, _this.listOfVendors[counter].name, _this.listOfVendors[counter].policyUrl);
        }
      });
    }
  }, {
    key: "createListItem",
    value: function createListItem(counter, listElement, id, name, url) {
      var _this2 = this;

      var listItem = void 0,
          listItemLi = void 0,
          nameDivSection = void 0,
          linkPrivacyPolicyDivSection = void 0,
          privacyPolicyLink = void 0,
          linkText = void 0,
          acceptButton = void 0;

      listItem = document.createElement('li');
      listItemLi = document.createElement('div');
      listItemLi.style.display = "flex";
      listItemLi.style.marginBottom = "10px";
      listItemLi.style.lineHeight = "30px";
      nameDivSection = document.createElement('div');
      nameDivSection.style.width = "58%";
      nameDivSection.innerHTML = name;
      linkPrivacyPolicyDivSection = document.createElement('div');
      privacyPolicyLink = document.createElement('a');
      privacyPolicyLink.style.cssText = this.privacyPolicyButtonCss;
      linkText = document.createTextNode('Privacy policy');
      privacyPolicyLink.appendChild(linkText);
      privacyPolicyLink.setAttribute('target', '_blank');
      privacyPolicyLink.href = url;
      linkPrivacyPolicyDivSection.appendChild(privacyPolicyLink);
      acceptButton = document.createElement('button');
      acceptButton.style.cssText = this.acceptPrivacyPolicyButtonCss;
      acceptButton.innerHTML = 'Accept';
      acceptButton.setAttribute("id", "accept-button-" + counter);
      acceptButton.addEventListener('click', function () {
        if ("lawngreen" === document.getElementById("accept-button-" + counter).style.backgroundColor) {
          _this2.removeVendorFromList(id);
          document.getElementById("accept-button-" + counter).style.backgroundColor = "";
        } else {
          _this2.addVendorToList(counter);
          document.getElementById("accept-button-" + counter).style.backgroundColor = "lawngreen";
        }
      });
      listItemLi.appendChild(nameDivSection);
      listItemLi.appendChild(linkPrivacyPolicyDivSection);
      listItemLi.appendChild(acceptButton);
      listItem.appendChild(listItemLi);
      listElement.appendChild(listItem);
    }
  }, {
    key: "addVendorToList",
    value: function addVendorToList(index) {
      this.listOfAcceptedVendors.push(this.listOfVendors[index]);
    }
  }, {
    key: "removeVendorFromList",
    value: function removeVendorFromList(index) {
      var removeIndex = this.listOfAcceptedVendors.map(function (item) {
        return item.id;
      }).indexOf(index);

      this.listOfAcceptedVendors.splice(removeIndex, 1);
    }
  }, {
    key: "createButton",
    value: function createButton(id, name, cookie) {
      var _this3 = this;

      var elementAcceptButtonSection = document.getElementById(id);
      elementAcceptButtonSection.style.cssText = "width: 50%;text-align: center;";

      var button = document.createElement('button');
      button.style.cssText = this.buttonCss;
      button.innerHTML = name;
      button.onclick = function () {
        if (cookie) {
          _this3.setCookie('gdpr-consent', _this3.listOfAcceptedVendors, _this3.cookieExpiryTimeInDays);
        }

        _this3.enableScroll();
        _this3.closeWindow();

        return false;
      };
      elementAcceptButtonSection.appendChild(button);
    }
  }, {
    key: "createFooter",
    value: function createFooter() {
      var footer = document.createElement('div');
      footer.style.cssText = this.footerCss;
      footer.setAttribute("id", "footer");
      document.getElementById('cookie-consent-window').appendChild(footer);

      var element = document.getElementById("footer");
      var rejectSection = document.createElement('div');
      rejectSection.setAttribute("id", "reject-section");

      var acceptSection = document.createElement('div');
      acceptSection.setAttribute("id", "accept-button");
      element.appendChild(rejectSection);
      element.appendChild(acceptSection);

      this.createButton("reject-section", "Reject", true);
      this.createButton("accept-button", "Accept", true);
    }
  }, {
    key: "closeWindow",
    value: function closeWindow() {
      var element = document.getElementById("cookie-consent-window");
      var fullSizeContainer = document.getElementById("full-size-container");
      fullSizeContainer.style.display = "none";
      element.style.display = "none";
    }
  }, {
    key: "isHttps",
    value: function isHttps() {
      return document.location.protocol === 'https:';
    }
  }, {
    key: "setCookie",
    value: function setCookie(cookieName, cookieValue, expire) {
      var d = new Date();
      d.setTime(d.getTime() + expire * 24 * 60 * 60 * 1000);
      var expires = "expires=" + d.toGMTString();
      document.cookie = cookieName + "=" + JSON.stringify(cookieValue) + ";" + expires + ";path=/";
    }
  }, {
    key: "getCookie",
    value: function getCookie(cookieName) {
      var name = cookieName + "=";
      var ca = document.cookie.split(';');

      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];

        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }

        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }

      return "";
    }
  }, {
    key: "checkCookie",
    value: function checkCookie() {
      var cookieValue = this.getCookie('gdpr-consent');

      if (cookieValue != "") {
        return true;
      } else {
        return false;
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      if (!this.isHttps()) return false;
      if (this.checkCookie()) return false;

      var stateCheck = setInterval(function () {
        if (document.readyState === 'complete') {
          clearInterval(stateCheck);

          _this4.disableScroll();
          _this4.createWindow();
          _this4.createHeader();
          _this4.createList();
          _this4.createFooter();
        }
      }, 100);
    }
  }, {
    key: "getVendorsList",
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var response, json;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return fetch(this.vendrosListURL);

              case 2:
                response = _context.sent;
                _context.next = 5;
                return response.json();

              case 5:
                json = _context.sent;
                return _context.abrupt("return", json);

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getVendorsList() {
        return _ref.apply(this, arguments);
      }

      return getVendorsList;
    }()
  }]);

  return CookieConsent;
}();

var cookie = new CookieConsent();
cookie.render();