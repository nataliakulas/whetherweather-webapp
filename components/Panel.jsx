import React from 'react';
import PropTypes from 'prop-types';
import {RowBetweenWrapper, PanelWrapper, SquareButton} from './Styles';

const Panel = ({latitude, longitude, capital, country, toggleFav, fav}) => {

  return (
    <PanelWrapper>
      <p style={{fontWeight: 'bold'}}>
        {capital && country === '---' ?
          'Your current location' :
          capital + ' in ' + country
        }
      </p>
      <RowBetweenWrapper>
        <p>
          Coordinates:&nbsp;
          <br />
          {latitude}
          ,&nbsp;
          {longitude}
        </p>
        <SquareButton
          onClick={toggleFav}
          disabled={latitude && longitude === '---'}
          type="button"
          active={fav}
        />
      </RowBetweenWrapper>
    </PanelWrapper>
  );
}

Panel.defaultProps = {
  capital: '',
  country: ''
};

Panel.propTypes = {
  capital: PropTypes.string,
  country: PropTypes.string,
  longitude: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  latitude: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  toggleFav: PropTypes.func.isRequired,
  fav: PropTypes.bool.isRequired
};

export default Panel;