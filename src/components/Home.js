import React,{useState,useEffect} from 'react'
import './home.css'

const Home = () => {

    const[records,setRecords] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const data = filteredData.length > 0 ? filteredData : records.products;

    // const data = records.products;

    //for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 5;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const record1 = data?.slice(firstIndex, lastIndex);
    
    const npage = data? Math.ceil(data.length/recordsPerPage) : 0;
    //const npage = Math.ceil(data.length / recordsPerPage);
    const numbers = [...Array(npage + 1).keys()].slice(1)       //end of pagination

    

    const fetchData =async()=>{
        
        try{
        const response = await fetch("https://dummyjson.com/products");
        const result =await response.json();
        setRecords(result);
        }
        catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        fetchData()
    },[]);
    
    //console.log(records.products?.[0])
    //console.log(data?.[5]);                    //? solve my problem as it say if there is data then display only
    
    const filter = (event) => {
        const searchTerm = event.target.value.toLowerCase();
        const filteredData = records.products.filter((product) =>
          product.title.toLowerCase().includes(searchTerm)
        );
        setFilteredData(filteredData);
        setCurrentPage(1); // Reset to the first page when filtering
      };
    

  return (
    <>
    <input type='text' className='search' placeholder='search' onChange={filter}></input>
        {
                record1?.map((list,index)=>{
                return(
                    <>
                    <div className='main'>
                        <div className='card'>

                            <div className='items'>
                    <img src={list.images[0]}></img>
                    </div>
                    <div className='about_items'>
                    <p className='title' key={index}>{list.title}</p>
                    <p>Id: {list.id} </p>
                    <p>Desc: {list.description}</p>
                    <p>Price: {list.price}</p>
                    <p>Rating: {list.rating}</p>
                    </div>

                    </div>
                    </div>
                    </>      
                )
            })
        }
        
        <nav>
            <ul className='pagination'>
                <li className='pageItem'>
                    <a href='#' onClick={prePage}>Prev</a>
                </li>

                {
            numbers?.map((n,i)=>{
                return (
                <li className={`page_item ${currentPage === n ? 'active' : ''}`} key={i}>
                    <a href='#' className='page_item1' onClick={()=>changeCPage(n)}>{n}</a>
                </li>
                );
            })
        }

                <li className='pageItem'>
                    <a href='#' onClick={nextPage}>Next</a>
                </li>
            </ul>
        </nav>
        
    </>
  )
  function prePage(){
    if(currentPage !== 1){
        setCurrentPage(currentPage - 1);
    }
  }

  function nextPage(){
    if(currentPage !== lastIndex){
        setCurrentPage(currentPage + 1);
    }
  }

    function changeCPage(id){
        setCurrentPage(id);
    }
  
}

export default Home