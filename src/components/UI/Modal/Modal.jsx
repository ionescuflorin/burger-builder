import React from 'react'
import './Modal.css'
import BackDrop from '../BackDrop/BackDrop'


class Modal extends React.Component {
    // performance check
    shouldComponentUpdate(nextProps, nextState) {
      return nextProps.show !== this.props.show
    }
 // performance check
    componentDidUpdate() {
        console.log('[Modal] Will Update')
    }

    render() {

        return (
            <React.Fragment>
                <BackDrop show={this.props.show} clicked={this.props.modalClosed}/>
            <div className='Modal' style={{
                transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: this.props.show ? '1': '0'
            }}>
                {this.props.children}
            </div>
            </React.Fragment>
        )
    }
    }


export default Modal
