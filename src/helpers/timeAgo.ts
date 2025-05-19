export const timeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Đăng hôm nay";
    if (diffDays === 1) return "Đăng hôm qua";
    return `Đăng ${diffDays} ngày trước`;
};
