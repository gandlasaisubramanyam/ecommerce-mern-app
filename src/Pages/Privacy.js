import React from "react";
import Layout from "../Components/Layout/Layout";

const Privacy = () => {
  return (
    <Layout>
      <div className="container">
        <div className="row my-3 bg-light">
          <div className="my-3">
            <h1 className="fw-bold text-center">Privacy Policy</h1>
            <h5 className="text-center p-3 blockquote-footer">
              How Asia handles your data
            </h5>
          </div>
          <div className="col-md-6">
            <div className="card-img-top">
              <img
                src="https://cdn.dribbble.com/users/3956332/screenshots/15579069/media/0d2ae2e8696a375023df43ce6b50bfa6.jpg?compress=1&resize=400x300"
                alt="Privacy Policy"
              />
            </div>
          </div>
          <div className="col-md-6">
            <h4 className="my-2">How we protect your information</h4>
            <p>
              Our teams work tirelessly to protect your information, and to
              ensure the security and integrity of our platform. We also have
              independent auditors assess the security of our data storage and
              systems that process financial information. However, we all know
              that no method of transmission over the Internet, and method of
              electronic storage, can be 100% secure.{" "}
            </p>
            <ul>
              <h4 className="my-2">Our values</h4>
              <li>Your information belongs to you</li>
              <li>We protect your information from others</li>
              <li>
                We help merchants and partners meet their privacy obligations
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Privacy;