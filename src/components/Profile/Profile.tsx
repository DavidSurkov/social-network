import React from 'react';
import '../../App.css';
import { ProfileStyle } from './ProfileStyle';
import { MyPosts } from './Posts/MyPosts';
import Banner from './Banner/Banner';
import { ProfileDescription } from './ProfileDescription/ProfileDescription';

export function Profile() {
  return (
    <>
      <ProfileStyle>
        <Banner />
        <ProfileDescription />
        <MyPosts />
      </ProfileStyle>
    </>
  );
}
