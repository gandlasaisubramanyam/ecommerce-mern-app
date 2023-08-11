import React from "react";
import { useSearch } from "../../Context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API } from "../../Global";
import { FcSearch } from "react-icons/fc";

const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `${API}/api/products/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form className="p-2" role="search" onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            className="form-control"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={values.keyword}
            id="inputGroupFile04"
            onChange={(e) => setValues({ ...values, keyword: e.target.value })}
          />
          <button
            className="btn btn-outline-secondary"
            id="inputGroupFileAddon04"
            type="submit"
          >
            <FcSearch />
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchInput;