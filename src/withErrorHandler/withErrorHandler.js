import React from 'react';

import Modal from '../components/UI/Modal/Modal';
import Aux from '../hoc/Aux'

const withErrorHandler = (WrappedComponent) => {
    return (props) => {
        return (
            <Aux>
                <Modal >
                    Something didn't work!
                </Modal>
                <WrappedComponent {...props} />
            </Aux>
        )
    }
}

export default withErrorHandler 