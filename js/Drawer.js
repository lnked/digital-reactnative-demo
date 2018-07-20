import React from 'react';
import { Drawer, NavButton, Navigator } from '@dormakaba/digital-reactnative-client';

export function AppDrawer() {
  return (
    <Drawer
      user={{
        name: 'Jan Mühlemann',
        pictureUrl: 'https://avatars2.githubusercontent.com/u/977772',
      }}
      gotoDashboard={() => {
        Navigator.navigate('Dashboard');
      }}
      gotoAccount={() => {
        Navigator.navigate('Dashboard');
      }}
      gotoAccountText="Open Userprofile"
      handleLogout={() => {
        Navigator.navigate('Dashboard');
      }}
      handleLogoutText="Logout"
    >
      <NavButton route="dashboard" label="dashboard" />
    </Drawer>
  );
}
