import React, { useState,useEffect } from 'react'

const Home2 = () => {
    let API = "http://hn.algolia.com/api/v1/search?query=html";

    const[data,setData] = useState([]);
    const[records,setRecords] = useState(data);

    const fetchApiData = async(url)=>{
        try{
            const res = await fetch(url);
            const data1 = await res.json();
            console.log(data1.hits);
            setData(data1.hits);
            setRecords(data1.hits);
        }catch(error){
            console.log(error);
        }
    }
    //const new_data = data.hits;

    useEffect(()=>{
        fetchApiData(API);
    },[]);

    const filter =(event)=>{
        const filteredData = (data.filter(f=>f.title.toLowerCase().includes(event.target.value)));
        setRecords(filteredData);
    }

    

  return (
    <div>
        <input type='text' placeholder='search' onChange={filter}></input>
        <ul>
            { records?.map((list,index)=>{
                return(
                    <>
                     <React.Fragment key={index}>
                    <p>{list.title}</p>
                <p>{list.author}</p>
                <p>{list.url}</p>
                </React.Fragment>
                </>
                )
            })
            }
        </ul>
    </div>
  )
}

export default Home2