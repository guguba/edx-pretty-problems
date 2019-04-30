import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Widget.scss'

export default function Widget({ headerText, children }) {
  return (
    <div className="Widget">
      <div className="box-header">
        <h2>{headerText}</h2>
      </div>
      {children}
    </div>
  )


}

Widget.propTypes = {
  headerText: PropTypes.string.isRequired
}


