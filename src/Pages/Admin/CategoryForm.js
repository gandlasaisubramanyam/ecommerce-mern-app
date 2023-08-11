import React from "react";

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <div className="w-100">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="create new category"
          className="form-control mb-3"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default CategoryForm;