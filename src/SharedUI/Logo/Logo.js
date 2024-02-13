import React from "react";
import styles from "./logo.module.scss";

import { MenuLinesIco, MenuCrossIco } from "../../Assets/Svg/Menu";
import { Link } from "react-router-dom";

const Logo = ({ handleMenu, ico, color = 'black' }) => {
  return (
    <div id="logo" className={ico.type === 'open' ? styles.logo : styles.logo + ' ' + styles.logo_side_main }>
      {ico.side === 'left' ? (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {ico.type === 'open' ? (
            <MenuLinesIco style={{ color: color }} onClick={handleMenu} className={styles.mobileMenuIcon} />
          ) : (
            <MenuCrossIco onClick={handleMenu} />
          )}
          <Link to="/">
            <h2
              style={{
                color: color,
                fontSize: 16,
                fontFamily: 'Montserrat',
                fontWeight: 600,
                wordWrap: 'break-word',
              }}
            >
              MANGAFLIX
            </h2>
          </Link>
        </div>
      ) : (
        <>
              <Link to="/">
            <h2
              style={{
                color: color,
                fontSize: 16,
                fontFamily: 'Montserrat',
                fontWeight: 600,
                wordWrap: 'break-word',
              }}
            >
              MANGAFLIX
            </h2>
          </Link>
           { ico.type === 'close'
                ? <MenuCrossIco onClick={handleMenu} />
                : <MenuLinesIco onClick={handleMenu} /> 
              }
        {/* <MenuLinesIco onClick={handleMenu} className={styles.mobileMenuIcon} />
          <style>
            {`
              @media (max-width: 768px) {
                .${styles.mobileMenuIcon} {
                  display: block;
                }
              }
              
              @media (min-width: 769px) {
                .${styles.mobileMenuIcon} {
                  display: none;
                }
              }
            `}
          </style> */}
        </>
      )}
    </div>
  );
};

export default Logo;
