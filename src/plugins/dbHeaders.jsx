import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";


function DbHeaders() {
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
            const key = result.data[result.data.length-1];
            const headers = Object.keys(key) 
            setHeaders(headers);
        };
        fetchData();
    }, []);

    function HeaderNames() {
        return (headersDefault.map((item) => (
            <td>{item}</td>
        )))
    }


    return (<tr className="headerTr">
        <HeaderNames/>
    </tr>)
}

export default DbHeaders;