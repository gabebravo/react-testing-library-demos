import React from 'react';
import ReactDOM from 'react-dom';

let modalRoot = document.getElementById('modal-root');
if (!modalRoot) {
  modalRoot = document.createElement('div');
  modalRoot.setAttribute('id', 'modal-root');
  document.body.appendChild(modalRoot);
}

// don't use this for your modals.
// you need to think about accessibility and styling.
// Look into: https://ui.reach.tech/dialog
function Modal({ children }) {
  const el = React.useRef(document.createElement('div'));

  React.useLayoutEffect(() => {
    const currentEl = el.current;
    modalRoot.appendChild(currentEl);
    return () => modalRoot.removeChild(currentEl);
  }, []);

  return ReactDOM.createPortal(children, el.current);
}

const styles = {
  wrapper: {
    backgroundColor: 'silver',
    width: '20%',
    color: 'white',
    margin: 'auto'
  }
};

export default function PortalModal() {
  return (
    <Modal>
      <div className="container" style={styles.wrapper}>
        <h3>Grocery List</h3>
        <ul>
          <li>Yogurt</li>
          <li>Tofu</li>
          <li>Strwberries</li>
        </ul>
      </div>
    </Modal>
  );
}
