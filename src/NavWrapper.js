import React, { Component, Fragment, Children } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { NavbarContext } from './NavbarContext';
import SearchForm from './SearchForm';

class NavWrapper extends Component {
  links(items) {
    return (
      <Fragment>
        {this.context.search ? (
          <SearchForm />
        ) : (
          <Fragment>
            {this.context.brand &&
              React.cloneElement(this.context.brand, {
                className: cx(
                  this.context.brand.props.className,
                  this.context.brandClasses
                )
              })}
            <a href="#!" data-target="mobile-nav" className="sidenav-trigger">
              {this.context.menuIcon}
            </a>
            <ul className={this.context.navMobileCSS}>
              {Children.map(items, (link, index) => (
                <li key={index}>{link}</li>
              ))}
            </ul>
          </Fragment>
        )}
      </Fragment>
    );
  }
  render() {
    const { className, children } = this.props;
    return (
      <div className={cx('nav-wrapper', className)}>{this.links(children)}</div>
    );
  }
}
NavWrapper.contextType = NavbarContext;
NavWrapper.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
};

export default NavWrapper;
