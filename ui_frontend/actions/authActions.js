
export const logout = () =>{
    window.open('http://ec2-52-59-247-253.eu-central-1.compute.amazonaws.com:8000/auth/logout', '_self');
 
}

export const sendGetUserRequest = ()=>{
    return fetch("http://ec2-52-59-247-253.eu-central-1.compute.amazonaws.com:8000/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        }
})
}



