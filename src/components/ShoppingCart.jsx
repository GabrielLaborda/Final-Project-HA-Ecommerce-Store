import './ShoppingCart.css';

import { NavLink, useNavigate } from 'react-router-dom';

import { IoIosAddCircle, IoIosRemoveCircleOutline } from 'react-icons/io';
import { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { addItem, deleteItem } from '../redux/cartSlice';
import { addInstruction } from '../redux/orderInstructionSlice';

function ShoppingCart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const orderInstruction = useSelector((state) => state.orderInstruction);

  const [comment, setComment] = useState(orderInstruction);
  const storageURL = import.meta.env.VITE_API_SUPABASE_URL;

  const handleCheckout = () => {
    if (user) {
      dispatch(addInstruction(comment));
      return navigate('/checkout');
    } else {
      return navigate('/login');
    }
  };

  const handleRemove = (slug) => {
    dispatch(deleteItem({ slug }));
  };

  const handleAdd = (slug) => {
    dispatch(addItem({ product: { slug }, quantity: 1 }));
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-6 col-12 p-0">
          <div className="left-section vh-100 d-none d-lg-flex flex-column align-items-center justify-content-center">
            <h2 className="title w-50">Shopping Cart</h2>
            <p className="text-white w-50 fw-bold text-background">
              We are shipping daily (M-F), and orders are expected to process in 1-2 business days.
              Orders must be placed by 9am (Pacific Standard Time) on a business day to ship same
              day. International shipments may be subject to import duties, taxes or other customs
              fees. Transit times are estimates only; USPS and UPS are currently experiencing
              extended delivery times. See Shipping & Handling for more details.
            </p>
          </div>
          <div className="left-section d-lg-none d-flex flex-column align-items-center justify-content-center">
            <h2 className="title w-75 mx-auto py-5 my-5">Shopping Cart</h2>
          </div>
        </div>

        <div className="col-lg-6 col-12">
          <div className="right-section">
            {cart.length > 0 ? (
              <div className="right-section vh-100 d-flex flex-column justify-content-center">
                <div className="cart-prods-container flex-column d-flex">
                  {cart.map((item) => (
                    <div key={item.product.slug} className="">
                      <div className=" d-flex flex-row w-75 mx-auto mt-5 align-items-center">
                        {item.product.picture && (
                          <>
                            <img
                              src={`${storageURL}/${item.product.picture[0]}`}
                              alt="Product Picture"
                              height={150}
                              className="d-none d-md-inline"
                            />
                            <img
                              src={`${storageURL}/${item.product.picture[0]}`}
                              alt="Product Picture"
                              height={100}
                              className="d-inline d-md-none"
                            />
                          </>
                        )}
                        <div className="w-100 ms-3 d-none d-md-inline">
                          <NavLink
                            to={`/products/${item.categorySlug}/${item.product.slug}`}
                            className={'text-decoration-none'}
                          >
                            <p className="mb-0">{item.product.name}</p>
                          </NavLink>
                          <p className="mb-0">USD {item.product.price}</p>
                          <p className="text-body-tertiary">Quantity: {item.quantity}</p>
                        </div>
                        <div className="w-100 ms-3 d-inline d-md-none small-text">
                          <NavLink
                            to={`/products/${item.categorySlug}/${item.product.slug}`}
                            className={'text-decoration-none'}
                          >
                            <p className="mb-0">{item.product.name}</p>
                          </NavLink>
                          <p className="mb-0">USD {item.product.price}</p>
                          <p className="text-body-tertiary">Quantity: {item.quantity}</p>
                        </div>
                        <div className="m-auto d-flex align-items-center justify-content-end w-100  ">
                          <IoIosRemoveCircleOutline
                            size={30}
                            onClick={() => handleRemove(item.product.slug)}
                            role="button"
                            className="text-body-tertiary"
                          />
                          <IoIosAddCircle
                            size={30}
                            onClick={() => handleAdd(item.product.slug)}
                            role="button"
                            className="text-body-tertiary"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <textarea
                  className="w-75 mx-auto border-0 bg-secondary-subtle fs-5 fw-light mt-5 p-3 mb-5"
                  name="orderComment"
                  id="orderComment"
                  rows="2"
                  placeholder="Special instructions for seller"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
                <div className="w-75 mx-auto">
                  <p className="mb-0 pb-0">
                    <span className="fs-5 fw-light">Total: </span>
                    {cart && (
                      <span className="fw-bold">
                        USD{' '}
                        {cart
                          .reduce((total, item) => total + item.quantity * item.product.price, 0)
                          .toFixed(2)}
                      </span>
                    )}
                  </p>
                  <p className="small-text fw-lighter mt-0">Shipping & taxes included</p>
                  <button onClick={handleCheckout} className="btn btn-dark rounded-0 w-100 py-3">
                    CHECKOUT
                  </button>
                </div>
              </div>
            ) : (
              <div className="right-section vh-100 flex-column d-flex align-items-center justify-content-center">
                <p>Your cart is currently empty.</p>
                <NavLink to={'/products/'}>
                  <button className="btn btn-dark rounded-0">CONTINUE BROWSING</button>
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
