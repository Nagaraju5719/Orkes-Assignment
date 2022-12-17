import React from 'react'
import { useState, useEffect } from 'react'
import "./List.css"

const List = () => {
    const [listData, setListData] = useState([])
    const [page, setPage] = useState(1)
    //console.log(listData)

    const listenToScroll = () => {
        const pageScroll =
            document.body.scrollTop || document.documentElement.scrollTop

        const docHeight =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight

        const scrollPosition = pageScroll / docHeight
        setPage(scrollPosition === 1 ? page + 1 : page)
    }
    window.addEventListener('scroll', listenToScroll)

    useEffect(() => {
        fetch(`https://englishapi.pinkvilla.com/app-api/v1/photo-gallery-feed-page/page/${page}`)
            .then((response) => response.json())
            .then((data) => setListData([...listData, ...data.nodes]))
    }, [page])
    return (
        <div>
            {listData && listData.map((user, index) => {
                const updatedTime = new Date(user.node.last_update)
                const fullDate = updatedTime.getDay().toString().length === 1 ? `0${updatedTime.getDay()}` : updatedTime.getDay()
                const updatedDate = updatedTime.toLocaleString("en-us", { month: "short" }) + " " + fullDate + ", " + updatedTime.getFullYear()

                let time
                let hours = updatedTime.getHours()
                if (updatedTime.getHours() > 12) {
                    hours = hours - 12
                    time = hours.length === 1 ? `0${hours}` : hours + ":" + updatedTime.getMinutes() + " PM IST"
                }
                else {
                    time = hours.length === 1 ? `0${hours}` : hours + ":" + updatedTime.getMinutes() + " AM IST"
                }
                const updatedDandT = updatedDate + " " + time
                console.log(updatedDandT)
                return (
                    <div key={index} className="userBox">
                        <img className='imgStyle' src={user.node.field_photo_image_section} alt={`${user.node.field_photo_image_section}`} />
                        <div style={{ width: "300px" }}>
                            <h3>{user.node.title}</h3>
                            <h3 style={{ color: "#898b8c" }}>{`${updatedDandT}`}</h3>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default List
