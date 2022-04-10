import React from 'react';
import bannerLogo from '../../../images/bannerLogo.jpg';
import styled from 'styled-components';

//Styles
export const BannerStyle = styled.div`
  height: 200px;
  background-image: url('https://i0.wp.com/urok-ua.com/wp-content/uploads/2017/07/Avatarka-10.jpg');
  background-position: 0 0;
  background-attachment: fixed;
`;

export const Banner = () => {
  return <BannerStyle />;
};
