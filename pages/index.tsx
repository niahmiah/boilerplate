import * as React from 'react';
import { connect } from 'react-redux'
import Layout from '../components/Layout';
// import { signIn, signOut } from '../store';

class Index extends React.Component {
  static getInitialProps ({ reduxStore, req }) {
    const isServer = !!req
    // DISPATCH ACTIONS HERE ONLY WITH `reduxStore.dispatch`
    // reduxStore.dispatch(signOut(isServer));

    return {}
  }

  componentDidMount () {
    // DISPATCH ACTIONS HERE FROM `mapDispatchToProps`
  }

  componentWillUnmount () {
    // reset any timers, etc for unmounting the component
  }

  render () {
    return (
            <Layout title="Home">
              <p>This is the home page</p>
            </Layout>
        );
  }
}
const mapDispatchToProps = {}
export default connect(
  null,
  mapDispatchToProps
)(Index)
