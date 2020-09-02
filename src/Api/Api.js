// import querystring from 'querystring'
import fetch from 'node-fetch'

export default class Api {
  constructor({ host = '' } = {}) {
    this.host = host
    this.paths = {
      api: {
        request: `/api/auth/request`,
        deviceToken: `/api/f/u/token`
      },
      activities: {
        listNotification: `/api/f/n`
      },
      settings : {
        userInfo : `/api/f/u`
      },
      group: {
        getGroup: `/api/f/g`,
        groupInfo: `/api/g`,
        updateGroupNotification: `/api/f/g/notification`,
        updateGroupPrivacy: `/api/f/g/privacy`,
        subscribeGroup: `/api/f/g/subscribe/cCikw3`,
        unSybscribeGroup: `/api/f/g/unsubscribe/cCikw3`,
        listGroupMembers: `/api/f/g/listMembers/{accessURL}`,
        updateGroupURL: `/api/f/g/updateURL/{accessURL}`,
        deleteGroup: `/api/f/g/delete/{accessURL}`,
        groupEvents: `/api/f/g/events`,
        updateGroupEvents: `/api/f/g/manageMember/{accessURL}`,
        createNewGroup: `/api/f/g/new`,
        updateGroup: `/api/f/g/update/{accessURL}`
      },
      events: {
        listEvents: `/api/f/e`,
        createNewEvent: `/api/f/e/new`,
        updateEventsNotification: `/api/f/e/notification`,
        updateEventsPrivacy: `/api/f/e/privacy`,
        subscribeEvents: `/api/f/e/subscribe`
      }
    }
  }

  async requestPOST({ path = '', method = '', body = {}, token = null } = {}) {

    const response = await fetch(`${this.host}${path}`, {
      method,
       headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(body),
    })

    const data = response.json()

    const json = data.then(json => {
      console.log(json)
      return json
    })

    return json

  }

  async requestGET({ path = '', method = '', token = null } = {}) {

    const response = await fetch(`${this.host}${path}`, {
      method,
       headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
      },
    })

    const data = response.json()

    const json = data.then(json => {
      console.log(json)
      return json
    })

    return json

  }

  async getOTPLink({ method = 'POST', phoneNumber = '' } = {}) {
    return this.requestPOST({
      path: this.paths.api.request,
      method,
      body: {
        'phone_number': phoneNumber,
      }
    })
  }

  async getActivitiesListNotification({
    method = 'GET',
    token = ''
  } = {}) {

    return this.requestGET({
      path: this.paths.activities.listNotification,
      method,
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
      },

    })

  }



  async getEventsList({ method = 'GET', token = '' } = {}) {

    return this.requestGET({
      path: this.paths.events.listEvents,
      method,
      token
    })

  }

  // *** Api Method ***

  async updateDeviceToken({ method = 'POST', deviceToken = '' } = {}) {
    return this.requestPOST({
      path: this.paths.api.deviceToken,
      method,
      body: {
        'device_token': deviceToken,
      }
    })
  }

  // *** End ***

  // *** Auth Method API ***

  async getUserInfo({ method = 'GET', token = '' }) {
    return this.requestGET({
      path : this.paths.settings.userInfo,
      method,
      token,
    })
  }

  // *** END Auth Method API ***

  // *** Group Method API ***

  async getGroup({ method = 'GET',  token = '' }) {
    console.log('token ' + token)
    return this.requestGET({
      path : this.paths.group.getGroup,
      method,
      token,
    })
  }

  async getGroupInfo({ method = 'GET',  token = '', url = ''}) {
    return this.requestGET({
      path : `${this.paths.group.groupInfo}/${url}`,
      method,
      token,
    })
  }

  async updateGroupNotification({ method = 'GET', token = '', url = '' }) {
    return this.requestGET({
      path :  `${this.paths.group.updateGroupNotification}/${url}`,
      method,


      token,
    })
  }

  async updateGroupPrivacy({ method = 'GET', token = '', url = '' }) {
    return this.requestGET({
      path :`${this.paths.group.updateGroupPrivacy}/${url}`,
      method,
      token,
    })
  }

  async subscribeGroup({ method = 'GET', token = '' }) {
    return this.requestGET({
      path : this.paths.group.subscribeGroup,
      method,
      token,
    })
  }

  async unSubscribeGroup({ method = 'GET', token = '' }) {
    return this.requestGET({
      path : this.paths.group.unSubscribeGroup,
      method,
      token,
    })
  }

  async getGroupMembers({ method = 'GET', token = '' }) {
    return this.requestGET({
      path : this.paths.group.listGroupMembers,
      method,
      token,
    })
  }

  async updateGroupMembers({ method = 'GET', token = '' }) {
    return this.requestGET({
      path : this.paths.group.updateGroupURL,
      method,
      token,
    })
  }

  async deleteGroup({ method = 'GET', token = '' }) {
    return this.requestGET({
      path : this.paths.group.deleteGroup,
      method,
      token,
    })
  }

  async getGroupEvents({ method = 'POST', token = '', url = '' }) {
    return this.requestPOST({
      path : `${this.paths.group.groupEvents}/${url}`,
      method,
      token,
    })
  }

  async updateGroupEvents({ method = 'POST', token = '', member_id = '', new_role = '' }) {
    return this.requestPOST({
      path : this.paths.group.updateGroupEvents,
      method,
      token,
      body : {
        "member_id" : member_id,
        "new_role" : new_role
      }
    })
  }

  async createNewGroup({ method = 'POST', token = '', name = '', description = '' }) {
    return this.requestPOST({
      path : this.paths.group.createNewGroup,
      method,
      token,
      body : {
        "name" : name,
        "description" : description
      }
    })
  }

  async updateGroupPOST({ method = 'POST', token = '', name = '', description = '' }) {
    return this.request({
      path : this.paths.group.updateGroup,
      method,
      token,
      body : {
        "name" : name,
        "description" : description
      }
    })
  }
 // END *** Group Method API ***


 // *** Event Method API ***

  async createNewEvent({ method = 'POST', token = '', name = '', description = '', limit = '', start = '', end = '', group_accessURL = '', location = '' }) {
    return this.requestPOST({
      path : this.paths.events.createNewEvent,
      method,
      token,
      body : {
        "name" : name,
        "description" : description,
        "limit" : limit,
        "startDateTime" : start,
        "endDateTime" : end,
        "group_accessURL" : group_accessURL,
        "location" : location
      }
    })
  }

  async updateEventNotofocation({ method = 'GET', token = '', url = '' }){
    return this.requestGET({
      path : `${this.paths.events.updateEventsNotification}/${url}`,
      method,
      token,
    })
  }

  async updateEventPrivacy({ method = 'GET', token = '', url = '' }){
    return this.requestGET({
      path : `${this.paths.events.updateEventsPrivacy}/${url}`,
      method,
      token,
    })
  }

  async followEvents({ method = 'GET', token = '', url = '' }){
    return this.requestGET({
      path : `${this.paths.events.subscribeEvents}/${url}`,
      method,
      token,
    })
  }


  // END *** Event Method API ***

}


// У деталей группы дизайн ивента
// Модалка с настройками Прайваси и Нотиф вылазит только когда ты не участник ивента или группы и зашел напряму по accessURL
// Статус нотиф показывает колокольчик в хедере
// Настройки профиля не работают на Ивент листинге