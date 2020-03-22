class CookieConsent {
  constructor() {
    this.vendrosListURL = "https://vendorlist.consensu.org/vendorlist.json";
    this.windowCss = "position: absolute;top: 50%; left: 50%; transform: translate(-50%, -50%); width: 100%; max-width: 600px; height: 800px; background-color: #f2f2f2;"
    this.buttonCss = "font-size: 18px;padding-left:30px;padding-right:30px;padding-top:4px;padding-bottom:4px;border:none;outline:none;background-color: #cccccc;";
    this.privacyPolicyButtonCss = "background-color: white;text-decoration: none;border-radius: 4px;padding-top: 4px;padding-bottom: 4px;padding-left: 10px;padding-right: 10px;";
    this.footerCss = "border-top: 1px solid #b3b3b3;display: flex;height: 60px;line-height:60px;position: absolute;width: 100%;bottom: 0;";
    this.fullSizeContainerCss = "width: 100%;height: 100vh;position: absolute;margin: -8px;background-color: rgba(0, 0, 0, 0.8);";
    this.checkCookie();
  }

  disableScroll() {
    document.getElementsByTagName('html')[0].style.overflow = 'hidden';
  }

  enableScroll() {
    document.getElementsByTagName('html')[0].style.overflow = 'auto';
  }

  createWindow() {
    let fullSizeContainer = document.createElement('div');
    fullSizeContainer.style.cssText = this.fullSizeContainerCss;

    let cookieWindowContainer = document.createElement('div');
    cookieWindowContainer.style.cssText = this.windowCss;
    cookieWindowContainer.setAttribute("id", "cookie-consent-window");

    fullSizeContainer.appendChild(cookieWindowContainer)
    document.getElementsByTagName('body')[0].appendChild(fullSizeContainer);
  }

  createHeader() {
    let header = document.createElement('div');
    header.style.textAlign = "center";
    header.style.fontSize = "20px";
    header.style.borderBottom = "1px solid #b3b3b3";
    header.setAttribute("id", "header");
    document.getElementById('cookie-consent-window').appendChild(header);
    let para = document.createElement("p");
    let node = document.createTextNode("GDPR consent");
    para.appendChild(node);
    let element = document.getElementById("header");
    element.appendChild(para);
  }

  createList() {
    let listOfVendors = [];

    this.getVendorList().then((data) => {
      listOfVendors = data.vendors;
  
      let listContainer = document.createElement('div');
      listContainer.setAttribute("id", "vendors-list");

      let listElement = document.createElement('ul');
  
      document.getElementById('cookie-consent-window').appendChild(listContainer);
      listContainer.appendChild(listElement);
      let xmp = document.getElementById('cookie-consent-window');
      let footer = document.getElementById('footer');
      xmp.insertBefore(listContainer, footer);

      let numberOfListItems = 20;
  
      for (let i = 0; i < numberOfListItems; ++i) {
        this.createListItem(listElement, listOfVendors[i].name, listOfVendors[i].policyUrl);
      }
    });
  }

  createListItem(listElement, name, url) {
    let listItem, listItemLi, nameDivSection, linkPrivacyPolicyDivSection, privacyPolicyLink, linkText;

    listItem = document.createElement('li');
    listItemLi = document.createElement('div');
    listItemLi.style.display = "flex";
    listItemLi.style.marginBottom = "10px";
    nameDivSection = document.createElement('div');
    nameDivSection.style.width = "55%";
    nameDivSection.innerHTML = name;
    linkPrivacyPolicyDivSection = document.createElement('div');
    privacyPolicyLink = document.createElement('a');
    privacyPolicyLink.style.cssText = this.privacyPolicyButtonCss;
    linkText = document.createTextNode('privacy policy');
    privacyPolicyLink.appendChild(linkText);
    privacyPolicyLink.setAttribute('target', '_blank');
    privacyPolicyLink.href = url;
    linkPrivacyPolicyDivSection.appendChild(privacyPolicyLink);
    listItemLi.appendChild(nameDivSection);
    listItemLi.appendChild(linkPrivacyPolicyDivSection);
    listItem.appendChild(listItemLi);
    listElement.appendChild(listItem);
  }

  createRejectButton() {
    let elementRejectButtonSection = document.getElementById("reject-section");
    elementRejectButtonSection.style.cssText = "width: 50%;text-align: center;";

    let button = document.createElement('button');
    button.style.cssText = this.buttonCss;
    button.innerHTML = 'Reject';
    button.onclick = () => {
      this.enableScroll();
      this.closeWindow();
      return false;
    };
    elementRejectButtonSection.appendChild(button);
  }

  createAcceptButton() {
    let elementAcceptButtonSection = document.getElementById("accept-button");
    elementAcceptButtonSection.style.cssText = "width: 50%;text-align: center;";

    let button = document.createElement('button');
    button.style.cssText = this.buttonCss;
    button.innerHTML = 'Accept';
    button.onclick = () => {
      this.setCookie('accept', true, 3);
      this.enableScroll();
      this.closeWindow();
      return false;
    };
    elementAcceptButtonSection.appendChild(button);
  }

  createFooter() {
    let footer = document.createElement('div');
    footer.style.cssText = this.footerCss;
    footer.setAttribute("id", "footer");
    document.getElementById('cookie-consent-window').appendChild(footer);

    let element = document.getElementById("footer");
    let rejectSection = document.createElement('div');
    rejectSection.setAttribute("id", "reject-section");

    let acceptSection = document.createElement('div');
    acceptSection.setAttribute("id", "accept-button");
    element.appendChild(rejectSection);
    element.appendChild(acceptSection);

    this.createRejectButton();
    this.createAcceptButton();
  }

  closeWindow() {
    let element = document.getElementById("cookie-consent-window");
    element.style.display = "none";
  }

  isHttps() {
    return document.location.protocol === 'https';
  }

  setCookie(cookieName, cookieValue, expire) {
    console.log('cookie');
    let d = new Date();
    // d.setTime(d.getTime() + (expire * 24 * 60 * 60 * 1000));
    d.setTime(d.getTime() + (expire * 60 * 1000));
    let expires ="expires=" + d.toGMTString();
    document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
  }

  getCookie(cookieName) {
    let name = cookieName + "=";
    let ca = document.cookie.split(';');

    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];

      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }

      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }

    return "";
  }
  
  checkCookie() {
    let cookieValue = this.getCookie('example');
    console.log(cookieValue);

    // if cookie empty render else not render
    if (cookieValue != "") {
      return true;
    } else {
      // this.setCookie('example', true, 3);
      return false;
    }
  }

  render() {
    // if (!this.isHttps()) return false;
    // if (!this.checkCookie()) return false;

    let stateCheck = setInterval(() => {
      if (document.readyState === 'complete') {
        clearInterval(stateCheck);
        
        this.disableScroll();
        this.createWindow();
        this.createHeader();
        this.createList();
        this.createFooter();
      }
    }, 100);
  }

  async getVendorList() {
    const response = await fetch(this.vendrosListURL);
    const json = await response.json();
    return json;
  }
}

const cookie = new CookieConsent();
cookie.render();
