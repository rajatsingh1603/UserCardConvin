import React, { useEffect, useState } from 'react'
import '../src/body.css'

function Body() {
    const [userList, setUserList] = useState([]);
    const [singleUser, setSingleUser] = useState([]);
    const [spinner, setSpinner] = useState(false);

    useEffect(() => {
        fetch('https://reqres.in/api/users?page=1')
            .then(res => res.json())
            .then(json => setUserList(json.data))
    }, [])

    const handleClick = (e) => {
        setSpinner(true)
        var url = "https://reqres.in/api/users/"
        url += e.target.value;
        fetch(url)
            .then(res => res.json())
            .then((json) => {
                setSingleUser(json.data)
                setSpinner(false);
            })
    }

    const fetchMore = () => {

        fetch('https://reqres.in/api/users?page=2')
            .then(res => res.json())
            .then(json => setUserList(json.data))

    }
    console.log(singleUser)
    return (
        <>
            {spinner ? "Fetching..." : <div class="card">
                <img src={singleUser.avatar || "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"} alt="Avatar" style={{ width: "10%" }} />
                <div class="container">
                    <p> <b>Id: </b> {singleUser.id || 0}</p>
                    <h2><b>{singleUser.first_name} {singleUser.last_name}</b></h2>
                </div>
            </div>}
            <div className='box'>
                {
                    userList.map((res) => (
                        <button onClick={handleClick} value={res.id} >{"User: " + res.id}</button>
                    ))
                }
            </div>
            <div>
                <input type="button" value="Fetch More..." onClick={fetchMore}></input>
            </div>



        </>
    )
}

export default Body