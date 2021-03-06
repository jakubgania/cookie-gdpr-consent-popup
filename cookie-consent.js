class CookieConsent {
  constructor() {
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

  disableScroll() {
    document.getElementsByTagName('html')[0].style.overflow = 'hidden';
  }

  enableScroll() {
    document.getElementsByTagName('html')[0].style.overflow = 'auto';
  }

  createWindow() {
    let fullSizeContainer = document.createElement('div');
    fullSizeContainer.setAttribute("id", "full-size-container");
    fullSizeContainer.style.cssText = this.fullSizeContainerCss;

    let cookieWindowContainer = document.createElement('div');
    cookieWindowContainer.style.cssText = this.windowCss;
    cookieWindowContainer.setAttribute("id", "cookie-consent-window");

    fullSizeContainer.appendChild(cookieWindowContainer)
    document.getElementsByTagName('body')[0].appendChild(fullSizeContainer);
  }

  createHeader() {
    let header = document.createElement('div');
    header.style.cssText = this.headerCss;
    header.setAttribute("id", "header");
    document.getElementById('cookie-consent-window').appendChild(header);
    let para = document.createElement("p");
    let node = document.createTextNode("GDPR consent");
    para.appendChild(node);
    let element = document.getElementById("header");
    element.appendChild(para);
  }

  createList() {
    this.getVendorsList().then((data) => {
      this.listOfVendors = data.vendors;
  
      let listContainer = document.createElement('div');
      listContainer.style.overflowY = "scroll";
      listContainer.style.height = "676px";
      listContainer.setAttribute("id", "vendors-list");

      let listElement = document.createElement('ul');
  
      document.getElementById('cookie-consent-window').appendChild(listContainer);
      listContainer.appendChild(listElement);

      let cookieConsentWindow = document.getElementById('cookie-consent-window');
      let footer = document.getElementById('footer');
      cookieConsentWindow.insertBefore(listContainer, footer);
  
      for (let counter = 0; counter < this.numberOfListItems; ++counter) {
        this.createListItem(
          counter,
          listElement,
          this.listOfVendors[counter].id,
          this.listOfVendors[counter].name,
          this.listOfVendors[counter].policyUrl
        );
      }
    });
  }

  createListItem(counter, listElement, id, name, url) {
    let listItem, listItemLi, nameDivSection, linkPrivacyPolicyDivSection, privacyPolicyLink, linkText, acceptButton;

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
    acceptButton.setAttribute("id", `accept-button-${counter}`);
    acceptButton.addEventListener('click', () => {
      this.switchAcceptPrivacyPolicyButton(id, counter);
    });
    listItemLi.appendChild(nameDivSection);
    listItemLi.appendChild(linkPrivacyPolicyDivSection);
    listItemLi.appendChild(acceptButton);
    listItem.appendChild(listItemLi);
    listElement.appendChild(listItem);
  }

  switchAcceptPrivacyPolicyButton(id, counter) {
    if ("lawngreen" === document.getElementById(`accept-button-${counter}`).style.backgroundColor) {
      this.removeVendorFromList(id);
      document.getElementById(`accept-button-${counter}`).style.backgroundColor = "";
    } else {
      this.addVendorToList(counter);
      document.getElementById(`accept-button-${counter}`).style.backgroundColor = "lawngreen";
    }
  }

  addVendorToList(index) {
    this.listOfAcceptedVendors.push(this.listOfVendors[index]);
  }

  removeVendorFromList(index) {
    let removeIndex = this.listOfAcceptedVendors.map((item) => {
      return item.id
    }).indexOf(index);

    this.listOfAcceptedVendors.splice(removeIndex, 1);
  }

  createButton(id, name, action) {
    let elementAcceptButtonSection = document.getElementById(id);
    elementAcceptButtonSection.style.cssText = "width: 50%;text-align: center;";

    let button = document.createElement('button');
    button.style.cssText = this.buttonCss;
    button.innerHTML = name;
    button.onclick = () => {
      this.setCookie('gdpr-consent', this.listOfAcceptedVendors, this.cookieExpiryTimeInDays);

      if (action === 'accept' && this.listOfAcceptedVendors.length == 0) {
        alert('Select any policy');
        return false;
      }

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

    this.createButton("reject-section", "Reject", "reject");
    this.createButton("accept-button", "Accept", "accept");
  }

  closeWindow() {
    let element = document.getElementById("cookie-consent-window");
    let fullSizeContainer = document.getElementById("full-size-container");
    fullSizeContainer.style.display = "none";
    element.style.display = "none";
  }

  isHttps() {
    return document.location.protocol === 'https:';
  }

  setCookie(cookieName, cookieValue, expire) {
    let dateObject = new Date();
    dateObject.setTime(dateObject.getTime() + (expire * 24 * 60 * 60 * 1000));
    let expires ="expires=" + dateObject.toGMTString();
    document.cookie = cookieName + "=" + JSON.stringify(cookieValue) + ";" + expires + ";path=/";
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
    let cookieValue = this.getCookie('gdpr-consent');

    if (cookieValue != "") {
      return true;
    } else {
      return false;
    }
  }

  render() {
    if (!this.isHttps()) return false;
    if (this.checkCookie()) return false;

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

  async getVendorsList() {
    const response = await fetch(this.vendrosListURL);
    const json = await response.json();

    return json;
  }
}

const cookie = new CookieConsent();
cookie.render();
