import React, { Component, Fragment, Children } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { NavbarContext } from './NavbarContext';

class NavWrapper extends Component {
  render() {
    const { className, children } = this.props;
    return (
      <div className={cx('nav-wrapper', className)}>
        {this.context.renderWrapper(children)}
      </div>
    );
  }
}
NavWrapper.contextType = NavbarContext;
NavWrapper.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
};

export default NavWrapper;
