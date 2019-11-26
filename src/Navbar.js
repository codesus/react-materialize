import React, { Component, Fragment, Children } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Icon from './Icon';
import NavWrapper from './NavWrapper';
import SearchForm from './SearchForm';
import NavItem from './NavItem';
import { NavbarContext } from './NavbarContext';

class Navbar extends Component {
  constructor(props) {
    super(props);
    const {
      children,
      brand,
      className,
      extendWith,
      fixed,
      alignLinks,
      centerLogo,
      search,
      menuIcon,
      sidenav
    } = props;
    this.brandClasses = cx({
      'brand-logo': true,
      center: centerLogo
    });
    this.navCSS = cx({ 'nav-extended': extendWith }, className);

    this.navMobileCSS = cx('hide-on-med-and-down', [alignLinks]);
  }
  componentDidMount() {
    const { options } = this.props;

    if (typeof M !== 'undefined') {
      this.instance = M.Sidenav.init(this._sidenav, options);
    }
  }

  componentWillUnmount() {
    if (this.instance) {
      this.instance.destroy();
    }
  }
  renderWrapper(items) {
    return (
      <Fragment>
        {this.props.search ? (
          <SearchForm />
        ) : (
          <Fragment>
            {this.props.brand &&
              React.cloneElement(this.props.brand, {
                className: cx(
                  this.props.brand.props.className,
                  this.brandClasses
                )
              })}
            <a href="#!" data-target="mobile-nav" className="sidenav-trigger">
              {this.props.menuIcon}
            </a>
            <ul className={this.navMobileCSS}>
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
    const { sidenav, children, extendWith, fixed, alignLinks } = this.props;
    const sidenavLinks = sidenav
      ? sidenav
      : Children.map(children, (link, index) => {
          const clonedLink =
            link && link.props && link.props.id
              ? React.cloneElement(link, {
                  ...link.props,
                  id: `sidenav-${link.props.id}`
                })
              : link;
          return <li key={index}>{clonedLink}</li>;
        });

    let navbar = (
      <nav className={this.navCSS}>
        {children}
        {extendWith && <div className="nav-content">{extendWith}</div>}
      </nav>
    );

    if (fixed) {
      navbar = <div className="navbar-fixed">{navbar}</div>;
    }

    return (
      <NavbarContext.Provider value={this}>
        {navbar}
        <ul
          id="mobile-nav"
          className={cx('sidenav', [alignLinks])}
          ref={ul => {
            this._sidenav = ul;
          }}
        >
          {sidenavLinks}
        </ul>
      </NavbarContext.Provider>
    );
  }
}

Navbar.propTypes = {
  brand: PropTypes.node,
  children: PropTypes.node,
  className: PropTypes.string,
  extendWith: PropTypes.node,
  search: PropTypes.bool,
  /**
   * Allows for custom sidenav node, used for mobile view
   */
  sidenav: PropTypes.node,
  /**
   * left makes the navbar links left aligned, right makes them right aligned
   */
  alignLinks: PropTypes.oneOf(['left', 'right']),
  /**
   * The logo will center itself on medium and down screens.
   * Specifying centerLogo as a prop the logo will always be centered
   */
  centerLogo: PropTypes.bool,
  /**
   * Makes the navbar fixed
   */
  fixed: PropTypes.bool,
  /**
   * Options hash for the sidenav.
   * More info: https://materializecss.com/sidenav.html#options
   */
  options: PropTypes.shape({
    // Side of screen on which Sidenav appears.
    edge: PropTypes.oneOf(['left', 'right']),
    // Allow swipe gestures to open / close Sidenav.
    draggable: PropTypes.bool,
    // Length in ms of enter transition.
    inDuration: PropTypes.number,
    // Length in ms of exit transition.
    outDuration: PropTypes.number,
    // Function called when sidenav starts entering.
    onOpenStart: PropTypes.func,
    // Function called when sidenav finishes entering.
    onOpenEnd: PropTypes.func,
    // Function called when sidenav starts exiting.
    onCloseStart: PropTypes.func,
    // Function called when sidenav finishes exiting.
    onCloseEnd: PropTypes.func,
    // Prevent page from scrolling while sidenav is open.
    preventScrolling: PropTypes.bool
  }),
  menuIcon: PropTypes.node.isRequired
};

Navbar.defaultProps = {
  options: {
    edge: 'left',
    draggable: true,
    inDuration: 250,
    outDuration: 200,
    onOpenStart: null,
    onOpenEnd: null,
    onCloseStart: null,
    onCloseEnd: null,
    preventScrolling: true
  },
  menuIcon: <Icon>menu</Icon>
};

export default Navbar;
