import React from 'react';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const DashboardDefault = React.lazy(() => import('./Demo/Dashboard/Default'));

const UIBasicButton = React.lazy(() => import('./Demo/UIElements/Basic/Button'));
const UIBasicBadges = React.lazy(() => import('./Demo/UIElements/Basic/Badges'));
const UIBasicBreadcrumbPagination = React.lazy(() => import('./Demo/UIElements/Basic/BreadcrumbPagination'));

const UIBasicCollapse = React.lazy(() => import('./Demo/UIElements/Basic/Collapse'));
const UIBasicTabsPills = React.lazy(() => import('./Demo/UIElements/Basic/TabsPills'));
const UIBasicBasicTypography = React.lazy(() => import('./Demo/UIElements/Basic/Typography'));

const FormsElements = React.lazy(() => import('./Demo/Forms/FormsElements'));

const BootstrapTable = React.lazy(() => import('./Demo/Tables/BootstrapTable'));

const Nvd3Chart = React.lazy(() => import('./Demo/Charts/Nvd3Chart/index'));

const GoogleMap = React.lazy(() => import('./Demo/Maps/GoogleMap/index'));

const OtherSamplePage = React.lazy(() => import('./Demo/Other/SamplePage'));
const OtherDocs = React.lazy(() => import('./Demo/Other/Docs'));

const NewUser = React.lazy(() => import('./Accounts/Registration/NewUser'));
const NewOrganisation = React.lazy(() => import('./Accounts/Organisation/NewOrganisation'));
const Organisations = React.lazy(() => import('./Accounts/Organisation/Organisations'));
const Users = React.lazy(() => import('./Accounts/Registration/Users'));
const Roles = React.lazy(() => import('./Accounts/Roles/Roles'));
const NewRole = React.lazy(() => import('./Accounts/Roles/New-Role'));

const routes = [
    {path: '/dashboard/default', exact: true, name: 'Default', component: DashboardDefault},
    {path: '/basic/button', exact: true, name: 'Basic Button', component: UIBasicButton},
    {path: '/basic/badges', exact: true, name: 'Basic Badges', component: UIBasicBadges},
    {
        path: '/basic/breadcrumb-paging',
        exact: true,
        name: 'Basic Breadcrumb Pagination',
        component: UIBasicBreadcrumbPagination
    },
    { path: '/basic/collapse', exact: true, name: 'Basic Collapse', component: UIBasicCollapse },
    { path: '/basic/tabs-pills', exact: true, name: 'Basic Tabs & Pills', component: UIBasicTabsPills} ,
    { path: '/basic/typography', exact: true, name: 'Basic Typography', component: UIBasicBasicTypography },
    { path: '/forms/form-basic', exact: true, name: 'Forms Elements', component: FormsElements },
    { path: '/tables/bootstrap', exact: true, name: 'Bootstrap Table', component: BootstrapTable },
    { path: '/charts/nvd3', exact: true, name: 'Nvd3 Chart', component: Nvd3Chart },
    { path: '/maps/google-map', exact: true, name: 'Google Map', component: GoogleMap },
    { path: '/sample-page', exact: true, name: 'Sample Page', component: OtherSamplePage },
    { path: '/registration/users', exact: true, name: 'New User', component: Users },
    { path: '/registration/new-user', exact: true, name: 'New User', component: NewUser },
    { path: '/registration/new-user/:id', exact: true, name: 'New User', component: NewUser },
    { path: '/registration/new-organisation', exact: true, name: 'New Organisation', component: NewOrganisation },
    { path: '/registration/new-organisation/:id', exact: true, name: 'New Organisation', component: NewOrganisation },
    { path: '/registration/organisations', exact: true, name: 'Organisations', component: Organisations },
    { path: '/registration/roles', exact: true, name: 'Roles', component: Roles },
    { path: '/registration/new-role', exact: true, name: 'New Role', component: NewRole },
    { path: '/registration/new-role/:id', exact: true, name: 'New Role', component: NewRole },
    { path: '/docs', exact: true, name: 'Documentation', component: OtherDocs },
];

export default routes;
