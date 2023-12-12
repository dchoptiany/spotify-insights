import hostname from "../config/config.js"

export const logout = () =>{
    window.open(hostname + ":8000/auth/logout", '_self'); // 'http://localhost:8000/auth/logout'
 
}

export const sendGetUserRequest = ()=>{
    return fetch(hostname + ":8000/auth/login/success", { // "http://localhost:8000/auth/login/success"
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        }
})
}

export const makeRequest = (endpoint, method) => {
  return fetch(hostname + ":8000/api/api_data", { // "http://localhost:8000/api/api_data"
    method: method,
    credentials: "include",
    headers: {
      Accept: "application/json",
      'Content-Type': 'application/json',
      'endpoint': endpoint, 
      "Access-Control-Allow-Credentials": true,
    }
  })
}

export const DataCollectorRequest = (endpoint) => {   
  return fetch(hostname + ":8000/api/dataCollector", { // 'http://localhost:8000/api/dataCollector'
    method: 'GET',
    credentials: "include",
    headers: {
      Accept: "application/json",
      endpoint : endpoint,
      'Content-Type': 'application/json',
      "Access-Control-Allow-Credentials": true,
    },
  })

};



