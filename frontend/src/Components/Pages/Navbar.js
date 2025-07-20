import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar({ onLoginClick, onSignupClick }) {
    return (
        <>
            {/* <nav style={styles.nav}>
                <h2 style={styles.logo}>My App</h2>
                <div>
                    <button onClick={onLoginClick} style={styles.button}>Login</button>
                    <button onClick={onSignupClick} style={styles.button}>Register</button>
                </div>
            </nav> */}

            <nav style={styles.nav}>
                <h2 style={styles.logo}>My App</h2>
                <div>
                    <NavLink to="/login" style={styles.link}>
                        <button onClick={onLoginClick} style={styles.button}>Login</button>
                    </NavLink>
                    <NavLink to="/signup" style={styles.link}>
                        <button onClick={onSignupClick} style={styles.button}>Register</button>
                    </NavLink>
                </div>
            </nav>

        </>
    );
}

const styles = {
    nav: {
        backgroundColor: '#333',
        color: '#fff',
        padding: '10px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logo: {
        margin: 0,
    },
    button: {
        marginLeft: '10px',
        padding: '8px 12px',
        backgroundColor: '#555',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
    },
};

export default Navbar;