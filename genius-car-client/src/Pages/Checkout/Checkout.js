import React, { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";

const Checkout = () => {
  const service = useLoaderData();
  const { _id, title, price } = service;
  const { user } = useContext(AuthContext);

  const handlePlaceOrder = (e) => {
    console.log("form submitted");
    console.log(e);
    e.preventDefault();
    const form = e.target;
    // const firstName = form.firstName.value;
    // const lastName = form.lastName.value;
    const name = `${form.firstName.value} ${form.lastName.value}`;
    const phone = form.phone.value;
    // const email = form?.email.value;
    const email = form?.email?.value || "Unregistered";
    const message = form?.message.value;

    const order = {
      service: _id,
      serviceName: title,
      price,
      customer: name,
      email,
      phone,
      message,
    };

    fetch(`http://localhost:5000/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          form.reset();
          alert(`Order placed successfully`);
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="my-20">
      <form onSubmit={handlePlaceOrder}>
        <h2 className="text-4xl text-center">
          You are about to order: {title}
        </h2>
        <h4 className="text-3xl">Price : ${price}</h4>
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <input
            name="firstName"
            type="text"
            placeholder="First Name"
            className="input input-bordered input-ghost w-full"
          />
          <input
            name="lastName"
            type="text"
            placeholder="Last Name"
            className="input input-bordered input-ghost w-full"
          />
          <input
            name="phone"
            type="text"
            placeholder="Your Phone"
            className="input input-bordered input-ghost w-full"
          />
          <input
            name="email"
            type="text"
            placeholder="Your Email"
            className="input input-bordered input-ghost w-full"
            defaultValue={user?.email}
            readOnly
          />
        </div>

        <textarea
          name="message"
          className="textarea textarea-bordered h-24 w-full"
          placeholder="Your Message"
        ></textarea>
        <input
          type="submit"
          value="Place your order"
          className="btn btn-primary"
        />
      </form>
    </div>
  );
};

export default Checkout;
