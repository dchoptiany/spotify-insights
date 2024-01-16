export const logout = () =>{
    window.open("http://aws_hostname:8000/auth/logout", '_self');
 
}

export const sendGetUserRequest = ()=>{
    return fetch("http://aws_hostname:8000/auth/login/success", {
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
  return fetch("http://aws_hostname:8000/api/api_data", {
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
  return fetch("http://aws_hostname:8000/api/dataCollector", {
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


export const DataSketchesRequest = (endpoint, startDate, endDate) => {  
  const queryParams = new URLSearchParams({
    endpoint: endpoint,
    startdate: startDate,
    enddate: endDate,
  });

  return fetch(`http://aws_hostname:8000/api/dataSketches?${queryParams}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
};



