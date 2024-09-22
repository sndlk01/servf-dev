const baseApiUrl = useRuntimeConfig().public.apiBase
// import axios from 'axios';
import axios from 'axios';


const getLogin = async ( data) => {

    const token = localStorage.getItem('token')
    let headers = {
      "Content-Type": "application/json; charset=utf-8",
    //   Authorization: `Bearer ${token}`,
    }

      let res = await fetch(`${baseApiUrl}/login`,{
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
      });

      console.log("🚀 ~ getLogin ~ res:", res)
      const jsonData = await res.json();
      console.log("🚀 ~ getLogin ~ jsonData:", jsonData)
      return jsonData;
}




export { getLogin};