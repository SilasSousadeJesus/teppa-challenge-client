import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./header.module.scss";
import { Menu } from "@mui/icons-material";
import { selectUser, userlogout } from "../../redux/authSlice/AuthSlice";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import LogoutIcon from '@mui/icons-material/Logout';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

declare interface NavLink {
  url: string;
  text: string;
}
declare interface HeaderProps {
  navlink: NavLink[];
  logo?: string;
}

const Header: React.FC<HeaderProps> = (props) => {
  const [responsive, setResponsive] = useState(false);
  const authUser = useAppSelector(selectUser)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const handleLogout = async () => {
    await dispatch(userlogout())
    navigate('/login')
  }

  return (
    <>
        {authUser.token && (
              <div className={styles.headerContainer}>
                
              <div className={styles.wraplogo}>
                <Link to={'/home'}><DirectionsCarIcon className={styles.logo}/></Link>
              </div>

              <div className={responsive ? styles.hideMenu : styles.nav}
              >

                {props.navlink.map((links, i) => (
                  <Link to={links.url} key={i}>
                    {links.text}
                  </Link>
                ))}
                <a className={styles.btnLogout} onClick={()=> handleLogout()}><LogoutIcon/></a>
              </div>
              
             
              <div>
                <button
                  className={styles.toggle}
                  onClick={() => setResponsive(!responsive)}
                >
                  <Menu className="icon" />
                </button>
              </div>
            </div>
            )}

    </>
  );
};

export default (Header);
