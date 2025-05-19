import { Box, Heading } from "@chakra-ui/react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from "chart.js";
import ManagerTemplate from "../../templates/ManagerTemplate";
import { useGetUsers } from "../../../services/user/get-users";
import { useCallback, useMemo } from "react";
import { useAppSelector } from "../../../app/hooks";
import { useGetJobPosts } from "../../../services/job_post/get-job-posts";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const Chart = () => {
    const user = useAppSelector((state) => state.user);

    const options = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    precision: 0,
                },
            },
        },
    };

    const { data } = useGetUsers({
        nest: { isUnActive: user?.role !== "admin" },
    });

    const { data: dataJob } = useGetJobPosts({
        nest: {
            company_id: user?.company_id,
            isUnActive: !user?.company_id || user.role !== "company",
        },
    });

    const handleBuildLabel = useCallback(() => {
        if (user?.role === "admin") {
            return ["Applicant", "Recruiter", "Company"];
        }
        if (user?.role === "company") {
            return [
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
                "9",
                "10",
                "11",
                "12",
            ];
        }
        return [];
    }, [user?.role]);

    const handleBuild = useCallback(() => {
        if (user?.role === "admin") {
            {
                return [
                    {
                        label: "Chart",
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        data: (data?.data || []).reduce(
                            (acc, user) => {
                                if (user.role === "applicant") acc[0]++;
                                else if (user.role === "recruiter") acc[1]++;
                                else if (user.role === "company") acc[2]++;
                                return acc;
                            },
                            [0, 0, 0]
                        ),
                        backgroundColor: "#3182CE",
                    },
                ];
            }
        }
        if (user?.role === "company") {
            return [
                {
                    label: "Chart",
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    data: (dataJob?.data || []).reduce((acc, item) => {
                        const month = new Date(item.createdAt).getMonth();
                        console.log(month);
                        acc[month] += 1;
                        return acc;
                    }, Array(12).fill(0)),
                    backgroundColor: "#3182CE",
                },
            ];
        }
        return [];
    }, [data, dataJob, user?.role]);

    const dataChart = useMemo(() => {
        return {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            labels: handleBuildLabel(),
            datasets: handleBuild(),
        };
    }, [handleBuild, handleBuildLabel]);

    return (
        <ManagerTemplate>
            <Box p={4}>
                <Heading size="md" mb={4}>
                    Thống kê
                </Heading>
                <Bar data={dataChart} options={options} />
            </Box>
        </ManagerTemplate>
    );
};

export default Chart;
