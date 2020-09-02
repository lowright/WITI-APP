import React from 'react'
import './style.css'
// import { messaging } from '../../init-fcm';
import activityActive from '../../images/firstTab.png'
import activityDefault from '../../images/activities.svg'
import groupActive from '../../images/active-events.svg'
import groupDefault from '../../images/thirdTab.png'
import eventsActive from '../../images/active-groups.svg'
import eventsDefault from '../../images/secondTab.png'

import {
  useHistory,
} from "react-router-dom";

// import API from '../../Api/Api'

// const Api = new API({ host : "https://wity.resty-app.dev" })

const BottomNavigation = () => {

  // componentDidMount() {

    // messaging.requestPermission()
    //   .then(async function () {
    //     const token = await messaging.getToken();
    //     localStorage.setItem('device-token', token)
    //     await Api.updateDeviceToken({
    //       method: "POST",
    //       deviceToken : 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImE3OWQ1ZmYxNTYzZTliN2ZkZGUyZjcxN2VkY2U0Y2NiZWEwMTU0NDhkNjA4Mzc2ZWIzMGVkOGE4Y2Y4NWM5MWQ3NTkyYzNlMGZkMmUzODkxIn0.eyJhdWQiOiIzIiwianRpIjoiYTc5ZDVmZjE1NjNlOWI3ZmRkZTJmNzE3ZWRjZTRjY2JlYTAxNTQ0OGQ2MDgzNzZlYjMwZWQ4YThjZjg1YzkxZDc1OTJjM2UwZmQyZTM4OTEiLCJpYXQiOjE1OTc4NzEwOTIsIm5iZiI6MTU5Nzg3MTA5MiwiZXhwIjoxNjI5NDA3MDkyLCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.hgy0NlabZgOLGwdnucp_GR8RJhF-WNway5n1SyX5L8-0md3f6GE_187-5PmllFRdVo3pemykGV_8j5uBY_asb5_rlpuJeROL4zRugiYjVLf_9Okxis9EN5wve5MWVcPex9R90e6ZVb8kpzmt1nfx-DLLLi3NUjhVvRXc0GIBkPOc2D_I9gmW1nTCIYEGmizm096DYbjO-gfcHOa6NEGJAL8nJ9y-8oyTUCPjvm3tzdnDicqguvC-9sz3buqJ7AcRF3pk66QQZQHAfIUEn5FsQpr7wLf7cyAOoGsU1W8y8DROkfnAnYWwQfvIh0T6A9CZfSCgECSEEe4t5krx5BqNfqw7RHI6g43Myt54fk8HC6nc6a6fmdzqWCDQHAH596_NOCYpoquIqpzFB9baXd2Emof7jpNKaFIcdJe44cL_sXdq5jIVuQ9bRwQqd8DyjRv4yfxifpJ_wMJLLi2plJJhKNqjv3ausnpavrYC01OGSo4hmnyYTd80vNTrNsAqqk95PTf-RUBDlUithSJCsbUVbS-8jJMJzUlwfyusxPAMMfrVH92OgvRUDiaX6LBLuDSE2QUukA6xCusOh6il_pCVQKVf7Gx-WHH3ZEDw9w2AMcl8LKr0_rY-4nDy2uxwCi58uIiRqcy6C0S3q_rIhcQDw2nkeF5orFzsAcuCzlvUA7g'
    //     })
    //   })
    //   .catch(function (err) {
    //     console.log('Unable to get permission to notify.', err)
    // })

    // navigator.serviceWorker.addEventListener('message', (message) => console.log(message));
  // }


  let history = useHistory();
  console.log(history)
  return (
    <div className="bottom-wrapper">
      <div>
        <button onClick={() => history.push("/activity")} >
          {
            history.location.pathname === "/activity" ? 
              <img
                src={activityActive} alt=""
              /> :
              <img
                src={activityDefault} alt=""
              />
          }
        </button>
      </div>
      <div>
        <button onClick={() => history.push("/groups")} >
         {
            history.location.pathname === "/groups" ? 
              <img
                src={eventsActive} alt=""
              /> :
              <img
                src={eventsDefault} alt=""
              />
          }
        </button>
      </div>
      <div>
        <button onClick={() => history.push("/events")}>
          {
            history.location.pathname === "/events" ? 
              <img
                src={groupActive} alt=""
              /> :
              <img
                src={groupDefault} alt=""
              />
          }
        </button>
      </div>
    </div>
  )
}

export default BottomNavigation;
