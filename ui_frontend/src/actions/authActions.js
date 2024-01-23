//logout
export const logout = () =>{
    window.open("http://aws_hostname:8000/auth/logout", '_self');
 
}


//Sending request in order to get user data
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


//Sending request
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

//Sending request in order to get Data collector data
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

//Sending request in order to get Data sketches data
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

//Fetching data from dataSketches combo
export const DataSketchesRequestCombo = (endpoint, startDate, endDate, array) => {  
  console.log("JSON Data:", array);
  const a = JSON.stringify(array);

  const queryParams = new URLSearchParams({
    endpoint: endpoint,
    startdate: startDate,
    enddate: endDate,
    array: a, 

  });
  return fetch(`http://aws_hostname:8000/api/dataSketchesCombo?${queryParams}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
};



