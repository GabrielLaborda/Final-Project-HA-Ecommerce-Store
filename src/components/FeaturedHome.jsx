import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css';
import { Navigation, Pagination } from 'swiper/modules';
import './FeaturedHome.css';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { useParams } from "react-router-dom";

function FeaturedHome() {
  const params = useParams();
  const slug = params.categorySlug;
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const [products, setProducts] = useState(null);

  const getCategory = async () => {
    const response = await axios({
      method: 'GET',
      url: `${baseURL}/categories/${slug}`,
    });
    setProducts(response.data.products.filter((product)=>product.featured===true));
  }
  const getProducts = async () => {
    const response = await axios({
      method: "GET",
      url: `${baseURL}/products`,
      params: { featured: true },
    });
    setProducts(response.data);
  };

  useEffect(() => {
    slug ? getCategory() : getProducts();
  }, [slug]);

  return (
    <>
      <div className="container featured-container">
        {slug ? <h5 className="featured-h5 text-center">YOU MAY ALSO LIKE</h5> : <h3 className="featured-h3 text-center">FEATURED</h3>}
        <Swiper
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            576: {
              slidesPerView: 2,
            },
            1200: {
              slidesPerView: 3,
            },
            1400: {
              slidesPerView: 4,
            },
          }}
          spaceBetween={30}
          loop={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {products &&
            products.map((product) => (
              <SwiperSlide key={product._id}>
                <NavLink
                  className={"text-decoration-none text-black"}
                  to={`/products/${product.category.slug}/${product.slug}`}
                >
                  <div className="swiper-slide p-1">
                    <div className="card h-100 mb-5 py-3 px-3 rounded-0">
                      <img src={`${baseURL}/img/${product.picture[0]}`} class="card-img-top mb-5" alt="..."/>
                      <div className="card-body d-flex flex-column justify-content-end">
                        <h5 className="card-title">USD {product.price}</h5>
                        <p className="card-text text-center w-75">{product.name}</p>
                        <button type="button" className="btn btn-outline-dark rounded-0 w-75 border-secondary-subtle">Add to cart</button>
                    </div>
                    </div>
                  </div>
                </NavLink>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </>
  );
}

export default FeaturedHome;
