import { useState, useEffect } from "react";
import "./index.css";
import {format} from 'date-fns'

const EditSubscription = () => {

const [customersData, changeCustomersData] = useState([])
const [productsData, changeProductsData] = useState([])

const [selectedCustomer, changeSelectedCustomer] = useState('')
const [selectedProduct, changeSelectedProduct] = useState('')
const [selectedDate, changeSelectedDate] = useState(format((new Date().setDate(new Date().getDate() + 1)), "yyyy-MM-dd"))

const [userMessage, changeUserMessage] = useState('')

useEffect(()=>{
  const getCustomersData = async() => {
    const response = await fetch('http://127.0.0.1:5000/get-customers')
    const result = await response.json()
    changeCustomersData(result)
    changeSelectedCustomer(result[0].customer_id)
  }
  getCustomersData()

  const getProductsData = async() => {
    const response = await fetch('http://127.0.0.1:5000/get-products')
    const result = await response.json()
    changeProductsData(result)
    changeSelectedProduct(result[0].product_name)
  }
  getProductsData()


}, [])

const onCustomerChange = (e) => {
  changeSelectedCustomer(e.target.value)
}

const onProductChange = (e) => {
  changeSelectedProduct(e.target.value)
}

const onDateChange = (e) => {
  changeSelectedDate(e.target.value)
}

const onSubmitClick = async () => {
  if(selectedDate == '')
  {
    changeUserMessage('*Enter Valid Information')
  }
  else{
    changeUserMessage('')
    const reqBody = ({customer_id: selectedCustomer, product_name: selectedProduct, end_date: selectedDate})
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody)
    }

    const response = await fetch('http://127.0.0.1:5000/extend-subscription', options)
    const result = await response.json()
    changeUserMessage(result.result)
    
  }
}


  return (
    <div className="addSubscriptionComponent">
      <h2 className="addSubscriptionHeading">Extend Subscription: </h2>
      <div className="subscriptionAdder">
        <label className="formLabel" htmlFor="selectCustomer">
          Select Customer:
        </label>
        <select className="form-control" id="selectCustomer" value={selectedCustomer} onChange={onCustomerChange}>
          {
            customersData.map(ec=><option key={ec.customer_name} value={ec.customer_id}>{ec.customer_name}</option>)
          }
        </select>
        <label className="formLabel" htmlFor="selectProduct">
          Select Product:
        </label>
        <select className="form-control" id="selectProduct" value={selectedProduct} onChange={onProductChange}>
          {
            productsData.map(ep=><option key={ep.product_name} value={ep.product_name}>{ep.product_name}</option>)
          }
        </select>
        <div className="datesPickersDiv">
          <div className="endDatePickerDiv">
            <label className="formLabel">End Date:</label>
            <input className="datePicker form-control" type="date" min={format((new Date().setDate(new Date().getDate() + 1)), "yyyy-MM-dd")} onChange={onDateChange} value={selectedDate} />
          </div>
        </div>
        <p className="userMessage">{userMessage}</p>
        <button className="btn btn-outline-dark addBtn" onClick={onSubmitClick}>
          Extend Subscription
        </button>
      </div>
    </div>
  );
};

export default EditSubscription;
