import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import Cookies from "js-cookie";
import SearchIcon from "@mui/icons-material/Search";
import { useActiveUserContext } from "../../hooks/useActiveUserContext";
import SearchResult from "../SearchResult/SearchResult";
import Overlay from "../Overlay/Overlay";
import { useSearchResultContext } from "../../hooks/useSearchContext";

const Navbar = () => {
  const { searchResultStyle, searchResultDispatch } = useSearchResultContext();
  const { activeUser } = useActiveUserContext();

  const navigate = new useNavigate();
  const [searchValue, setSearchValue] = useState();
  const [activeSearch, setActiveSearch] = useState();
  const [searchResultContainerStyle, setSearchResultContainerStyle] =
    useState("hideSearch");
  // handle logout
  const handleLogout = () => {
    Cookies.remove("jwt");
    navigate("/", { replace: true });
    window.location.reload();
  };

  //handle search
  const handleSearch = () => {
    if (searchResultContainerStyle === "hideSearch") {
      setSearchResultContainerStyle("showSearch");
    } else {
      setSearchResultContainerStyle("hideSearch");
    }
  };

  return (
    <div className="navbar">
      {searchResultContainerStyle === "showSearch" ? (
        <>
          <SearchResult
            searchValue={searchValue}
            className={searchResultContainerStyle}
          />
          <Overlay
            className={searchResultContainerStyle}
            onClick={handleSearch}
          />
        </>
      ) : (
        ""
      )}

      <div className="left">
        <div className="logo">
          <Link to="/">Blog Bus</Link>
        </div>
      </div>

      {activeUser ? (
        <div className="center">
          <div className="search_wrapper">
            <input
              type="text"
              placeholder="Search something ...."
              onChange={(e) => {
                setSearchValue(e.target.value.toLowerCase());
              }}
              onFocus={handleSearch}
            />
            <SearchIcon className="search-icon-nav" />
            {/* <i className="fa-solid fa-magnifying-glass search-icon-nav"></i> */}
          </div>
        </div>
      ) : (
        ""
      )}

      <div className="right">
        <div className="menu-link">
          {activeUser ? (
            <>
              <Link to="/">Home</Link>
              {/* <Link to="/categories">Categories</Link> */}
              {/* <Link to="/about">About</Link> */}
              <Link to="/create-post">Create Post</Link>
              <Link to="/" onClick={handleLogout}>
                Logout
              </Link>
              <Link to={`/profile/${activeUser?._id}`}>Profile</Link>
            </>
          ) : (
            <>
              <Link to="/login">Sign In</Link>
              <Link to="/register">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
