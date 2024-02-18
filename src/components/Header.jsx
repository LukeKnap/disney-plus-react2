import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectUserName, selectUserPhoto, setUserLoginDetails, setSignOutState } from "../features/user/userSlice";
import { auth, provider } from "../firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import Search from "./Search";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userName = useSelector(selectUserName);
  const userPhoto = useSelector(selectUserPhoto);
  const [isSearchOpen, setIsSearchOpen] = useState(false); // Stav pro ovládání zobrazení vyhledávacího pole
  const [showSignOutMessage, setShowSignOutMessage] = useState(false);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      setUser(user);
    }
  }, []);

  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user);
        navigate("/home"); // Navigace na domovskou stránku po přihlášení
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const signOutUser = () => {
    signOut(auth).then(() => {
      dispatch(setSignOutState());
      localStorage.removeItem("user"); // Odstranění informací o přihlášeném uživateli při odhlášení
      navigate("/"); // Navigace na hlavní stránku po odhlášení
    }).catch((error) => alert(error.message));
  };

  const setUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    dispatch(setUserLoginDetails({
      name: user.displayName,
      email: user.email,
      photo: user.photoURL,
    }));
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleSignOutClick = () => {
    setShowSignOutMessage(!showSignOutMessage);
  };

  return (
    <Nav>
      <Logo>
        {!userName ? (
          <Link to="/">
            <img src="/images/logo.svg" alt="Disney+" />
          </Link>
        ) : (
          <img src="/images/logo.svg" alt="Disney+" />
        )}
      </Logo>

      {!userName ? (
        <Login onClick={signIn}>Login</Login>
      ) : (
        <>
          <NavMenu>
            <Link to="/home">
              <img src="/images/home-icon.svg" alt="HOME" />
              <span>HOME</span>
            </Link>
            <Link to="/disney-history">
              <img src="/images/disney-history-icon.svg" alt="Disney-History" />
              <span>DISNEY-HISTORY</span>
            </Link>
            <Link to="/movies">
              <img src="/images/movie-icon.svg" alt="MOVIES" />
              <span>MOVIES</span>
            </Link>
            <SearchIcon onClick={toggleSearch}>
              <img src="/images/search-icon.svg" alt="SEARCH" />
              <span>SEARCH</span>
            </SearchIcon>
          </NavMenu>
          {isSearchOpen && <Search />} {/* Zobrazení komponenty Search podle stavu isSearchOpen */}
          <UserImg onClick={handleSignOutClick} src={userPhoto} alt={userName} />
          {showSignOutMessage && (
            <SignOutMessage onClick={signOutUser}>Sign out</SignOutMessage>
          )}
        </>
      )}
    </Nav>
  );
};


// Styled Components
const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: #090b13;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 3;
`;

const Logo = styled.a`
  padding: 0;
  width: 80px;
  margin-top: 4px;
  max-height: 70px;
  font-size: 0;
  display: inline-block;
  
  img {
    display: block;
    width: 100%;
  }
`;

const NavMenu = styled.div`
  display: flex;
  align-items: center;
  flex-flow: row nowrap;
  height: 100%;
  justify-content: flex-end;
  position: relative;
  margin-right: auto;
  margin-left: 25px;

  a, div {
    display: flex;
    align-items: center;
    padding: 0 12px;

    img {
      height: 20px;
      min-width: 20px;
      width: 20px;
    }

    span {
      color: #f9f9f9;
      font-size: 13px;
      letter-spacing: 1.42px;
      line-height: 1.08;
      white-space: nowrap;
    }
  }
`;

const Login = styled.div`
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.6);
  color: #f9f9f9;
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  transition: all 0.2s ease 0s;

  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
  }
`;

const UserImg = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  cursor: pointer;
`;

const SearchIcon = styled.div`
cursor: pointer;
`;

const SearchField = styled.input`
  margin-left: 20px;
  padding: 10px;
  font-size: 16px;
  border: 2px solid #ccc;
  border-radius: 4px;
  outline: none;
`;

const SignOutMessage = styled.div`
  position: absolute;
  right: 3%;
  top: calc(100% + 5px); 
  transform: translateX(50%); 
  background-color: #333333; 
  border: 1px solid #cccccc;
  border-radius: 10px;
  padding: 5px 10px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  color: #ffffff; 
  cursor: pointer;
  letter-spacing: 2px; 
`;

export default Header;
