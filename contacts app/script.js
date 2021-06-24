// document.cookie = 'user=Alex';

// document.cookie = 'info=' + encodeURIComponent('блабла')

// document.cookie = 'user2=Mike; domain=127.0.0.1'



// let date = new Date(Date.now() + 20000)
// date = date.toUTCString();

// document.cookie = 'user3=Bill; expires=' + date
// console.log(date)

// document.cookie = 'user4=Alice; max-age=15'

// document.cookie = 'user5=Alena; secure'

// console.log(document.cookie)

const authInfo = {
    login: 'admin',
    password: '1234'
}

const getCookie = function(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

const auth = function() {
    let form = this.closest('.form');
        inputLogin = form.querySelector('input[name="login"]').value,
        inputPass = form.querySelector('input[name="password"]').value;

    if(inputLogin === authInfo.login && inputPass === authInfo.password) {
        document.cookie = 'auth=true';
        document.cookie = 'authLogin=' + inputLogin;
        window.location = '/contacts.html';
    } else {
        alert('error')
    }
}
const logout = function() {
    if (!getCookie('auth') || !getCookie('authLogin')) return
    document.cookie = 'auth=; max-age=-1'
    document.cookie = 'authLogin=; max-age=-1'

    if (!getCookie('auth')) window.location.reload()
}
if(window.location.pathname == '/contacts.html' && !getCookie('auth')) window.location = '/index.html';

if(window.location.pathname == '/index.html' && getCookie('auth') === true) window.location = '/contacts.html';

 let signInBtn = document.querySelector('.signin');
     logoutBtn = document.querySelector('.logout');

 if(signInBtn) signInBtn.addEventListener('click', auth)
 if(logoutBtn) logoutBtn.addEventListener('click', logout)

 let contactsData = [];

  const contactsUpdate = function() {
    if(localStorage.getItem('contactsData').length > 0) contactsData = JSON.parse(localStorage.getItem('contactsData'))

    let contactList = document.querySelector('.contacts_list');
    contactList.innerHTML = '';
    contactsData.forEach(function(contact, id) {
        let elemContact = document.createElement('li')
        elemContact.innerHTML = `
           <div class="id">${id +1}</div>
           <div class="name">${contact.name}</div>
           <div class="phone">${contact.phone}</div>
        `;
       contactList.appendChild(elemContact)
    });
 };

const contactAdd = function() {
    let form = this.closest('.form_add'),
    inputName = form.querySelector('input[name="name"]').value,
    inputPhone = form.querySelector('input[name="phone"]').value;

    if(inputName.length == 0 || 
        inputName == ' ' || 
        inputPhone.length == 0 || 
        inputPhone == ' ') return;

    let contact = {
        name: inputName,
        phone: inputPhone
    }
    contactsData.push(contact);
    localStorage.setItem('contactsData', JSON.stringify(contactsData)); 
    contactsUpdate();
}

 let buttonAdd = document.querySelector('.form_add .add')
 if (buttonAdd) buttonAdd.addEventListener('click', contactAdd);

 if(window.location.pathname == '/contacts.html') contactsUpdate();

