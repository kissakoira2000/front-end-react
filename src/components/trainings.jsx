import { useEffect } from "react"
import { useState } from "react"
import { AgGridReact } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import dayjs from 'dayjs'
import { Button } from 'react-bootstrap';

export default function Trainings() {
const [trainings, setTrainings] = useState([])


    useEffect(() => {
        fetchtrainings()
    }, []);

    const fetchtrainings = () => {
        fetch('https://customerrestservice-personaltraining.rahtiapp.fi/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data))
    }

    const deletetraining = (link) => {
        console.log("Link:", link);
        if (window.confirm('Are you sure?')) {
            fetch(link, {
                method: 'DELETE'
            })
            .then(res => fetchtrainings())
            .catch(err => console.error(err))
        }
    }
    

    const columns = [
        { field: 'date', headerName: 'Date', filter: true , valueFormatter: (params) => dayjs(params.value).format('DD.MM.YYYY HH:mm')},
        { field: 'duration', headerName: 'Duration', filter: true},
        { field: 'activity', headerName: 'Activity', filter: true},
        { headerName: 'Customer', filter: true,
            valueGetter: (params) => params.data.customer ? `${params.data.customer.firstname} ${params.data.customer.lastname}` : 'ei löydy',
        },
        { headerName: "", field: "_links.self.href", filter: false, sortable: false, width: 150,
        cellRenderer: row => <Button color='warning' onClick={() => deletetraining(row.value)}>Delete</Button>}
    ]

    return (
        <div className="ag-theme-alpine" style={{height: '800px', width: '100%'}}>
            <h1>Trainings</h1>
            <AgGridReact rowData={trainings} columnDefs={columns} />
        </div>
    )
}