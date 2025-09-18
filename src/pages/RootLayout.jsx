import React from 'react'
import { Header } from '../components'
import { Outlet } from 'react-router-dom';
import { IoMdHome } from "react-icons/io";
import { BsClipboard2Check } from "react-icons/bs";
import { BiBarChartSquare } from "react-icons/bi";
import { RiShoppingBag2Line } from "react-icons/ri";
import { CiWallet } from 'react-icons/ci';

export default function RootLayout() {
  return (
    <div className='root-layout-css-start'>
        <Header/>
        <div className="outlet-wrapper">
            <ul className="nave-bar">
                <li className='active'><IoMdHome /></li>
                <li><BiBarChartSquare  /></li>
                <li><CiWallet   /></li>
                <li><BsClipboard2Check /></li>
                <li><RiShoppingBag2Line /></li>

            </ul>
            <div className="outlet-content">
                <Outlet/>
            </div>

        </div>
    </div>
  )
}
