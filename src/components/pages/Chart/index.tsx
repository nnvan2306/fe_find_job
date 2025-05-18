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

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const Chart = () => {
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

    return (
        <ManagerTemplate>
            <Box p={4}>
                <Heading size="md" mb={4}>
                    Thống kê điểm theo người dùng
                </Heading>
                <Bar data={{ labels: [], datasets: [] }} options={options} />
            </Box>
        </ManagerTemplate>
    );
};

export default Chart;
