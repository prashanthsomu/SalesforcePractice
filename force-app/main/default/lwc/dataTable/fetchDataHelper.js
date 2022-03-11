// const recordMetadata = {
//     accountname: 'name', 
//     phone: 'phone',
//     type: 'type', 
//     priority: 'priority',
//     phone: 'phoneNumber',
//     revenue: 'revenue', 
// };

// export default function fetchDataHelper({ amountOfRecords }) { 
//     return fetch('https://data-faker.herokuapp.com/collection', {  
//         method: 'POST', 
//         headers: {
//             'Content-Type': 'application/json; charset=utf-8',
//         },
//         body: JSON.stringify({   
//             amountOfRecords,
//             recordMetadata,
//         }),
//     }).then((response) => response.json());
// }
