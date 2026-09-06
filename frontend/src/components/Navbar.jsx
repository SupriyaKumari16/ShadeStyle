import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { useLocomotiveScroll } from "react-locomotive-scroll";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import Auth from "../auth/Auth";

// ================= NAV CONTAINER =================

const NavContainer = styled(motion.div)`
  position: absolute;

  top: ${(props) =>
    props.$click ? "0" : `-${props.theme.navHeight}`};

  transition: all 0.3s ease;

  z-index: 6;
  width: 100vw;

  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 40em) {
    top: ${(props) =>
      props.$click ? "0" : `calc(-50vh - 4rem)`};
  }
`;

// ================= MENU BUTTON =================

const MenuBtn = styled.li`
  background-color: ${(props) =>
    `rgba(${props.theme.textRgba},0.7)`};

  color: ${(props) => props.theme.body};

  width: 15rem;
  height: 2.5rem;

  border: none;
  outline: none;

  clip-path: polygon(
    0 0,
    100% 0,
    80% 100%,
    20% 100%
  );

  position: absolute;
  top: 100%;
  left: 50%;

  transform: translateX(-50%);

  font-size: ${(props) => props.theme.fontmd};
  font-weight: 600;

  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  transition: all 0.3s ease;

  @media (max-width: 40em) {
    width: 10rem;
    height: 2rem;
  }
`;

// ================= MENU ITEMS =================

const MenuItems = styled(motion.ul)`
  position: relative;

  height: ${(props) => props.theme.navHeight};

  background-color: ${(props) => props.theme.body};
  color: ${(props) => props.theme.text};

  display: flex;
  justify-content: space-around;
  align-items: center;

  list-style: none;

  width: 100%;

  padding: 0 10rem;

  @media (max-width: 40em) {
    flex-direction: column;

    padding: 2rem 0;

    height: 50vh;
  }
`;

const Item = styled(motion.li)`
  text-transform: uppercase;

  color: ${(props) => props.theme.text};

  a {
    color: ${(props) => props.theme.text};
    text-decoration: none;
  }

  @media (max-width: 40em) {
    flex-direction: column;

    padding: 0.5rem 0;
  }
`;

// ================= EXTRA ICONS =================

const ExtraItems = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;

  @media (max-width: 40em) {
    gap: 1.5rem;
  }
`;

const IconWrapper = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;

  color: ${(props) => props.theme.text};

  cursor: pointer;
`;

const SearchIcon = styled(motion.span)`
  font-size: 29px;
  line-height: 1;
  font-weight: 500;
`;

const ProfileIcon = styled(motion.span)`
  font-size: 27px;
  line-height: 1;
  font-weight: 500;

  margin-left: 1rem;
`;

const IconText = styled.span`
  margin-top: 3px;

  font-size: 10px;
  font-weight: 500;

  text-transform: capitalize;
`;

// ================= PROFILE DROPDOWN =================

const ProfileDropdown = styled(motion.div)`
  position: absolute;
  top: 52px;
  right: -25px;

  width: 165px;
  padding: 10px 0;

  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(15px) saturate(180%);
  -webkit-backdrop-filter: blur(15px) saturate(180%);

  border: 1px solid rgba(255, 255, 255, 0.35);
  border-radius: 14px;

  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);

  z-index: 3000;
`;

const DropdownItem = styled.div`
  padding: 12px 18px;

  color: #333;

  font-size: 14px;
  font-weight: 500;

  text-transform: none;

  cursor: pointer;

  transition: background 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.5);
  }
`;

const LogoutItem = styled(DropdownItem)`
  color: #d60000;
  font-weight: bold;
`;

// ================= SEARCH OVERLAY =================

const SearchOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;

  background: rgba(0, 0, 0, 0.45);

  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);

  z-index: 5000;
`;

const SearchStrip = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 80px;

  padding: 0 22px;

  display: flex;
  align-items: center;
  gap: 18px;

  background: rgba(255, 255, 255, 0.25);

  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);

  border: 1px solid rgba(255, 255, 255, 0.35);
  border-top: none;

  border-radius: 0 0 20px 20px;

  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);

  z-index: 99999;
`;

const SearchStripIcon = styled.span`
  font-size: 27px;
  color: #222;
  line-height: 1;
`;

const SearchInput = styled.input`
  flex: 1;

  height: 50px;

  padding: 0 16px;

  border: none;
  outline: none;

  border-radius: 14px;

  background: rgba(255, 255, 255, 0.25);

  color: #222;

  font-size: 17px;

  &::placeholder {
    color: #555;
  }

  &:focus {
    background: rgba(255, 255, 255, 0.8);
  }
`;

