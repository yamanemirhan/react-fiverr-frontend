import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import './GigCard.scss';
import newRequest from '../../utils/newRequest';

function GigCard({ item }) {
  const { isLoading, error, data } = useQuery({
    queryKey: ['gigUser'],
    queryFn: () =>
      newRequest.get(`/users/${item.userId}`).then((res) => {
        return res.data;
      }),
  });

  return (
    <Link to={`/gigs/${item._id}`} className="link">
      <div className="gigCard">
        <img src={item.cover} alt="" />
        <div className="info">
          {isLoading ? (
            'Loading...'
          ) : error ? (
            'User not found!'
          ) : (
            <div className="user">
              <img src={data.img || '/img/noavatar.jpg'} alt={data.username} />
              <span>{data.username}</span>
            </div>
          )}
          <p>{item.desc}</p>
          <div className="star">
            <img src="./img/star.png" alt="star" />
            <span>
              {!isNaN(item.totalStars / item.starNumber) &&
                Math.round(item.totalStars / item.starNumber)}
            </span>
          </div>
        </div>
        <hr />
        <div className="details">
          <img src="./img/heart.png" alt="heart" />
          <div className="price">
            <span>starting at</span>
            <h2>${item.price}</h2>
          </div>
        </div>
      </div>
    </Link>
  );
}

export { GigCard };
