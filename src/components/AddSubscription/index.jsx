import "./index.css";
import { useState, useEffect } from "react";
import { format } from "date-fns";

const AddSubscription = () => {

  const [customersList, changeCustomersList] = useState([])
  const [productsList, changeProductsList] = useState([])

  const [selectedCustomer, changeSelectedCustomer] = useState('')
  const [selectedProduct, changeSelectedProduct] = useState('')
  const [noOfProducts, changeNoOfProducts] = useState('')
  const [startDate, changeStartDate] = useState(format(new Date(), "yyyy-MM-dd"))
  const [endDate, changeEndDate] = useState('')

  const [userWarning, changeUserWarning] = useState('')


  //console.log(format(new Date(), "dd/MM/yyyy"));

  //console.log(startDate);
  

  useEffect(()=>{    
    const getCustomers = async () => {
      const response = await fetch('http://127.0.0.1:5000/get-customers')
      const result = await response.json()
      changeCustomersList(result)
      changeSelectedCustomer(result[0].customer_id)
    }
    getCustomers()

    const getProducts = async () => {
      const response = await fetch('http://127.0.0.1:5000/get-products')
      const result = await response.json()
      changeProductsList(result)
      changeSelectedProduct(result[0].product_name)
    }
    getProducts()
    
  }, [])

  const onCustomerChange = (e) => {
    changeSelectedCustomer(e.target.value)
  }
  
  const onProductChange = (e) => {
    changeSelectedProduct(e.target.value)
  }

  const onNoOfProductsEntry = (e) => {
    changeNoOfProducts(e.target.value)
  }

  const onStartDateChange = (e) => {
    changeStartDate(format(new Date(), "yyyy-MM-dd"))
    changeUserWarning('You cannot change the start date.')
  }

  const onEndDateChange = e => {
    changeEndDate(e.target.value)
  }

  const onSubmitClick = async () => {
    if (startDate == '' || endDate == '' || noOfProducts == '') {
      changeUserWarning('*Enter all the Details Properly.')
    }
    else{
      changeUserWarning('')
      const reqBody = ({customer_id: selectedCustomer, product_name: selectedProduct, start_date: startDate, end_date: endDate, no_of_subscriptions: noOfProducts})
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqBody)
      }

      const response = await fetch('http://127.0.0.1:5000/new-subscription', options)
      const result = await response.json()
      console.log(changeUserWarning(result.result));
      
    }
  }
console.log(startDate);


  return (
    <div className="addSubscriptionComponent">
      <h2 className="addSubscriptionHeading">Add New Subscription: </h2>
      <div className="subscriptionAdder">
        <label className="formLabel" htmlFor="selectCustomer">
          Select Customer:
        </label>
        <select className="form-control" id="selectCustomer" value={selectedCustomer} onChange={onCustomerChange}>
          {
            customersList.map(ec => <option key={ec.customer_id} value={ec.customer_id}>{ec.customer_name}</option>)
          }
        </select>
        <label className="formLabel" htmlFor="selectProduct">
          Select Product:
        </label>
        <select className="form-control" id="selectProduct" value={selectedProduct} onChange={onProductChange}>
          {
            productsList.map(ep=><option key={ep.product_name} value={ep.product_name}>{ep.product_name}</option>)
          }
        </select>
        <div className="datesPickersDiv">
          <div className="datesPickerDiv">
            <label className="formLabel">Start Date:</label>
            <input className="datePicker form-control" type="date" min={format(new Date(), "yyyy-MM-dd")} max={format(new Date(), "yyyy-MM-dd")} value={startDate} onChange={onStartDateChange} />
          </div>
          <div className="datesPickerDiv">
            <label className="formLabel">End Date:</label>
            <input className="datePicker form-control" type="date" min={format(new Date(), "yyyy-MM-dd")} value={endDate} onChange={onEndDateChange} />
          </div>
        </div>
        <label className="formLabel" htmlFor="">
          Number Of Subscriptions
        </label>
        <input className="form-control" type="text" placeholder="Ex: 2" onChange={onNoOfProductsEntry} value={noOfProducts} />
        <p className="userWarning">{userWarning}</p>
        <button onClick={onSubmitClick} className="btn btn-outline-dark addBtn">
          Add Subscription
        </button>
      </div>
    </div>
  );
};

export default AddSubscription;