const CloseButton = styled.button`
  border: none;
  outline: none;

  background: transparent;

  color: #222;

  font-size: 26px;

  cursor: pointer;

  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

// ================= NAVBAR =================

const Navbar = () => {
  const [click, setClick] = useState(false);

  const [openSearch, setOpenSearch] = useState(false);
  const [searchText, setSearchText] = useState("");

  const [openProfile, setOpenProfile] = useState(false);
  const [showAuth, setShowAuth] = useState(false);

  const { scroll } = useLocomotiveScroll();
  const navigate = useNavigate();

  const { wishlistCount } = useWishlist();
  const { cartCount } = useCart();

  const handleScroll = (id) => {
    const elem = document.querySelector(id);

    if (!elem || !scroll) return;

    setClick(!click);

    scroll.scrollTo(elem, {
      offset: "-100",
      duration: "2000",
      easing: [0.25, 0.0, 0.35, 1.0],
    });
  };

  const handleProfileItem = (item) => {
  if (item === "Login / Signup") {
    setOpenProfile(false);
    setShowAuth(true);
    return;
  }

  if (item === "My Account") {
    navigate("/account");
  }

  if (item === "My Orders") {
    navigate("/orders");
  }

  if (item === "Notifications") {
    navigate("/notifications");
  }

  if (item === "Logout") {
    localStorage.removeItem("loggedIn");
    alert("Logged out!");
  }

  setOpenProfile(false);
};

  return (
    <>
      <NavContainer
        $click={click}
        initial={{ y: "-100%" }}
        animate={{ y: 0 }}
        transition={{
          duration: 1,
          delay: 2,
        }}
      >
        <MenuItems
          drag="y"
          dragConstraints={{
            top: 0,
            bottom: 70,
          }}
          dragElastic={0.05}
          dragSnapToOrigin
        >
          <MenuBtn onClick={() => setClick(!click)}>
            <span>MENU</span>
          </MenuBtn>

          {/* HOME */}
          <Item
            whileHover={{
              scale: 1.1,
              y: -5,
            }}
            whileTap={{
              scale: 0.9,
              y: 0,
            }}
            onClick={() => handleScroll("#home")}
          >
            <Link to="/">Home</Link>
          </Item>

          {/* ABOUT */}
          <Item
            whileHover={{
              scale: 1.1,
              y: -5,
            }}
            whileTap={{
              scale: 0.9,
              y: 0,
            }}
            onClick={() => handleScroll(".about")}
          >
            <Link to="/">About</Link>
          </Item>

          {/* NEW ARRIVAL */}
          <Item
            whileHover={{
              scale: 1.1,
              y: -5,
            }}
            whileTap={{
              scale: 0.9,
              y: 0,
            }}
            onClick={() => handleScroll(".new-arrival")}
          >
            <Link to="/">New Arrival</Link>
          </Item>

          {/* WISHLIST */}
          <Item
            whileHover={{
              scale: 1.1,
              y: -5,
            }}
            whileTap={{
              scale: 0.9,
              y: 0,
            }}
          >
            <Link to="/wishlist">
              ♡ Wishlist
              {wishlistCount > 0 && (
                <span style={{ marginLeft: "4px" }}>
                  ({wishlistCount})
                </span>
              )}
            </Link>
          </Item>

          {/* CART */}
          <Item
            whileHover={{
              scale: 1.1,
              y: -5,
            }}
            whileTap={{
              scale: 0.9,
              y: 0,
            }}
          >
            <Link to="/cart">
              🛒 Cart
              {cartCount > 0 && (
                <span style={{ marginLeft: "4px" }}>
                  ({cartCount})
                </span>
              )}
            </Link>
          </Item>

          {/* SEARCH AND PROFILE */}
          <ExtraItems>
            {/* SEARCH */}
            <IconWrapper onClick={() => setOpenSearch(true)}>
              <SearchIcon
                whileHover={{
                  scale: 1.15,
                  y: -3,
                }}
                whileTap={{
                  scale: 0.9,
                }}
                transition={{
                  duration: 0.25,
                }}
              >
                ⌕
              </SearchIcon>

              <IconText>Search</IconText>
            </IconWrapper>

            {/* PROFILE */}
            <IconWrapper
              onClick={() => setOpenProfile((prev) => !prev)}
              onMouseEnter={() => setOpenProfile(true)}
              onMouseLeave={() => setOpenProfile(false)}
            >
              <ProfileIcon
                whileHover={{
                  scale: 1.15,
                  y: -3,
                }}
                whileTap={{
                  scale: 0.9,
                }}
                transition={{
                  duration: 0.25,
                }}
              >
                ♙
              </ProfileIcon>

              <IconText>Profile</IconText>

              <AnimatePresence>
                {openProfile && (
                  <ProfileDropdown
                    initial={{
                      opacity: 0,
                      y: -10,
                      scale: 0.95,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      y: -10,
                      scale: 0.95,
                    }}
                    transition={{
                      duration: 0.22,
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <DropdownItem
                      onClick={() =>
                        handleProfileItem("Login / Signup")
                      }
                    >
                      Login / Signup
                    </DropdownItem>

                    <DropdownItem
                      onClick={() =>
                        handleProfileItem("My Account")
                      }
                    >
                      My Account
                    </DropdownItem>

                    <DropdownItem
                      onClick={() =>
                        handleProfileItem("My Orders")
                      }
                    >
                      My Orders
                    </DropdownItem>

                    <DropdownItem
                      onClick={() =>
                        handleProfileItem("Notifications")
                      }
                    >
                      Notifications
                    </DropdownItem>

                    <LogoutItem
                      onClick={() => handleProfileItem("Logout")}
                    >
                      Logout
                    </LogoutItem>
                  </ProfileDropdown>
                )}
                
              </AnimatePresence>
            </IconWrapper>
          </ExtraItems>
        </MenuItems>
      </NavContainer>

      {/* SEARCH OVERLAY */}
      <AnimatePresence>
        {openSearch && (
          <SearchOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenSearch(false)}
          >
            <SearchStrip
              initial={{ y: -100 }}
              animate={{ y: 0 }}
              exit={{ y: -100 }}
              transition={{
                duration: 0.35,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <SearchStripIcon>⌕</SearchStripIcon>

              <SearchInput
                autoFocus
                type="text"
                placeholder="Search products..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />

              <CloseButton
                onClick={() => {
                  setOpenSearch(false);
                  setSearchText("");
                }}
              >
                ✕
              </CloseButton>
            </SearchStrip>
          </SearchOverlay>
        )}
      </AnimatePresence>
      <Auth
  showAuth={showAuth}
  setShowAuth={setShowAuth}
/>
    </>
  );
};

export default Navbar;