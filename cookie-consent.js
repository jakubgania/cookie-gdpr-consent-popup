class CookieConsent {
  constructor() {
    this.buttonCss = "font-size: 18px;padding-left:20px;padding-right:20px;padding-top:4px;padding-bottom:4px;border:none;outline:none;background-color: #cccccc;"
  }

  disableScroll() {
    document.getElementsByTagName('html')[0].style.overflow = 'hidden';
  }

  enableScroll() {
    document.getElementsByTagName('html')[0].style.overflow = 'auto';
  }

  createWindow() {
    let cookieWindowContainer = document.createElement('div');
    cookieWindowContainer.style.position = "absolute"
    cookieWindowContainer.style.top = "50%";
    cookieWindowContainer.style.left = "50%";
    cookieWindowContainer.style.transform = "translate(-50%, -50%)";
    cookieWindowContainer.style.width = "100%";
    cookieWindowContainer.style.maxWidth = "600px";
    cookieWindowContainer.style.height = "800px"
    cookieWindowContainer.style.backgroundColor = "#f2f2f2";
    cookieWindowContainer.setAttribute("id", "cookie-consent-window");
    document.getElementsByTagName('body')[0].appendChild(cookieWindowContainer);
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
    let listData = [
      'example 1',
      'example 2',
      'example 3',
      'example 4',
      'example 5',
      'example 6',
      'example 7'
    ],

    listContainer = document.createElement('div'),
  
    listElement = document.createElement('ul'),

    numberOfListItems = listData.length,
    listItem,
    i;

    document.getElementById('cookie-consent-window').appendChild(listContainer);
    listContainer.appendChild(listElement);

    for (i = 0; i < numberOfListItems; ++i) {
        listItem = document.createElement('li');
        listItem.innerHTML = listData[i];
        listElement.appendChild(listItem);
    }
  }

  createRejectButton() {
    let elementRejectButtonSection = document.getElementById("reject-section");
    elementRejectButtonSection.style.cssText = "width: 50%;text-align: center;";
    let btn = document.createElement('button');
    btn.style.cssText = this.buttonCss;
    btn.innerHTML = 'Reject';
    btn.onclick = () => {
      this.enableScroll();
      this.closeWindow();
      return false;
    };
    elementRejectButtonSection.appendChild(btn);
  }

  createAcceptButton() {
    let elementAcceptButtonSection = document.getElementById("accept-button");
    elementAcceptButtonSection.style.cssText = "width: 50%;text-align: center;";
    let button = document.createElement('button');
    button.style.cssText = this.buttonCss;
    button.innerHTML = 'Accept';
    button.onclick = () => {
      this.enableScroll();
      this.closeWindow();
      return false;
    };
    elementAcceptButtonSection.appendChild(button);
  }

  createFooter() {
    let footer = document.createElement('div');
    footer.style.borderTop = "1px solid #b3b3b3";
    footer.style.display = "flex";
    footer.style.height = "60px";
    footer.style.lineHeight = "60px";
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
    d.setTime(d.getTime() + (expire * 24 * 60 * 60));
    let expires ="expires=" + d.toUTCString();
    document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
  }

  // get cookie
  // check cookie

  render() {
    // if (!this.isHttps()) return false;
    this.setCookie("example", true, 1);

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
}

const cookie = new CookieConsent();
cookie.render();