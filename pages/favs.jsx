import React from 'react';
// import { Row, Col } from 'react-grid-system';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import Layout from '../components/Layout';
import { ColumnWrapper } from '../components/Styles';
import { SET_FAV, SET_UNFAV } from '../state/actions';

const mapStateToProps = (state) => ({
  favs: state.favsState.favs
});

const mapDispatchToProps = (dispatch) => ({
  onSetFav: (latitude, longitude) => dispatch({ type: SET_FAV, payload: { latitude, longitude } }),
  onSetUnfav: (latitude, longitude) => dispatch({ type: SET_UNFAV, payload: { latitude, longitude } })
});

class Favs extends React.Component {
  componentDidMount(){
    const {onSetFav, onSetUnfav}=this.props;

    console.log(onSetFav,onSetUnfav)
  }

  static async getInitialProps() {
    return { staticData: ['Favs,', 'list.'] };
  }

  render() {
    const { staticData, favs } = this.props;
console.log(favs);

    return (
      <Layout title='Whether Weather'>
        <ColumnWrapper>
          <h1>
            {staticData[0]}
            <br />
            {staticData[1]}
          </h1>
        </ColumnWrapper>
      </Layout>
    );
  }
}

Favs.propTypes = {
  staticData: PropTypes.instanceOf(Array).isRequired,
  favs: PropTypes.instanceOf(Object).isRequired,
  onSetFav: PropTypes.func.isRequired,
  onSetUnfav: PropTypes.func.isRequired
};

export default compose(
  connect(mapStateToProps),
  connect(null, mapDispatchToProps)
)(Favs);
