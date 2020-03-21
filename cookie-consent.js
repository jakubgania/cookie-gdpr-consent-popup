function disableScroll() {
  document.getElementsByTagName('html')[0].style.overflow = 'hidden'
}

function enableScroll() {
  document.getElementsByTagName('html')[0].style.overflow = 'auto'
}

function createWindow() {
  cookieWindowContainer = document.createElement('div');
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

function createHeader() {
  header = document.createElement('div');
  header.style.textAlign = "center";
  header.style.fontSize = "20px";
  header.style.borderBottom = "1px solid #b3b3b3";
  header.setAttribute("id", "header");
  document.getElementById('cookie-consent-window').appendChild(header);
  para = document.createElement("p");
  node = document.createTextNode("GDPR consent");
  para.appendChild(node);
  element = document.getElementById("header");
  element.appendChild(para);
}

function createList() {
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

function createRejectButton() {
  elementRejectButtonSection = document.getElementById("reject-section");
  elementRejectButtonSection.style.cssText = "width: 50%;text-align: center;";
  btn = document.createElement('button');
  btn.innerHTML = 'Reject';
  btn.onclick = function(){
    enableScroll();
    closeWindow();
    return false;
  };
  elementRejectButtonSection.appendChild(btn);
}

function createAcceptButton() {
  elementAcceptButtonSection = document.getElementById("accept-button");
  elementAcceptButtonSection.style.cssText = "width: 50%;text-align: center;";
  button = document.createElement('button');
  button.style.cssText = "font-size: 18px;padding-left:20px;padding-right:20px;padding-top:4px;padding-bottom:4px;border:none;outline:none;background-color: #cccccc;";
  button.innerHTML = 'Accept';
  button.onclick = function(){
    enableScroll();
    closeWindow();
    return false;
  };
  elementAcceptButtonSection.appendChild(button);
}

function createFooter() {
  footer = document.createElement('div');
  footer.style.borderTop = "1px solid #b3b3b3";
  footer.style.display = "flex";
  footer.style.height = "60px";
  footer.style.lineHeight = "60px";
  footer.setAttribute("id", "footer");
  document.getElementById('cookie-consent-window').appendChild(footer);
  element = document.getElementById("footer");
  rejectSection = document.createElement('div');
  rejectSection.setAttribute("id", "reject-section");

  acceptSection = document.createElement('div');
  acceptSection.setAttribute("id", "accept-button");
  element.appendChild(rejectSection);
  element.appendChild(acceptSection);

  createRejectButton();
  createAcceptButton();
}

function closeWindow() {
  element = document.getElementById("cookie-consent-window");
  element.style.display = "none";
}

// check cookies
// check protocol type

let stateCheck = setInterval(() => {
  if (document.readyState === 'complete') {
    clearInterval(stateCheck);
    
    disableScroll();
    createWindow();
    createHeader();
    createList();
    createFooter();
  }
}, 100);

