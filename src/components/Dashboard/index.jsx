import { useState, useEffect } from "react";
import AddSubscription from "../AddSubscription";
import EditSubscription from "../EditSubscription";
import EndSubscription from "../EndSubscription";
import "./index.css";

const Dashboard = () => {

  const[earnings, changeEarnings] = useState(0)
  const [subscriptionsData, changeSubscriptionsData] = useState([])

  useEffect(() => {
    let amount = 0
    subscriptionsData.forEach(es=>{
      if (es.product_name == 'Amazon Prime 365/yr') {
        amount += es.no_of_days * es.no_of_subscriptions
      }
      else{
        amount += (es.no_of_days * es.no_of_subscriptions)*2
      }
    })
    changeEarnings(amount)      
  },)  

  const onAmountFetch = () => {
    console.log('amount fetched');

    const getSalesData = async () => {
      const response = await fetch('http://127.0.0.1:5000/get-subscriptions')
      const result = await response.json()
      changeSubscriptionsData(result)
    }
    getSalesData()        
  }

  return (
    <div className="dashboardComponent">
      <AddSubscription />
      <EditSubscription />
      <EndSubscription />
      <h2>Revenue Earned Till Date: {earnings}/-</h2>
      <button onClick={onAmountFetch}>Fetch Total Amount From Database</button>
    </div>
  );
};

export default Dashboard;
