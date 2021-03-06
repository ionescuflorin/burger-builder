import React from 'react';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends React.Component {
    state = {
      error: null
    };

    // GLOBAL error handling
    reqInterceptor = axios.interceptors.request.use(req => {
      this.setState({ error: null });
      return req;
    });

    resInterceptor = axios.interceptors.response.use(
      res => res,
      error => {
        this.setState({ error: error });
      }
    );

    componentWillUnmount() {
      // delete dead interceptors
    //   console.log('Will Unmount', this.reqInterceptor, this.resInterceptor) v214/m 6:30 test
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };

    render() {
      return (
        <React.Fragment>
          <Modal
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </React.Fragment>
      );
    }
  };
};

export default withErrorHandler;
