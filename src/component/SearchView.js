import axios from 'axios'
import React, { useEffect, useState } from 'react'

const SearchView = () => {
    const dataSend = localStorage.getItem('title')
    const [data, setData] = useState()
    console.log("object", typeof dataSend)


    useEffect(async () => {
        const dataFromdb = await axios.get(`http://localhost:1337/search/${dataSend}`)
        console.log('here in the searched option', dataFromdb.data)
        setData(dataFromdb.data)
    }, [])


    return (
        <>
            {/* <div className="itemsOfUser">


                {data ? (
                    data.map((book,id)=>(
                     <div class="car" key={id}>
                     <img src={book.img} className="image" />
                     <div className="product_list">
                         <h6>Title: {book.title} </h6>
                         <h6>Description: {book.desc}</h6>
                         <h5>Price: Rs.{book.price}.00</h5>
                         <button >
                             Add to Cart</button>
                     </div>

                 </div>
                 ))
                    
                ) : (
                    
                   
                    <h3>please search again</h3>
                )
                }

            </div> */}

        </>
    )
}

export default SearchView;
