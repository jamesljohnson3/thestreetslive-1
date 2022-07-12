const sidebarMenu = () => [
  {
    name: 'Account',
    menuItems: [
      {
        name: 'Dashboard',
        path: `/account`,
      },
      {
        name: 'Billing',
        path: `subscriptions`,
      },
      {
        name: 'Settings',
        path: `/account/settings`,
      },
    ],
  },
];

export default sidebarMenu;
