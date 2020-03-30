import React from 'react';
import { CSSTransition } from 'react-transition-group';

function Fade(props) {
  return (
    <CSSTransition unmountOnExit timeout={1000} classNames="fade" {...props} />
  );
}

function Messages({ children = 'This is a secret message!' }) {
  const [show, setShow] = React.useState(false);
  const toggle = () => setShow(s => !s);

  return (
    <div className="container">
      <button onClick={toggle}>Toggle</button>
      <Fade in={show}>
        <div forhtml="wrapper-div">{children}</div>
      </Fade>
    </div>
  );
}

export default function HiddenMessage() {
  return <Messages></Messages>;
}
