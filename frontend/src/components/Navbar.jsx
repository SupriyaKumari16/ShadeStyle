import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { useLocomotiveScroll } from "react-locomotive-scroll";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

/* =========================================================
   DESKTOP NAVBAR
   ORIGINAL DESKTOP DESIGN — DO NOT MODIFY
========================================================= */

const DesktopNavbar = styled.div`
  display: block;

  @media (max-width: 1024px) {
    display: none;
  }
`;

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
      props.$click ? "0" : "calc(-50vh - 4rem)"};
  }
`;

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

/* ================= DESKTOP PROFILE ================= */

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

/* ================= DESKTOP SEARCH ================= */

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

/* =========================================================
   MOBILE + TABLET NAVBAR
   COMPLETELY SEPARATE DESIGN
========================================================= */

const MobileNavbar = styled.div`
  display: none;

  @media (max-width: 1024px) {
    display: block;

    position: fixed;

    top: 0;
    left: 0;

    width: 100%;

    z-index: 5000;
  }
`;

/* ================= MOBILE HEADER ================= */

const MobileHeader = styled.div`
  width: 100%;
  height: 68px;

  padding: 0 18px;

  box-sizing: border-box;

  display: flex;
  align-items: center;
  justify-content: space-between;

  background: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};

  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.08);

  position: relative;

  z-index: 5001;

  @media (max-width: 480px) {
    height: 62px;
    padding: 0 14px;
  }
`;

/* ================= MOBILE LOGO ================= */

const MobileLogo = styled.div`
  font-family: Georgia, serif;

  font-size: 25px;

  font-weight: 600;

  color: ${({ theme }) => theme.text};

  span {
    font-style: italic;
    font-weight: 400;
  }

  @media (max-width: 480px) {
    font-size: 22px;
  }
`;

/* ================= HAMBURGER ================= */

const HamburgerButton = styled(motion.button)`
  width: 46px;
  height: 46px;

  padding: 0;

  border: none;
  border-radius: 50%;

  background: transparent;

  color: ${({ theme }) => theme.text};

  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;

  gap: 5px;

  cursor: pointer;

  -webkit-tap-highlight-color: transparent;

  @media (max-width: 480px) {
    width: 42px;
    height: 42px;
    gap: 4px;
  }
`;

const HamburgerLine = styled(motion.span)`
  display: block;

  width: 24px;
  height: 2px;

  border-radius: 10px;

  background: ${({ theme }) => theme.text};

  transform-origin: center;

  @media (max-width: 480px) {
    width: 22px;
  }
`;

/* ================= MOBILE MENU ================= */

const MobileMenu = styled(motion.div)`
  position: absolute;

  top: 68px;
  left: 0;

  width: 100%;

  max-height: calc(100vh - 68px);

  overflow-y: auto;

  padding: 22px 20px 30px;

  box-sizing: border-box;

  background: ${({ theme }) => theme.body};

  border-top: 1px solid rgba(128, 128, 128, 0.15);

  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);

  @media (max-width: 480px) {
    top: 62px;

    max-height: calc(100vh - 62px);

    padding: 18px 15px 25px;
  }
`;

/* ================= MOBILE NAV LINK ================= */

const MobileNavLink = styled(motion.div)`
  width: 100%;

  padding: 15px 5px;

  box-sizing: border-box;

  border-bottom: 1px solid rgba(128, 128, 128, 0.15);

  color: ${({ theme }) => theme.text};

  font-size: 15px;
  font-weight: 500;

  text-transform: uppercase;

  cursor: pointer;

  a {
    color: inherit;

    text-decoration: none;

    display: block;

    width: 100%;
  }

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 480px) {
    padding: 13px 4px;
    font-size: 13px;
  }
`;

/* ================= MOBILE ACTION ================= */

const MobileAction = styled(motion.button)`
  width: 100%;

  padding: 15px 5px;

  border: none;

  border-bottom: 1px solid rgba(128, 128, 128, 0.15);

  background: transparent;

  color: ${({ theme }) => theme.text};

  text-align: left;

  font-size: 15px;

  font-weight: 500;

  text-transform: uppercase;

  cursor: pointer;

  @media (max-width: 480px) {
    padding: 13px 4px;
    font-size: 13px;
  }
