import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { toast } from 'react-toastify';
import './DBreset.css';

import { useDispatch } from 'react-redux';
import { logout } from '../redux/userSlice';
import { emptyCart } from '../redux/cartSlice';

function DBreset() {
  const dispatch = useDispatch();
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);

  const resetSeeders = async () => {
    const response = await toast.promise(
      axios({
        method: 'POST',
        url: `${baseURL}/seeders`,
      }),
      {
        pending: 'DB is being reset!',
        success: 'DB has been successfully reset 👌',
        error: 'Ops, somehting went wrong. Please try again 🤯',
      }
    );
  };

  const handleReset = async () => {
    await resetSeeders();
    dispatch(logout());
    dispatch(emptyCart());
    setShow(false);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} animation={false} centered>
        <Modal.Header
          closeButton
          className="bg-black text-light rounded-0 font-roboto"
        >
          <Modal.Title>Woohoo, welcome to UrbanRush!</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-black  text-light font-roboto">
          <p>
            For a better experience while exploring our website, we recommend
            that you start by resetting the database!
          </p>
          <p>
            Don't worry, to achieve that you just need to click the Reset DB
            button below.
          </p>
        </Modal.Body>
        <Modal.Footer className="bg-black text-light rounded-0 font-roboto">
          <button
            className="btn btn-outline-light rounded-0 font-roboto"
            onClick={handleClose}
          >
            Close
          </button>
          <button
            className="btn btn-outline-light rounded-0 font-roboto"
            onClick={handleReset}
          >
            Reset DB
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DBreset;
