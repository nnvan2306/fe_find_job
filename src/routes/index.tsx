import { lazy } from "react";

export const ToDo = lazy(() => import("../components/pages/ToDo"));
export const Login = lazy(() => import("../components/pages/Login"));
export const Register = lazy(() => import("../components/pages/Register"));
export const Home = lazy(() => import("../components/pages/Home"));
export const Job = lazy(() => import("../components/pages/Job"));
export const JobDetail = lazy(() => import("../components/pages/JobDetail"));
