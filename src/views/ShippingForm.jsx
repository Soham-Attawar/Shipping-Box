import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn,MDBCard } from "mdbreact";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";


function ShippingForm() {
    const [name, setName] = useState("");
    const [weight, setWeight] = useState(1);
    const [color, setColor] = useState("#3F51B6");
    const [country, setCountry] = useState("Sweden");

    const cardStyle = {
        width: "500px",
        left: "50%",
        top: "50%",
        position: "absolute",
        transform: "translate(-50%, -50%)",
        padding: "10px",
      };
     
      const submitHandler = async (event) => {
        event.preventDefault();
    
        if (name === "" || weight === "" || color === "" || country === "") {
          toast.error("Please fill all the fields", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          return;
        }

        event.target.className += " was-validated";

        const multipliers = {
            Sweden: 11.42,
            China: 8.71,
            Brazil: 7.43,
            Australia: 1.83,
            Europe:5.67
          };
        
          const cost = (multipliers[country] * weight).toFixed(2);
          
          const order = {
            name: name,
            weight: weight,
            color: color,
            country: country,
            cost: cost,
          };
          
          await axios
      .post("http://localhost:5000/create-order", order)
      .then((res) => {
        toast.success("Order placed", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((err) => {
        toast.error("Error while creating order", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
    }
    
    return (
    <MDBCard style={cardStyle}>
    <MDBContainer>
    <MDBRow>
      <MDBCol md="12">
      <form className="needs-validation" onSubmit={submitHandler} noValidate>
        <label htmlFor="name" className="indigo-text">
          Name
        </label>
        <input 
          type="text" 
          className="form-control" 
          onChange={(event)=>setName(event.target.value)} 
          required 
          id="name"
          value={name} />
        <br />
        <label htmlFor="defaultFormRegisterEmailEx" className="indigo-text">
          Weight(Kg)
        </label>
        <input
          type="number"
          className="form-control"
          onChange={(event) => setWeight(event.target.value)}
          required
          value={weight}
          min="0"/>
        <br />
        <label htmlFor="defaultFormRegisterConfirmEx" className="indigo-text">
          Pick a Colour
        </label>
        <input 
          type="color"
          className="form-control"
          onChange={(event) => setColor(event.target.value)}
          required
          value={color} />
        <br />
        <label htmlFor="defaultFormRegisterPasswordEx" className="indigo-text">
          Destination Country Name
        </label>
        <select
          className="browser-default custom-select"
          onChange={(event) => setCountry(event.target.value)}
          required
          value={country}
         >
          <option value="Sweden" default>
                  Sweden
          </option>
          <option value="China">China</option>
          <option value="Brazil">Brazil</option>
          <option value="Australia">Australia</option>
          <option value="Europe">Europe</option>
          </select>
        <div className="text-center mt-4">
          <MDBBtn color="unique" type="submit">
            Save
          </MDBBtn>
        </div>
      </form>
    </MDBCol>
  </MDBRow>
  <ToastContainer/>
</MDBContainer>
</MDBCard>
);
};

export default ShippingForm;