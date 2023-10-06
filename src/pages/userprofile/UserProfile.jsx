import {useEffect, useState} from "react";
import instance from "../../service/AxiosOrder.js";
import {useAuth} from '../../data/useAuth.jsx'


export default function UserProfile(){

    const {id} = useAuth();
    //console.log(id)
    const [details, setDetails] = useState([]);
    useEffect(() => {
        const getDataByUserID =  () => {
            instance.get(`/user/getuserInfor/${id}`, {
                headers: {token: localStorage.getItem("token")}
            })
            .then(function (response) {
                // handle success
                console.log(response.data[0]);
                setDetails(response.data[0]);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
        }
        getDataByUserID();
    }, [id]);




    return(
       <>
           <div className="d-flex justify-content-between align-items-start gap-3 m-5">
               <div className="d-flex flex-grow-1 bg-white p-3 roudned-3 ">
                   <div >
                       <h5 >Name</h5>
                       <p>{`${details.first_name} ${details.last_name}`}</p>
                       <h5> Email </h5>
                       <p >{details.email}</p>
                       <h5> Contact Number </h5>
                       <p >{details.phone_number}</p>
                   </div>
               </div>
               <div className="d-flex flex-grow-1 bg-white p-3 roudned-3">
                   <div >
                       <h4 >Billing Address</h4>
                       <span >{details.Unit_number}</span><br/>
                       <span >{details.addressline_1}</span><br/>
                       <span >{details.addressline_2}</span><br/>
                       <span >{details.city}</span><br/>
                   </div>
               </div>
           </div>
           <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3 m-5">
               <div>
                   <h4>My Orders</h4>
               </div>

           </div>

       </>
    )
}