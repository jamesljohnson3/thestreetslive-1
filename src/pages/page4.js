import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios"
function Get() {
    const [data, setData]  = useState('');
const getAllData = () => {
        axios
          .get("https://jsonplaceholder.typicode.com/users")
          .then((response) => {
            console.log(response.data);
            setData(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
}
useEffect(() => {
      getAllData();
},[]);
return (
        <>
            {data ? 
                data.map(data => {
                    return(
                       <div className="data" key={data.id}>
                         <h3>{data.name}</h3><button data-arengu-modal-form-id="166129762826943295">Subscribe</button>
                       </div>
                    )
                }) : <h3>No data yet</h3> }
        </>
    )
}
export default Get;