import React, { Component } from 'react';

var style = {
  textAlign: "center",
  padding: "20px",
  position: "fixed",
  left: "0",
  bottom: "0",
  height: "60px",
  width: "100%",
  opacity: .3
}

var phantom = {
marginTop: '20px',
display: 'block',
padding: '20px',
height: '60px',
width: '100%',
}

function Footer({ children }) {
  return (
      <div>
          <div style={phantom} />
          <div style={style}>
              { children }
              Copyright &copy; {new Date().getFullYear()}
          </div>
      </div>
  )
}

export default Footer

