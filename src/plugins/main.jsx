import axios from "axios";
import { useState } from "react";
import "../styles/main.css"
import DbUsers from "./dbUsers"
import DbHeaders from "./dbHeaders"


function MainScreen() {
  const [file, setFile] = useState();
  const [array, setArray] = useState([]);
  

    

  const fileReader = new FileReader();

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };

  const csvFileToArray = string => {
    const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

    const array = csvRows.map(i => {
      const values = i.split(",");
      const obj = csvHeader.reduce((object, header, index) => {
        object[header] = values[index];
        return object;
      }, {});
      return obj;
    });
    for (let i = 0; i < array.length; i++) {
        axios.post("https://63f4eaff2213ed989c4d6abd.mockapi.io/employees", array[i]).then((response) => {
        });
        
    }
    setArray(array);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (file) {
      fileReader.onload = function (event) {
        const text = event.target.result;
        csvFileToArray(text);
      };

      fileReader.readAsText(file);
    }
    
  };
  

  const headerKeys = Object.keys(Object.assign({}, ...array));
    return (
        <div className="container">
            <div className="bodyContainer">
                <div>
                    <form>
                        <input
                        type={"file"}
                        id={"csvFileInput"}
                        accept={".csv"}
                        onChange={handleOnChange}
                        placeholder="upload"
                        />

                        <button className="importCsv"
                        onClick={(e) => {
                            handleOnSubmit(e);
                        }}
                        >
                        IMPORT CSV
                        </button>
                    </form>
                </div>
                <div>
                    
                    <table>
                        <thead>
                          <DbHeaders/>
                        <tr id="header" className="headerTr">
                            {headerKeys.map((key) => (
                            <td>{key}</td>
                            ))}
                        </tr>
                    </thead>

                        <tbody>
                        <DbUsers/>
                        {array.map((item) => (
                            <tr key={item.id}>
                            {Object.values(item).map((val) => (
                                <td>{val}</td>
                            ))}
                            </tr>
                        ))}
                        
                        </tbody>
                    </table>  
                   
                </div>
            </div>
        </div>
    );
}


export default MainScreen;