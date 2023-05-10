import React,{useState,useEffect} from 'react'


const Home1 = () => {

    const API = 'https://jsonplaceholder.typicode.com/users ';

    const [users,setUsers] = useState([]);

    const fetchUser = async(url) =>{
        try{
            const res = await fetch(url);
            const data = await res.json();
            if(data.length>0){
                setUsers(data);
            }
            console.log(data)

        }catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        fetchUser(API)
    },[]);
    console.log(users[0])
  return (
    <>
    <table>
        <thead>
            <tr>
        <th>Id</th>
        <th>Name</th>
        <th>Email</th>
        <th>Address</th>
        </tr>

        </thead>
    </table>
    <tbody>
        
        {
        users.map((curUser)=>{
            
            return(
                <tr>
                    <td>{curUser.id}</td>
                    <td>{curUser.name}</td>
                    <td>{curUser.email}</td>
                </tr>
            )
        })
    }
    </tbody>
    </>
  )
}

export default Home1