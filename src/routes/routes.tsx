import {
    Chart,
    CompanyDetail,
    CompanyNew,
    CvApplyManage,
    CvManage,
    Home,
    JobDetail,
    Login,
    PostManage,
    Profile,
    Register,
    ToDo,
    UserManage,
} from "./index";

export const routes = [
    {
        name: "TODo",
        path: "/todo",
        element: <ToDo />,
        requiresAuth: false,
    },
    {
        name: "Home",
        path: "/",
        element: <Home />,
        requiresAuth: false,
    },
    {
        name: "Login",
        path: "/login",
        element: <Login />,
        requiresAuth: false,
    },
    {
        name: "Regsiter",
        path: "/register",
        element: <Register />,
        requiresAuth: false,
    },
    {
        name: "CvManage",
        path: "/cv_manage",
        element: <CvManage />,
        requiresAuth: false,
    },
    {
        name: "JobDetail",
        path: "/job_detail/:id",
        element: <JobDetail />,
        requiresAuth: false,
    },
    {
        name: "CompanyDetail",
        path: "/company_detail/:id",
        element: <CompanyDetail />,
        requiresAuth: false,
    },
    {
        name: "Profile",
        path: "/profile",
        element: <Profile />,
        requiresAuth: false,
    },
    {
        name: "CompanyNew",
        path: "/company/new",
        element: <CompanyNew />,
        requiresAuth: false,
    },
    {
        name: "UserManage",
        path: "/user",
        element: <UserManage />,
        requiresAuth: false,
    },
    {
        name: "Chart",
        path: "/chart",
        element: <Chart />,
        requiresAuth: false,
    },
    {
        name: "PostManage",
        path: "/post",
        element: <PostManage />,
        requiresAuth: false,
    },
    {
        name: "CvApplyManage",
        path: "/cv_apply",
        element: <CvApplyManage />,
        requiresAuth: false,
    },
] as const;

type RouteName = (typeof routes)[number]["name"];

type RoutesMap = {
    [K in RouteName]: (typeof routes)[number]["path"];
};

export const routesMap = ((): RoutesMap => {
    return routes.reduce((acc, route) => {
        acc[route.name] = route.path;
        return acc;
    }, {} as RoutesMap);
})();
