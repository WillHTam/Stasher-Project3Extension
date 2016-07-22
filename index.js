const { ActionButton } = require('sdk/ui/button/action')
const clipboard = require('sdk/clipboard')
const tabs = require('sdk/tabs')
var Request = require('sdk/request').Request

let button = ActionButton({
  id: 'mr-button',
  label: 'Stash This Page',
  icon: {
    '64': './icon-64.png'
  },
  onClick: function (state) {
    let url2 = tabs.activeTab.url
    console.log('active tab url:', url2)
    require('sdk/notifications').notify({
      title: "Active Tab's Url is " + url2,
      text: 'Click to stash.',
      onClick: function () {
        console.log('Notification click recorded')
    // ! request begins !
        Request({
          url: 'https://project3pockety.herokuapp.com/resources',
          headers: {email: 'angel@angel.com', auth_token: '50499ab4-125c-4bf0-8268-6b0459f60107'},
          content: {url: url2, tags: 'AddedWithStashr'},
          onComplete: function (response) {
            console.log('Request completed!')
            require('sdk/notifications').notify({
              title: 'Complete!',
              text: 'This page has been Stashed'
            })
          }
        }).post()
    // ! request ends
      }
    })
  }
})
