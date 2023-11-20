import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import ReactLoading from "react-loading";

export default function ReviewProduct({ review, product_name }) {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    rating: 0,
    comment: "",
    username: "said",
    product_name: product_name,
    created_date: new Date(),
  });
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await axios.get(review.href);
        setReviews(response.data._embedded.reviews);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, [review]);

  const ratingChanged = (newRating) => {
    setFormData({
      ...formData,
      rating: newRating,
    });
  };

  const commentChanged = (e) => {
    setFormData({
      ...formData,
      comment: e.target.value,
    });
  };

  const onSubmitClick = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://akenord.ma:8443/api/review",
        formData
      );
      setReviews([...reviews, formData]);

      setFormData({
        rating: 0,
        comment: "",
        username: "said",
        product_name: product_name,
        created_date: new Date(),
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ReactLoading
          type="spinningBubbles"
          color="hsl(176, 88%, 27%)"
          height={70}
          width={70}
        />
      </div>
    );
  }

  return (
    <section className="details__tab container">
      <div className="detail__tabs">
        <span className="detail__tab active-tab" data-target="#reviews">
          Reviews({reviews.length})
        </span>
      </div>

      <div className="details__tabs-content">
        <div
          className="details__tab-content active-tab"
          content="true"
          id="reviews"
        >
          <div className="reviews__container grid">
            {reviews.map((value, key) => (
              <div className="review__single" key={key}>
                <div>
                  <h4 className="review__title">{value.username}</h4>
                </div>

                <div className="review__data">
                  <div className="review__rating">
                    {Array.from({ length: value.rating }, (_, index) => {
                      <i className="fi fi-rs-star" key={index}></i>;
                    })}
                  </div>

                  <p className="review__description">{value.comment}</p>

                  <span className="review__date">
                    {value.created_date.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="review__form">
            <h4 className="review__form-title">Add a review</h4>

            <div className="rate__product">
              <ReactStars
                count={5}
                onChange={ratingChanged}
                value={formData.rating}
                size={24}
                activeColor="#ffd700"
              />
            </div>

            <form className="form grid" onSubmit={onSubmitClick}>
              <textarea
                className="form__input textarea"
                placeholder="Write Comment"
                value={formData.comment}
                onChange={commentChanged}
              ></textarea>

              <div className="form__btn">
                <button type="submit" className="btn">
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
