import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const HolidaysCalendar = () => {
  const holidays = {
    January: [
      { date: '2023-01-26', name: 'Republic Day' },
      // Add more holidays as needed
    ],
    February: [
      // Add holidays for February
    ],
    March: [
      { date: '2023-03-11', name: 'Maha Shivaratri' },
      { date: '2023-03-29', name: 'Holi' },
      // Add more holidays as needed
    ],
    April: [
      { date: '2023-04-02', name: 'Good Friday' },
      { date: '2023-04-14', name: 'Baisakhi' },
      // Add more holidays as needed
    ],
    May: [
      { date: '2023-05-01', name: 'May Day' },
      { date: '2023-05-09', name: 'Akshaya Tritiya' },
      // Add more holidays as needed
    ],
    June: [
      // Add holidays for June
    ],
    July: [
      { date: '2023-07-12', name: 'Rath Yatra' },
      // Add more holidays as needed
    ],
    August: [
      { date: '2023-08-15', name: 'Independence Day' },
      { date: '2023-08-19', name: 'Muharram' },
      // Add more holidays as needed
    ],
    September: [
      { date: '2023-09-10', name: 'Ganesh Chaturthi' },
      // Add more holidays as needed
    ],
    October: [
      { date: '2023-10-02', name: 'Gandhi Jayanti' },
      { date: '2023-10-15', name: 'Dussehra' },
      // Add more holidays as needed
    ],
    November: [
      { date: '2023-11-04', name: 'Diwali' },
      { date: '2023-11-19', name: 'Guru Nanak Jayanti' },
      // Add more holidays as needed
    ],
    December: [
      { date: '2023-12-25', name: 'Christmas' },
      // Add more holidays as needed
    ],
  };

  return (
    <div className="container mt-5">
      <div className="card mx-auto shadow p-3 mb-5 bg-light rounded" style={{ maxWidth: '800px' }}>
        <div className="card-body bg-light">
          <h2 className="card-title text-center mb-4 text-primary">Holidays Calendar (2023)</h2>
          {Object.entries(holidays).map(([month, monthHolidays]) => (
            <div key={month} className="mb-4">
              <h3 className="text-primary">{month}</h3>
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Holiday</th>
                  </tr>
                </thead>
                <tbody>
                  {monthHolidays.map((holiday, index) => (
                    <tr key={index}>
                      <td>{holiday.date}</td>
                      <td>{holiday.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HolidaysCalendar;
