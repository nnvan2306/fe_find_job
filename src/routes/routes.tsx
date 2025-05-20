import {
    CategoryManage,
    Chart,
    Companies,
    CompanyDetail,
    CompanyManage,
    CvApplyManage,
    CvManage,
    FindCv,
    ForgetPassword,
    Home,
    JobDetail,
    Login,
    MyCompany,
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
        name: "Forgot",
        path: "/forget",
        element: <ForgetPassword />,
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
        name: "MyCompany",
        path: "/manage/company/me",
        element: <MyCompany />,
        requiresAuth: false,
    },
    {
        name: "UserManage",
        path: "/manage/user",
        element: <UserManage />,
        requiresAuth: false,
    },
    {
        name: "Chart",
        path: "/maange/chart",
        element: <Chart />,
        requiresAuth: false,
    },
    {
        name: "PostManage",
        path: "/manage/post",
        element: <PostManage />,
        requiresAuth: false,
    },
    {
        name: "CvApplyManage",
        path: "/manage/cv_apply",
        element: <CvApplyManage />,
        requiresAuth: false,
    },
    {
        name: "FindCv",
        path: "/find_cv",
        element: <FindCv />,
        requiresAuth: false,
    },
    {
        name: "Companies",
        path: "/companies",
        element: <Companies />,
        requiresAuth: false,
    },
    {
        name: "CategoryManage",
        path: "/manage/categoy",
        element: <CategoryManage />,
        requiresAuth: false,
    },
    {
        name: "CompanyManage",
        path: "/manage/company",
        element: <CompanyManage />,
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
