const BackDrop = () => {
  return <div>backdrop </div>;
};

const ModalOverlay = ({ children }) => {
  return <div>{children}</div>;
};

const portalElem = document.getElementById('overlays');

const Madal = () => {
  return (
    <div>
      {ReactDOM.createPortal(<BackDrop />, portalElem)}
      {ReactDOM.createPortal(<ModalOverlay>{children}</ModalOverlay>, portalElem)}
    </div>
  );
};

export default Madal;