`;

const MobileProfileWrapper = styled.div`
  width: 100%;
`;

/* ================= MOBILE PROFILE ================= */

const MobileProfileDropdown = styled(motion.div)`
  width: 100%;

  margin-top: 12px;

  padding: 5px 0;

  box-sizing: border-box;

  background: rgba(255, 255, 255, 0.7);

  border-radius: 12px;

  box-shadow: none;

  backdrop-filter: blur(20px);

  overflow: hidden;
`;

const MobileDropdownItem = styled.div`
  padding: 13px 18px;

  color: #333;

  font-size: 13px;

  font-weight: 500;

  text-transform: none;

  cursor: pointer;

  transition: background 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.5);
  }
`;

const MobileLogoutItem = styled(MobileDropdownItem)`
  color: #d60000;
  font-weight: bold;
`;

/* ================= MOBILE SEARCH ================= */

const MobileSearchOverlay = styled(motion.div)`
  position: fixed;

  inset: 0;

  background: rgba(0, 0, 0, 0.45);

  backdrop-filter: blur(12px);

  -webkit-backdrop-filter: blur(12px);

  z-index: 9000;

  padding: 0 15px;
`;

const MobileSearchStrip = styled(motion.div)`
  position: fixed;

  top: 0;
  left: 0;

  width: 100%;

  min-height: 80px;

  padding: 0 22px;

  display: flex;

  align-items: center;

  gap: 18px;

  box-sizing: border-box;

  background: rgba(255, 255, 255, 0.25);

  backdrop-filter: blur(16px) saturate(180%);

  -webkit-backdrop-filter: blur(16px) saturate(180%);

  border: 1px solid rgba(255, 255, 255, 0.35);

  border-top: none;

  border-radius: 0 0 20px 20px;

  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);

  z-index: 99999;

  @media (max-width: 600px) {
    min-height: 70px;

    padding: 0 12px;

    gap: 10px;

    border-radius: 0 0 16px 16px;
  }
`;

const MobileSearchIcon = styled.span`
  font-size: 27px;

  color: #222;

  line-height: 1;

  flex-shrink: 0;

  @media (max-width: 600px) {
    font-size: 23px;
  }
`;

const MobileSearchInput = styled.input`
  flex: 1;

  min-width: 0;

  height: 50px;

  padding: 0 16px;

  border: none;

  outline: none;

  border-radius: 14px;

  background: rgba(255, 255, 255, 0.25);

  color: #222;

  font-size: 17px;

  box-sizing: border-box;

  &::placeholder {
    color: #555;
  }

  &:focus {
    background: rgba(255, 255, 255, 0.8);
  }

  @media (max-width: 600px) {
    height: 44px;

    padding: 0 12px;

    font-size: 14px;

    border-radius: 11px;
  }
`;

const MobileCloseButton = styled.button`
  border: none;

  outline: none;

  background: transparent;

  color: #222;

  font-size: 26px;

  cursor: pointer;

  transition: transform 0.2s ease;

  flex-shrink: 0;

  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: 600px) {
    font-size: 23px;
  }
