import { lazy } from "react";

export const ToDo = lazy(() => import("../components/pages/ToDo"));
export const Login = lazy(() => import("../components/pages/Login"));
export const Register = lazy(() => import("../components/pages/Register"));
export const Home = lazy(() => import("../components/pages/Home"));
export const CvManage = lazy(() => import("../components/pages/CvManage"));
export const JobDetail = lazy(() => import("../components/pages/JobDetail"));
export const CompanyDetail = lazy(
    () => import("../components/pages/CompanyDetail")
);
export const Profile = lazy(() => import("../components/pages/Profile"));
export const MyCompany = lazy(() => import("../components/pages/MyCompany"));
export const UserManage = lazy(() => import("../components/pages/UserManage"));
export const Chart = lazy(() => import("../components/pages/Chart"));
export const PostManage = lazy(() => import("../components/pages/PostManage"));
export const CvApplyManage = lazy(
    () => import("../components/pages/CvApplyManage")
);
export const FindCv = lazy(() => import("../components/pages/FindCv"));
export const Companies = lazy(() => import("../components/pages/Companies"));
export const CategoryManage = lazy(
    () => import("../components/pages/CategoryManage")
);
export const CompanyManage = lazy(
    () => import("../components/pages/CompanyManage")
);
<<<<<<< HEAD
=======

export const ForgetPassword = lazy(() => import("../components/pages/ForgetPass"))
>>>>>>> 9965ce4eabb97fc6f72f969a6b1413aede398a11
