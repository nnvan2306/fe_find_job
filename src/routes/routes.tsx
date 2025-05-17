import { Home, Job, JobDetail, Login, Register, ToDo } from "./index";

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
        name: "Job",
        path: "/job",
        element: <Job />,
        requiresAuth: false,
    },
    {
        name: "JobDetail",
        path: "/job_detail/:id",
        element: <JobDetail />,
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
