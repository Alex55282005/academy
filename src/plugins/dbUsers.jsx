import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";


function DbUsers() {
    const [arrayDefault, setArray] = useState([]);
    const [headersDefault, setHeaders] = useState([]);
    const array = [];
    
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                'https://63f4eaff2213ed989c4d6abd.mockapi.io/employees',
            );
            result.data.map((item) => {
                delete item.id
            });
            setArray(result.data);
            const key = result.data[0];
            const headers = Object.keys(key) 
            setHeaders(headers);
        };
        fetchData();
    }, []);

    return (arrayDefault.map((item) => (
        <tr>
        {Object.values(item).map((val) => (
            <td>{val}</td>
        ))}
        </tr>
    )))
}

export default DbUsers;