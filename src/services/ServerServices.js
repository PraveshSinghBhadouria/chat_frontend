import axios from "axios"
const ServerURL="http://localhost:5000"


const getData=async(url)=>{
try{    
var response=await axios.get(`${ServerURL}/${url}`)

var result=await response.data
return result
}
catch(e)
{ return null}
}

const postData=async(url,body)=>{
    try{    
    var response=await axios.post(`${ServerURL}/${url}`,body)
    
    var result=await response.data
    return result
    }
    catch(e)
    { return null}
    }
    const logout = async () => {
        // Clear any authentication tokens or session data
        localStorage.removeItem('authToken'); // Assuming the token is stored in localStorage
      
        // Optionally, make an API call to notify the server of the logout
        // await fetch('http://localhost:5000/logout', { method: 'POST' });
      
        // This example does not require a server call for logout
      };



export {ServerURL,getData,postData,logout}