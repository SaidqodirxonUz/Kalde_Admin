import React from "react";
import { Link } from "react-router-dom";
import Footer from "../Components/Footer";
import Header from "../Components/Header";

function Contact() {
  return (
    <>
      <Header />
      <section className="p-5">
        <div className="container p-5">
          <form
            className="row g-3"
            action="https://formsubmit.co/rsaidqodirxon@gmail.com"
            method="POST"
          >
            <input
              type="hidden"
              name="_next"
              value="https://smartshop.smhost.uz/"
            />
            <input type="hidden" name="_subject" value="New Message !" />
            <input type="hidden" name="_captcha" value="false" />

            <div className="col-md-4">
              <label htmlFor="validationServer01" className="form-label">
                First name
              </label>
              <input
                type="text"
                className="form-control is-valid"
                id="validationServer01"
                defaultValue="John"
                required
                name="First Name : "
              />
              <div className="valid-feedback">Looks good!</div>
            </div>
            <div className="col-md-4">
              <label htmlFor="validationServer02" className="form-label">
                Last name
              </label>
              <input
                type="text"
                className="form-control is-valid"
                id="validationServer02"
                defaultValue="Doe"
                required
                name="Last Name"
              />
              <div className="valid-feedback">Looks good!</div>
            </div>
            <div className="col-md-4">
              <label htmlFor="validationServerUsername" className="form-label">
                Email
              </label>
              <div className="input-group has-validation">
                <span className="input-group-text" id="inputGroupPrepend3">
                  @
                </span>
                <input
                  type="text"
                  className="form-control is-invalid"
                  id="validationServerUsername"
                  aria-describedby="inputGroupPrepend3 validationServerUsernameFeedback"
                  required
                  name="Email : "
                />
                <div
                  id="validationServerUsernameFeedback"
                  className="invalid-feedback"
                >
                  Please choose a username.
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <label htmlFor="validationServer03" className="form-label">
                City
              </label>
              <input
                type="text"
                className="form-control is-invalid"
                id="validationServer03"
                aria-describedby="validationServer03Feedback"
                required
                name="City : "
              />
              <div id="validationServer03Feedback" className="invalid-feedback">
                Please provide a valid city.
              </div>
            </div>
            <div className="col-md-3">
              <label htmlFor="validationServer04" className="form-label">
                State
              </label>
              <select
                className="form-select is-invalid"
                id="validationServer04"
                aria-describedby="validationServer04Feedback"
                required
                name="State : "
              >
                <option defaultValue disabled>
                  Choose...
                </option>
                <option>Uzbekistan</option>
                <option>Russia</option>
              </select>

              <div id="validationServer04Feedback" className="invalid-feedback">
                Please select a valid state.
              </div>
            </div>
            <div className="col-md-3">
              <label htmlFor="validationServer05" className="form-label">
                Zip
              </label>
              <input
                type="text"
                className="form-control is-invalid"
                id="validationServer05"
                aria-describedby="validationServer05Feedback"
                required
                name="Zip : "
              />
              <div id="validationServer05Feedback" className="invalid-feedback">
                Please provide a valid zip.
              </div>
            </div>
            <div className="col-12">
              <div className="form-check">
                <input
                  className="form-check-input is-invalid"
                  type="checkbox"
                  defaultValue=""
                  id="invalidCheck3"
                  aria-describedby="invalidCheck3Feedback"
                  required
                />
                <label className="form-check-label" htmlFor="invalidCheck3">
                  Agree to the terms of the
                  <Link to={"/oferta"} className="text-decoration-none mx-1">
                    Public Offer
                  </Link>
                </label>
                <div id="invalidCheck3Feedback" className="invalid-feedback">
                  You must agree before submitting.
                </div>
              </div>
            </div>
            <div className="col-12">
              <button className="btn btn-primary" type="submit">
                Submit form
              </button>
            </div>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Contact;

{
  /* <div className="form-floating mb-3">
  <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com">
  <label htmlFor="floatingInput">Email address</label>
</div>
<div className="form-floating">
  <input type="password" className="form-control" id="floatingPassword" placeholder="Password">
  <label htmlFor="floatingPassword">Password</label>
</div> */
}
