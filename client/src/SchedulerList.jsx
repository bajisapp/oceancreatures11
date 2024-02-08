import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UpdateUser from './UpdateUser';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import 'react-calendar/dist/Calendar.css';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import DataTable from 'react-data-table-component';

function SchedulerList() {
  const navigate = useNavigate();

  const [calenderlist, setcalenderlist] = useState([]);

  const localizer = momentLocalizer(moment);

  useEffect(() => {
    axios
      .get('http://localhost:3002/getUserslist')
      .then((calenderlist) => setcalenderlist(calenderlist.data))
      .catch((err) => console.log(err));
  }, []);

  const columns = [
    {
      name: 'Name',
      selector: 'Name',
      sortable: true,
    },
    {
      name: 'Date',
      selector: 'Date',
      sortable: true,
    },
    {
      name: 'ClassTime',
      selector: 'ClassTime',
      sortable: true,
    },
    {
      name: 'ClassDuration',
      selector: 'ClassDuration',
      sortable: true,
    },
    {
      name: 'Status',
      selector: 'Status',
      sortable: true,
      cell: (row) => <span style={getStatusColor(row.Status)}>{row.Status}</span>,
    },
    {
      name: 'Remarks',
      selector: 'Remarks',
      sortable: true,
    },
    {
      name: 'Actions',
      cell: (row) => (
        <div style={{display:'none'}}>
          <Link className="btn btn-dark btn-sm">Edit</Link>
          <button className="btn btn-sm btn-danger">Delete</button>
        </div>
      ),
    },
  ];

  const getStatusColor = (status) => {
    let backgroundColor, textColor;

    if (status === 'present') {
      backgroundColor = 'green';
      textColor = 'white';
    } else if (status === 'absent') {
      backgroundColor = 'orange';
      textColor = 'black';
    } else {
      backgroundColor = '#ddd';
      textColor = 'black';
    }

    return { backgroundColor, color: textColor, padding: '5px', borderRadius: '6px' };
  };

  return (
    <div>
      <DataTable
        title="Scheduler List"
        columns={columns}
        data={calenderlist}
        pagination
        paginationPerPage={5} // Set the number of items per page
        paginationRowsPerPageOptions={[5, 10, 15, 20]} // Set the options for items per page
      />
    </div>
  );
}

export default SchedulerList;
