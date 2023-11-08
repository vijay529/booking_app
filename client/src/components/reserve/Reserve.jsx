import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useFetch from '../../hooks/useFetch.js'
import './reserve.css'
import React, { useContext, useState } from 'react'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { SearchContext } from '../../context/SearchContext.js'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const Reserve = ({setOpen, hotelId}) => {
  const [selectedRooms, setSelectedRooms] = useState([])
  const {data, loading, error} = useFetch(`http://localhost:8000/api/hotels/room/${hotelId}`)
  const {dates} = useContext(SearchContext)

  const getDatesInRange = (startDate, endDate)=>{
    const start = new Date(startDate);
    const end = new Date(endDate);
    const date = new Date(start.getTime());
    let list = []

    while(date<=end ){
      list.push(new Date(date).getTime())
      date.setDate(date.getDate()+1)
    }

    return list
}

  const allDates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  const isAvailable = (roomNumber)=>{
    const isFound = roomNumber.unavailableDates.some(date=>{
      allDates.includes(new Date(date).getTime())
    })
    return !isFound;
  }
  
  const handleSelect = (e)=>{
    const checked = e.target.checked;
    const value = e.target.value;

    setSelectedRooms((checked)?[...selectedRooms, value]: selectedRooms.filter((item)=> item !== value))
    
  }

  const navigate = useNavigate()

  const handleClick = async()=>{
    try {
      await Promise.all(selectedRooms.map((roomId)=>{
        const res = axios.put(`/rooms/availability/${roomId}`, {dates: allDates})
        return res.data
      }))
      setOpen(false);
      navigate('/')
    } catch (err) {
      
    }
  }

  return (
    <div className='reserve'>
        <div className="rContainer">
            <FontAwesomeIcon icon={faCircleXmark} className='rClose' onClick={()=>setOpen(false)}/>
            <span>Select your rooms: </span>
            {
              data.map((item)=>{
                const roomArray = item.roomNumbers;
               return <div className="rItem" >
                  <div className="rItemInfo">
                    <div className="rTitle">{item.title}</div>
                    <div className="rDesc">{item.desc}</div>
                    <div className="rMax">Max people: <b>{item.maxpeople}</b></div>
                    <div className="rPrice">{item.price}$</div>
                  </div>
                  <div className="rSelectRooms">
                  {
                    roomArray.map((roomNumber)=>{
                      return(
                        <div className="room" >
                          <label >{roomNumber.number}</label>
                          <input type="checkbox" value={roomNumber._id} onChange={handleSelect} disabled={isAvailable(roomNumber)}/>
                        </div>
                      )
                    })
                  }
                  </div>
                  
                </div>
              })
            }
            <button onClick={handleClick} className="rButton">Reserve Now!</button>
        </div>
    </div>
  )
}

export default Reserve