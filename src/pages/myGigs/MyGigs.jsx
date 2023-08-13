import React from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import getCurrentUser from '../../utils/getCurrentUser';
import newRequest from '../../utils/newRequest';
import './MyGigs.scss';

function MyGigs() {
  const currentUser = getCurrentUser();

  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery({
    queryKey: ['myGigs'],
    queryFn: () =>
      newRequest.get(`/gigs?userId=${currentUser._id}`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (gigId) => {
      return newRequest.delete(`/gigs${gigId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['myGigs']);
    },
  });

  const handleDelete = (gigId) => {
    mutation.mutate(gigId);
  };

  return (
    <div className="myGigs">
      {isLoading ? (
        'Loading...'
      ) : error ? (
        'Something went wrong!'
      ) : (
        <div className="container">
          <div className="title">
            <h1>Gigs</h1>
            <Link to="/add" className="link">
              <button>Add New Gig</button>
            </Link>
          </div>
          <table>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Sales</th>
              <th>Action</th>
            </tr>
            {data.map((gig) => (
              <tr key={gig._id}>
                <td>
                  <img src={gig.cover} alt={gig.title} className="image" />
                </td>
                <td>{gig.title}</td>
                <td>{gig.price}</td>
                <td>{gig.sales}</td>
                <td>
                  <img
                    src="/img/delete.png"
                    alt="delete icon"
                    className="delete"
                    onClick={() => handleDelete(gig._id)}
                  />
                </td>
              </tr>
            ))}
          </table>
        </div>
      )}
    </div>
  );
}

export { MyGigs };