`;

/* =========================================================
   NAVBAR COMPONENT
========================================================= */

const Navbar = () => {
  /* ================= DESKTOP STATE ================= */

  const [click, setClick] = useState(false);

  const [openSearch, setOpenSearch] = useState(false);

  const [openProfile, setOpenProfile] = useState(false);

  /* ================= MOBILE STATE ================= */

  const [mobileOpen, setMobileOpen] = useState(false);

  const [mobileProfileOpen, setMobileProfileOpen] =
    useState(false);

  const [mobileSearchOpen, setMobileSearchOpen] =
    useState(false);

  /* ================= SHARED SEARCH TEXT ================= */

  const [searchText, setSearchText] = useState("");

  const { scroll } = useLocomotiveScroll();

  const navigate = useNavigate();

  const { wishlistCount } = useWishlist();

  const { cartCount } = useCart();

  /* =====================================================
     DESKTOP SCROLL
     ORIGINAL LOGIC
  ===================================================== */

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

  /* =====================================================
     MOBILE / TABLET SCROLL
  ===================================================== */

  const handleMobileScroll = (id) => {
    const elem = document.querySelector(id);

    if (!elem) return;

    setMobileOpen(false);

    setMobileProfileOpen(false);

    if (!scroll) {
      elem.scrollIntoView({
        behavior: "smooth",
      });

      return;
    }

    scroll.scrollTo(elem, {
      offset: "-100",
      duration: 2000,
      easing: [0.25, 0.0, 0.35, 1.0],
    });
  };

  /* =====================================================
     DESKTOP PROFILE
  ===================================================== */

  const handleProfileItem = (item) => {
    if (item === "Login / Signup") {
      setOpenProfile(false);

      navigate("/auth");

      return;
    }

    if (item === "My Account") {
      setOpenProfile(false);

      navigate("/account");

      return;
    }

    if (item === "My Orders") {
      setOpenProfile(false);

      navigate("/orders");

      return;
    }

    if (item === "Notifications") {
      setOpenProfile(false);

      navigate("/notifications");

      return;
    }

    if (item === "Logout") {
      localStorage.removeItem("loggedIn");

      alert("Logged out!");

      setOpenProfile(false);

      return;
    }

    setOpenProfile(false);
  };

  /* =====================================================
     MOBILE PROFILE
  ===================================================== */

  const handleMobileProfileItem = (item) => {
    if (item === "Login / Signup") {
      setMobileProfileOpen(false);

      setMobileOpen(false);

      navigate("/auth");

      return;
    }

    if (item === "My Account") {
      setMobileProfileOpen(false);

      setMobileOpen(false);

      navigate("/account");

      return;
    }

    if (item === "My Orders") {
      setMobileProfileOpen(false);

      setMobileOpen(false);

      navigate("/orders");

      return;
    }

    if (item === "Notifications") {
      setMobileProfileOpen(false);

      setMobileOpen(false);

      navigate("/notifications");

      return;
    }

    if (item === "Logout") {
      localStorage.removeItem("loggedIn");

      alert("Logged out!");

      setMobileProfileOpen(false);

      setMobileOpen(false);

      return;
    }

    setMobileProfileOpen(false);
  };

  /* =====================================================
     CLOSE MOBILE MENU
  ===================================================== */

  const closeMobileMenu = () => {
    setMobileOpen(false);

    setMobileProfileOpen(false);
  };

  /* =====================================================
     CLOSE SEARCH
  ===================================================== */

  const closeDesktopSearch = () => {
    setOpenSearch(false);

    setSearchText("");
  };

  const closeMobileSearch = () => {
    setMobileSearchOpen(false);

    setSearchText("");
  };

  return (
    <>
      {/* =================================================
          DESKTOP NAVBAR
          ORIGINAL DESIGN
      ================================================= */}

      <DesktopNavbar>
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
              onClick={() =>
                handleScroll(".new-arrival")
              }
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

            {/* SEARCH + PROFILE */}

            <ExtraItems>
              {/* SEARCH */}

              <IconWrapper
                onClick={() => setOpenSearch(true)}
              >
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
                onClick={() =>
                  setOpenProfile((prev) => !prev)
                }
                onMouseEnter={() =>
                  setOpenProfile(true)
                }
                onMouseLeave={() =>
                  setOpenProfile(false)
                }
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
                      onClick={(e) =>
                        e.stopPropagation()
                      }
                    >
                      <DropdownItem
                        onClick={() =>
                          handleProfileItem(
                            "Login / Signup"
                          )
                        }
                      >
                        Login / Signup
                      </DropdownItem>

                      <DropdownItem
                        onClick={() =>
                          handleProfileItem(
                            "My Account"
                          )
                        }
                      >
                        My Account
                      </DropdownItem>

                      <DropdownItem
                        onClick={() =>
                          handleProfileItem(
                            "My Orders"
                          )
                        }
                      >
                        My Orders
                      </DropdownItem>

                      <DropdownItem
                        onClick={() =>
                          handleProfileItem(
                            "Notifications"
                          )
                        }
                      >
                        Notifications
                      </DropdownItem>

                      <LogoutItem
                        onClick={() =>
                          handleProfileItem("Logout")
                        }
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
      </DesktopNavbar>

      {/* =================================================
          MOBILE + TABLET NAVBAR
          COMPLETELY SEPARATE
      ================================================= */}

      <MobileNavbar>
        <MobileHeader>
          <MobileLogo>
            Shade<span>Style</span>
          </MobileLogo>

          <HamburgerButton
            type="button"
            onClick={() => {
              setMobileOpen((prev) => !prev);

              setMobileProfileOpen(false);
            }}
            whileTap={{
              scale: 0.9,
            }}
            aria-label={
              mobileOpen
                ? "Close menu"
                : "Open menu"
            }
          >
            {/* TOP */}

            <HamburgerLine
              animate={
                mobileOpen
                  ? {
                      rotate: 45,
                      y: 7,
                    }
                  : {
                      rotate: 0,
                      y: 0,
                    }
              }
              transition={{
                duration: 0.25,
              }}
            />

            {/* MIDDLE */}

            <HamburgerLine
              animate={
                mobileOpen
                  ? {
                      opacity: 0,
                      x: -10,
                    }
                  : {
                      opacity: 1,
                      x: 0,
                    }
              }
              transition={{
                duration: 0.2,
              }}
            />

            {/* BOTTOM */}

            <HamburgerLine
              animate={
                mobileOpen
                  ? {
                      rotate: -45,
                      y: -7,
                    }
                  : {
                      rotate: 0,
                      y: 0,
                    }
              }
              transition={{
                duration: 0.25,
              }}
            />
          </HamburgerButton>
        </MobileHeader>

        {/* =================================================
            MOBILE MENU
        ================================================= */}

        <AnimatePresence>
          {mobileOpen && (
            <MobileMenu
              initial={{
                opacity: 0,
                y: -15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -15,
              }}
              transition={{
                duration: 0.28,
                ease: "easeOut",
              }}
            >
              {/* HOME */}

              <MobileNavLink
                whileTap={{
                  scale: 0.98,
                }}
                onClick={() =>
                  handleMobileScroll("#home")
                }
              >
                Home
              </MobileNavLink>

              {/* ABOUT */}

              <MobileNavLink
                whileTap={{
                  scale: 0.98,
                }}
                onClick={() =>
                  handleMobileScroll(".about")
                }
              >
                About
              </MobileNavLink>

              {/* NEW ARRIVAL */}

              <MobileNavLink
                whileTap={{
                  scale: 0.98,
                }}
                onClick={() =>
                  handleMobileScroll(".new-arrival")
                }
              >
                New Arrival
              </MobileNavLink>

              {/* WISHLIST */}

              <MobileNavLink
                whileTap={{
                  scale: 0.98,
                }}
                onClick={() => {
                  navigate("/wishlist");

                  closeMobileMenu();
                }}
              >
                Wishlist

                {wishlistCount > 0 && (
                  <span style={{ marginLeft: "6px" }}>
                    ({wishlistCount})
                  </span>
                )}
              </MobileNavLink>

              {/* CART */}

              <MobileNavLink
                whileTap={{
                  scale: 0.98,
                }}
                onClick={() => {
                  navigate("/cart");

                  closeMobileMenu();
                }}
              >
                Cart

                {cartCount > 0 && (
                  <span style={{ marginLeft: "6px" }}>
                    ({cartCount})
                  </span>
                )}
              </MobileNavLink>

              {/* SEARCH */}

              <MobileAction
                type="button"
                whileTap={{
                  scale: 0.98,
                }}
                onClick={() => {
                  setMobileSearchOpen(true);

                  closeMobileMenu();
                }}
              >
                Search
              </MobileAction>

              {/* PROFILE */}

              <MobileProfileWrapper>
                <MobileAction
                  type="button"
                  whileTap={{
                    scale: 0.98,
                  }}
                  onClick={() =>
                    setMobileProfileOpen(
                      (prev) => !prev
                    )
                  }
                >
                  Profile

                  <span
                    style={{
                      float: "right",
                      fontSize: "16px",
                    }}
                  >
                    {mobileProfileOpen
                      ? "−"
                      : "+"}
                  </span>
                </MobileAction>

                <AnimatePresence>
                  {mobileProfileOpen && (
                    <MobileProfileDropdown
                      initial={{
                        opacity: 0,
                        height: 0,
                        y: -5,
                      }}
                      animate={{
                        opacity: 1,
                        height: "auto",
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        height: 0,
                        y: -5,
                      }}
                      transition={{
                        duration: 0.25,
                      }}
                    >
                      <MobileDropdownItem
                        onClick={() =>
                          handleMobileProfileItem(
                            "Login / Signup"
                          )
                        }
                      >
                        Login / Signup
                      </MobileDropdownItem>

                      <MobileDropdownItem
                        onClick={() =>
                          handleMobileProfileItem(
                            "My Account"
                          )
                        }
                      >
                        My Account
                      </MobileDropdownItem>

                      <MobileDropdownItem
                        onClick={() =>
                          handleMobileProfileItem(
                            "My Orders"
                          )
                        }
                      >
                        My Orders
                      </MobileDropdownItem>

                      <MobileDropdownItem
                        onClick={() =>
                          handleMobileProfileItem(
                            "Notifications"
                          )
                        }
                      >
                        Notifications
                      </MobileDropdownItem>

                      <MobileLogoutItem
                        onClick={() =>
                          handleMobileProfileItem(
                            "Logout"
                          )
                        }
                      >
                        Logout
                      </MobileLogoutItem>
                    </MobileProfileDropdown>
                  )}
                </AnimatePresence>
              </MobileProfileWrapper>
            </MobileMenu>
          )}
        </AnimatePresence>
      </MobileNavbar>

      {/* =================================================
          DESKTOP SEARCH
      ================================================= */}

      <AnimatePresence>
        {openSearch && (
          <SearchOverlay
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={closeDesktopSearch}
          >
            <SearchStrip
              initial={{
                y: -100,
              }}
              animate={{
                y: 0,
              }}
              exit={{
                y: -100,
              }}
              transition={{
                duration: 0.35,
              }}
              onClick={(e) =>
                e.stopPropagation()
              }
            >
              <SearchStripIcon>
                ⌕
              </SearchStripIcon>

              <SearchInput
                autoFocus
                type="text"
                placeholder="Search products..."
                value={searchText}
                onChange={(e) =>
                  setSearchText(e.target.value)
                }
              />

              <CloseButton
                type="button"
                onClick={closeDesktopSearch}
              >
                ✕
              </CloseButton>
            </SearchStrip>
          </SearchOverlay>
        )}
      </AnimatePresence>

      {/* =================================================
          MOBILE / TABLET SEARCH
      ================================================= */}

      <AnimatePresence>
        {mobileSearchOpen && (
          <MobileSearchOverlay
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={closeMobileSearch}
          >
            <MobileSearchStrip
              initial={{
                y: -100,
              }}
              animate={{
                y: 0,
              }}
              exit={{
                y: -100,
              }}
              transition={{
                duration: 0.35,
                ease: "easeOut",
              }}
              onClick={(e) =>
                e.stopPropagation()
              }
            >
              <MobileSearchIcon>
                ⌕
              </MobileSearchIcon>

              <MobileSearchInput
                autoFocus
                type="text"
                placeholder="Search products..."
                value={searchText}
                onChange={(e) =>
                  setSearchText(e.target.value)
                }
              />

              <MobileCloseButton
                type="button"
                onClick={closeMobileSearch}
              >
                ✕
              </MobileCloseButton>
            </MobileSearchStrip>
          </MobileSearchOverlay>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;