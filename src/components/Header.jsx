import React, { useState } from "react";
import { CiSearch, CiSettings } from "react-icons/ci";
import { MdOutlineEmail } from "react-icons/md";
import { IoNotificationsOutline } from "react-icons/io5";
import { Image } from "react-bootstrap";
import profile from "../assets/images/user3.avif";

export default function Header() {
  const [showSearch, setShowSearch] = useState(false);
  return (
    <header className="header">
      <div
        className={`search-input-box  ${showSearch ? "ani-show-search" : ""}`}
      >
        <CiSearch className="search-icon" />
        <input type="text" className="input-box-search" placeholder="Search" />
      </div>

      <div className="setting-profile-icons">
        <span
          className="mb-search-icon"
          onClick={() => setShowSearch(!showSearch)}
        >
          <CiSearch />
        </span>
        <span>
          <MdOutlineEmail />
        </span>
        <span>
          <CiSettings />
        </span>
        <span>
          <IoNotificationsOutline />
        </span>
        <span className="profile-image">
          <Image src={profile} alt="profile" />
        </span>
      </div>
    </header>
  );
}
