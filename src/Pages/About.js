import React from "react";
import Layout from "../Components/Layout/Layout";

const About = () => {
  return (
    <Layout>
      <div className="container">
        <div className="row my-3 bg-light rounded">
          <div className="col-md-6">
            <div className="mt-5">
              <h5 className="mt-2 p-2">About us</h5>
              <h2 className="p-2 fw-bold my-3">
                Asia Shop powers millions of businesses worldwide
              </h2>
              <h6 className="p-2">
                The all-in-one commerce platform to start, run, and grow a
                business.
              </h6>
            </div>
          </div>
          <div className="col-md-6">
            <div className="p-2">
              <img
                src="https://cdni.iconscout.com/illustration/premium/thumb/about-us-3114338-2603187.png"
                alt="Asia"
                srcset="https://cdni.iconscout.com/illustration/premium/thumb/about-us-3114338-2603187.png"
                style={{ height: "450px", width: "540px" }}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;