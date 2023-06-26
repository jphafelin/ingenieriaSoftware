import React, { useState, useEffect } from "react";
import { useBotsContext } from "../store/botsProvider";
import "../../styles/botones.css"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom";
import logo from "../../img/LogoNewOffice.jpeg";
import "../../styles/navbar.css"





import "moment";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";



import { useEmpresasContext } from "../store/empresasProvider";
//import axios from 'axios';




export const ModificarBotId = () => {

  const idUsuarioActual = localStorage.getItem("id_user");
  const nombreUsuarioActual = localStorage.getItem("nombre_user");
  
  const token = localStorage.getItem("token");
  const usuarioActual = `${idUsuarioActual} - ${nombreUsuarioActual}`;
  const empresas = useEmpresasContext();
  const bots = useBotsContext();
  console.log("HOLA VENGO DEL CONTEXT", bots[0]);


  const navigate = useNavigate();
  const id_bot = parseInt(localStorage.getItem("id_bot"));
  const id_bot2 = localStorage.getItem("id_bot");
  

  const [csvData, setCsvData] = useState([]);


  useEffect(() => {

    
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch("http://186.67.10.116:3002/api/bots/" + id_bot2, requestOptions)
      .then(response => response.json())
      .then((datos) => {



        return setCsvData(datos);





      });


  }, []);

  const cerrarSesion = () =>{
    localStorage.removeItem("id_user");
    localStorage.removeItem("nombre_user");
    localStorage.removeItem("token");
    navigate("/login");
    //location.reload();
    
    }
  console.log(csvData);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
    
  
  const [selectedValue, setSelectedValue] = useState(`${bots[id_bot - 1].tipoEjecucion}`);
  const [value, setValue] = useState(`${bots[id_bot - 1].codBot}`);
  const [value2, setValue2] = useState(`${bots[id_bot - 1].descripcionBot}`);
 
  const [value4, setValue4] = useState(`${bots[id_bot - 1].observacion}`);
  const [value5, setValue5] = useState(`${bots[id_bot - 1].rutaCarpetasBot}`);
  const [value6, setValue6] = useState(`${bots[id_bot - 1].inicio}`);


  const [value7, setValue7] = useState(`${bots[id_bot - 1].termino}`);
  

  const [value8, setValue8] = useState(`${bots[id_bot - 1].usuarioCreador}`);
  const [value9, setValue9] = useState(`${bots[id_bot - 1].fechaCreacion}`);
  const [value10, setValue10] = useState(`${bots[id_bot - 1].usuarioUltimaModificacion}`);
  const [value11, setValue11] = useState(`${bots[id_bot - 1].fechaUltimaModificacion}`);


  const [selectedOption, setSelectedOption] = useState(`${bots[id_bot - 1].estado}`);
  const [selectedOption2, setSelectedOption2] = useState(`${bots[id_bot - 1].nombreEmpresa}`);


  function handleChange2(event) {
    if (event.target.value.indexOf(";") !== -1) {
      alert("El carácter ';' no está permitido en este campo.");
      setValue2(event.target.value.replace(";", ""));
    } else {
      setValue2(event.target.value);
      const valuerut = event.target.value.replace(/\D/g, '');
      const formattedValue = parseInt(valuerut).toLocaleString('es-AR');
      if (isNaN(parseInt(valuerut))) {
        setValue2('');
      } else {
        setValue2(formattedValue);
      }
    }
  }
  function handleSelect(event) {
    setSelectedOption(event.target.value);
  }
  function handleSelect2(event) {
    setSelectedOption2(event.target.value);
  }

  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
    console.log(selectedValue);
  };






  const grabar = () => {


    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "codBot": value.toLocaleUpperCase(),
      "descripcionBot": value2.toLocaleUpperCase(),
      "tipoEjecucion": selectedValue.toLocaleUpperCase(),
      "nombreEmpresa": selectedOption2.toLocaleUpperCase(),
      "observacion": value4.toLocaleUpperCase(),
      "rutaCarpetasBot": value5.toLocaleUpperCase(),
      "inicio": startDate.toLocaleDateString('es-ES', options).replace(/\//g, '-'),
      "termino": endDate.toLocaleDateString('es-ES', options).replace(/\//g, '-'),
      
      "usuarioCreador": value8.toLocaleUpperCase(),
      "fechaCreacion": value9.toLocaleUpperCase(),
      "fechaUltimaModificacion": `${currentDate} ${currentTime}`,
      "usuarioUltimaModificacion": usuarioActual.toUpperCase(),
      "estado": selectedOption
    });

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://186.67.10.116:3002/api/bots/" + id_bot2, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

    alert("Bot Modificado")
    navigate("/bots")

    //location.reload();



  }



  return (
    <div className=" justify-content-center">
      {token ? (
        <div>
          <nav className="navbar p-1">
            <div className="container-fluid row">
              <div className="col-2">
                <Link to="/menu">
                  <img src={logo} height="60px"></img>
                </Link>
              </div>
              <div className="col-8 text-center justify-content-start ">
                <h3>BOTS</h3>
              </div>
              <div className="col-2 text-end">
                <p>X04-I1</p>
                <div>
                  <button id="cerrar-sesion" className="text-light btn border border-3 border-dark" onClick={cerrarSesion}>CERRAR SESION</button>
                  <button id="ayuda" className="mx-2 btn border border-3 border-dark">?</button>
                </div>
              </div>
            </div>


          </nav>

          <div id="modificar-titulo" className="justify-content-center text-center border border-dark border-2">M O D I F I C A R</div>
          <div>

            <button id="btn-volver" className="btn col-1 m-1 justify border border-3 border-dark text-light" onClick={volver => navigate("/bots")}>VOLVER</button>

          </div>

          <div id="formulario" className="col-8 text-center py-1 border border-3 border-dark bg-light">
            <div className="row">
              <div className="text-start mx-3">
                <label className="label-id">ID:</label>
                <input className="casilla-id col bg-light rounded" maxLength="4" value={csvData.id} disabled="disabled"></input>
                <label className="label-codigo-bot">COD BOT:</label>
                <input className=" casilla-codigo-bot col-6 text-uppercase rounded" maxLength="5" value={value} onChange={(e) => { setValue(e.target.value) }} 
                ></input>
                <label className="label-descripcion-bot">DESCRIPCION BOT:</label>


                <input className="casilla-descripcion-bot col-2 text-uppercase rounded" maxLength="25" value={value2} onChange={(e) => { setValue2(e.target.value) }} 
                ></input>

              </div>

            </div>
            <div className="row my-2">
              <div className="text-start mx-3">
                <label className="label-estado">ESTADO:</label>
                <select className="col bg-primary text-light rounded" value={selectedOption} onChange={handleSelect}>
              <option>VIGENTE</option>
              <option>NO VIGENTE</option>

            </select>
                <label className="label-tipo-ejecucion">TIPO DE EJECUCION:</label>
                <label>
                  <input className="mx-2"
                    type="radio"
                    value="SIEMPRE"
                    checked={selectedValue === 'SIEMPRE'}
                    onChange={handleRadioChange}
                  />
                  SIEMPRE
                </label>

                <label>
                  <input className="mx-3"
                    type="radio"
                    value="PROGRAMADO"
                    checked={selectedValue === 'PROGRAMADO'}
                    onChange={handleRadioChange}
                  />
                  PROGRAMADO
                </label>

                <label>
                  <input className="mx-3"
                    type="radio"
                    value="NUNCA"
                    checked={selectedValue === 'NUNCA'}
                    onChange={handleRadioChange}
                  />
                  NUNCA
                </label>

              </div>

            </div>
            <div className="row my-2">
              <div className="text-start mx-3">
                <label className="label-nombre-empresa">NOMBRE EMPRESA:</label>
                <select className="col bg-primary text-light rounded select-nombre-empresa" value={selectedOption2} onChange={handleSelect2}>
                  {empresas.map((item, key = item.id) => (
                    <option>{item.razonSocial}</option>
                  ))}




                </select>


              </div>

            </div>
            <div className="row my-2">
              <div className="text-start mx-3">
                <label className="label-observacion">OBSERVACION:</label>
                <input className="casilla-observacion col-4 text-uppercase rounded" maxLength="50" value={value4} onChange={(e) => { setValue4(e.target.value) }}
                
                ></input>



              </div>

            </div>

            <div className="border-top border-bottom border-dark border-3 justify-content-center banda">
              <b>RUTA CARPETAS BOT</b>
            </div>
            <div className="row my-1">
              <div className="text-start py-1 mx-3">
                <label className="label-ruta-carpetas-bot">RUTA CARPETAS BOT:</label>
                <input className="casilla-ruta-carpetas-bot col-4 text-uppercase rounded" maxLength="50" value={value5} onChange={(e) => { setValue5(e.target.value) }}
                ></input>

              </div>
            </div>


            <div className="border-top border-bottom border-dark border-3 justify-content-center banda">
              <b>FECHAS OPERACION</b>
            </div>
            <div className="row my-2">
              <div className="col text-start mx-3">
                <div className="d-flex align-items-center">
                  <label className="label-inicio me-2">INICIO:</label>
                  <DatePicker
                    className="casilla-inicio text-uppercase rounded"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    dateFormat="dd-MM-yyyy"
                    dropdownMode="scroll"
                    popperPlacement="top-end"
                  />
                </div>
              </div>

              <div className="col text-start">
                <div className="d-flex align-items-center">
                  <label className="label-termino me-2">TERMINO:</label>
                  <DatePicker
                    className="casilla-inicio text-uppercase rounded"
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    dateFormat="dd-MM-yyyy"
                    dropdownMode="scroll"
                    popperPlacement="top-end"
                  />
                </div>
              </div>
            </div>

            <div className="border-top border-bottom border-dark border-3 justify-content-center banda">
              <b>DATOS REGISTRO</b>
            </div>
            <div className="row my-2">
              <div className="text-start mx-3">
                <label>USUARIO CREADOR:</label>
                <input className="casilla-nombre col-4 text-uppercase rounded bg-light" maxLength="35" value={value8} onChange={(e) => { setValue8(e.target.value) }} disabled="disabled"
                ></input>
                <label className="label-telefono">FECHA CREACION:</label>
                <input className="casilla-telefono col-4 text-uppercase rounded bg-light" maxLength="25" value={value9} onChange={(e) => { setValue9(e.target.value) }} disabled="disabled"
                ></input>
              </div>

            </div>
            <div className="row my-2">
              <div className="text-start mx-3">
                <label>USUARIO ULTIMA MODIF.:</label>
                <input className="casilla-email col-4 text-uppercase rounded bg-light" maxLength="42" value={value10} onChange={(e) => { setValue10(e.target.value) }} disabled="disabled"
                ></input>
                <label className="label-nombre-fantasia">FECHA ULT. MODIF.:</label>
                <input className="casilla-cargo col-4 text-uppercase rounded bg-light" maxLength="23" value={value11} onChange={(e) => { setValue11(e.target.value) }} disabled="disabled"
                ></input>
              </div>

            </div>








          </div>


          <div className="row justify-content-center m-1">

          </div>
          <div className="col-10">
            <div className="text-end">

              <button id="btn-grabar" className="col-1 justify border border-3 border-dark btn" onClick={grabar}><b>GRABAR</b></button>

            </div>



          </div>




        </div>

      ) : <h1>DEBE INICIAR SESION</h1>}
    </div>
  );
};
