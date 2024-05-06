import { useEffect } from "react"
import { useState } from "react"
import { AgGridReact } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import AddCustomer from "./addCustomer";
import EditCustomer from "./editCustomer";
import { Button } from 'react-bootstrap';



export default function Customer() {
const [customer, setCustomer] = useState([])

    useEffect(() => {
        fetchcustomer()
    }, []);

    const fetchcustomer = () => {
        fetch('https://customerrestservice-personaltraining.rahtiapp.fi/api/customers')
        .then(response => response.json())
        .then(data => setCustomer(data._embedded.customers))
    }

    const saveCustomer = (newCustomer) => {
        fetch('https://customerrestservice-personaltraining.rahtiapp.fi/api/customers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCustomer)
        })
        .then(res => fetchcustomer())
        .catch(err => console.error(err))
    }

    const updateCustomer = (customer, link) => {
        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
        .then(res => fetchcustomer())
        .catch(err => console.error(err))
    }

    const deletecustomer = (link) => {
        if(window.confirm('Are you sure?')) {
            fetch(link, {
                method: 'DELETE'
            })
            .then(res => fetchcustomer())
            .catch(err => console.error(err))
        }
    }
    
    const columns = [
        { field: 'firstname', headerName: 'Firstname', filter: true},
        { field: 'lastname', headerName: 'Lastname', filter: true},
        { field: 'streetaddress', headerName: 'Streetaddress', filter: true},
        { field: 'postcode', headerName: 'Postcode', filter: true},
        { field: 'city', headerName: 'City', filter: true},
        { field: 'email', headerName: 'Email', filter: true},
        { field: 'phone', headerName: 'Phone', filter: true},
        { headerName: "", filterable: false, sortable: false, width: 150, cellRenderer: row => <EditCustomer updateCustomer={updateCustomer} rowData={row.data} saveCustomer={saveCustomer}/>},
        { headerName: "", field: "_links.self.href", filter: false, sortable: false, width: 150,
      cellRenderer: row => <Button color='warning' onClick={() => deletecustomer(row.value)}>Delete</Button>}
    ]

    return (
        <div className="ag-theme-alpine" style={{height: '800px', width: '100%'}}>
            <h1>Customers</h1>
            <AddCustomer saveCustomer={saveCustomer} />
            <AgGridReact rowData={customer} columnDefs={columns} />
        </div>
    )
}