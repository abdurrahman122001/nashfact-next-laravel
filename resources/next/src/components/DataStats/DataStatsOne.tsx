"use client";

import React, { useEffect, useState } from "react";

interface DataStats {
    icon: JSX.Element;
    color: string;
    title: string;
    value: string | number;
    growthRate: number;
}

const DataStatsOne: React.FC = () => {
    const [totalPosts, setTotalPosts] = useState<number | null>(null);
    const [totalCategories, setTotalCategories] = useState<number | null>(null);
    const [totalUsers, setTotalUsers] = useState<number | null>(null);

    useEffect(() => {
        const fetchPostStats = async () => {
            try {
                const response = await fetch(
                    "http://localhost:8000/api/stats/posts",
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch post stats");
                }
                const data = await response.json();
                setTotalPosts(data.totalPosts);
            } catch (error) {
                console.error("Error fetching post stats:", error);
            }
        };

        const fetchCategoryStats = async () => {
            try {
                const response = await fetch(
                    "http://localhost:8000/api/stats/categories",
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch category stats");
                }
                const data = await response.json();
                setTotalCategories(data.totalCategories);
            } catch (error) {
                console.error("Error fetching category stats:", error);
            }
        };

        const fetchUserCount = async () => {
            try {
                const response = await fetch(
                    "http://localhost:8000/api/users/count",
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch user count");
                }
                const data = await response.json();
                setTotalUsers(data.totalUsers);
            } catch (error) {
                console.error("Error fetching user count:", error);
            }
        };

        fetchPostStats();
        fetchCategoryStats();
        fetchUserCount();
    }, []);

    const dataStatsList: DataStats[] = [
        {
            icon: (
                <svg
                    width="26"
                    height="26"
                    viewBox="0 0 26 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M10.5626 13.0002C10.5626 11.654 11.6539 10.5627 13.0001 10.5627C14.3463 10.5627 15.4376 11.654 15.4376 13.0002C15.4376 14.3464 14.3463 15.4377 13.0001 15.4377C11.6539 15.4377 10.5626 14.3464 10.5626 13.0002Z"
                        fill="white"
                    />
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M2.16675 13.0002C2.16675 14.7762 2.62713 15.3743 3.54788 16.5705C5.38638 18.959 8.4697 21.6668 13.0001 21.6668C17.5305 21.6668 20.6138 18.959 22.4523 16.5705C23.373 15.3743 23.8334 14.7762 23.8334 13.0002C23.8334 11.2242 23.373 10.6261 22.4523 9.42985C20.6138 7.04135 17.5305 4.3335 13.0001 4.3335C8.4697 4.3335 5.38638 7.04135 3.54788 9.42985C2.62713 10.6261 2.16675 11.2242 2.16675 13.0002ZM13.0001 8.93766C10.7564 8.93766 8.93758 10.7565 8.93758 13.0002C8.93758 15.2438 10.7564 17.0627 13.0001 17.0627C15.2437 17.0627 17.0626 15.2438 17.0626 13.0002C17.0626 10.7565 15.2437 8.93766 13.0001 8.93766Z"
                        fill="white"
                    />
                </svg>
            ),
            color: "#3FD97F",
            title: "Total Posts",
            value: totalPosts !== null ? totalPosts : "Loading...",
            growthRate: 0,
        },
        {
            icon: (
                <svg
                    width="26"
                    height="26"
                    viewBox="0 0 26 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M19.0425 4.80065L16.8758 3.66364C14.9739 2.66555 14.0229 2.1665 13 2.1665C11.977 2.1665 11.026 2.66555 9.12411 3.66363L6.95744 4.80065C5.03588 5.80904 3.90635 6.40179 3.20629 7.1946L13 12.0914L22.7936 7.1946C22.0936 6.40179 20.964 5.80904 19.0425 4.80065Z"
                        fill="white"
                    />
                    <path
                        d="M23.5607 8.62788L13.8125 13.502V23.7292C14.5902 23.5355 15.4751 23.0711 16.8758 22.336L19.0425 21.199C21.3734 19.9758 22.5389 19.3642 23.1861 18.2651C23.8333 17.1661 23.8333 15.7984 23.8333 13.0632V12.9365C23.8333 10.8861 23.8333 9.60421 23.5607 8.62788Z"
                        fill="white"
                    />
                    <path
                        d="M12.1875 23.7292V13.502L2.43923 8.62788C2.16663 9.60421 2.16663 10.8861 2.16663 12.9365V13.0632C2.16663 15.7984 2.16663 17.1661 2.81381 18.2651C3.46099 19.3642 4.62647 19.9758 6.95744 21.199L9.12411 22.336C10.5248 23.0711 11.4097 23.5355 12.1875 23.7292Z"
                        fill="white"
                    />
                </svg>
            ),
            color: "#FF9C55",
            title: "Total Categories",
            value: totalCategories !== null ? totalCategories : "Loading...",
            growthRate: 0,
        },
        {
            icon: (
                <svg
                    width="26"
                    height="26"
                    viewBox="0 0 26 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M19.0425 4.80065L16.8758 3.66364C14.9739 2.66555 14.0229 2.1665 13 2.1665C11.977 2.1665 11.026 2.66555 9.12411 3.66363L6.95744 4.80065C5.03588 5.80904 3.90635 6.40179 3.20629 7.1946L13 12.0914L22.7936 7.1946C22.0936 6.40179 20.964 5.80904 19.0425 4.80065Z"
                        fill="white"
                    />
                    <path
                        d="M23.5607 8.62788L13.8125 13.502V23.7292C14.5902 23.5355 15.4751 23.0711 16.8758 22.336L19.0425 21.199C21.3734 19.9758 22.5389 19.3642 23.1861 18.2651C23.8333 17.1661 23.8333 15.7984 23.8333 13.0632V12.9365C23.8333 10.8861 23.8333 9.60421 23.5607 8.62788Z"
                        fill="white"
                    />
                    <path
                        d="M12.1875 23.7292V13.502L2.43923 8.62788C2.16663 9.60421 2.16663 10.8861 2.16663 12.9365V13.0632C2.16663 15.7984 2.16663 17.1661 2.81381 18.2651C3.46099 19.3642 4.62647 19.9758 6.95744 21.199L9.12411 22.336C10.5248 23.0711 11.4097 23.5355 12.1875 23.7292Z"
                        fill="white"
                    />
                </svg>
            ),
            color: "#8155FF",
            title: "Total Product",
            value: "2.450",
            growthRate: 2.59,
        },

        {
            icon: (
                <svg
                    width="26"
                    height="26"
                    viewBox="0 0 26 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <ellipse
                        cx="9.75106"
                        cy="6.49984"
                        rx="4.33333"
                        ry="4.33333"
                        fill="white"
                    />
                    <ellipse
                        cx="9.75106"
                        cy="18.4178"
                        rx="7.58333"
                        ry="4.33333"
                        fill="white"
                    />
                    <path
                        d="M22.7496 18.4173C22.7496 20.2123 20.5445 21.6673 17.8521 21.6673C18.6453 20.8003 19.1907 19.712 19.1907 18.4189C19.1907 17.1242 18.644 16.0349 17.8493 15.1674C20.5417 15.1674 22.7496 16.6224 22.7496 18.4173Z"
                        fill="white"
                    />
                    <path
                        d="M19.4996 6.50098C19.4996 8.2959 18.0446 9.75098 16.2496 9.75098C15.8582 9.75098 15.483 9.68179 15.1355 9.55498C15.648 8.65355 15.9407 7.61084 15.9407 6.49977C15.9407 5.38952 15.6484 4.34753 15.1366 3.44656C15.4838 3.32001 15.8587 3.25098 16.2496 3.25098C18.0446 3.25098 19.4996 4.70605 19.4996 6.50098Z"
                        fill="white"
                    />
                </svg>
            ),
            color: "#18BFFF",
            title: "Total Users",
            value: totalUsers !== null ? totalUsers : "Loading...",
            growthRate: -0.95,
        },
    ];

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
            {dataStatsList.map((item, index) => (
                <div
                    key={index}
                    className="rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark"
                >
                    <div
                        className="flex h-14.5 w-14.5 items-center justify-center rounded-full"
                        style={{ backgroundColor: item.color }}
                    >
                        {item.icon}
                    </div>

                    <div className="mt-6 flex items-end justify-between">
                        <div>
                            <h4 className="mb-1.5 text-heading-6 font-bold text-dark dark:text-white">
                                {item.value}
                            </h4>
                            <span className="text-body-sm font-medium">
                                {item.title}
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DataStatsOne;
