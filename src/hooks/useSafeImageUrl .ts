import { useEffect, useState } from "react";

/**
 * Hàm này fix lỗi khi backend trả về ảnh với Content-Type sai (application/pdf)
 * @param originalUrl URL ảnh từ backend
 * @returns URL an toàn để dùng trong thẻ <Image>
 */
export const useSafeImageUrl = (originalUrl: string): string => {
    const [safeUrl, setSafeUrl] = useState("");

    useEffect(() => {
        if (!originalUrl) return;

        const fixImageUrl = async () => {
            try {
                // Bước 1: Fetch ảnh từ backend
                const response = await fetch(originalUrl);
                const blob = await response.blob();

                // Bước 2: Kiểm tra xem có phải là ảnh không (đề phòng trường hợp file thực sự là PDF)
                if (blob.type.startsWith("image/")) {
                    const objectUrl = URL.createObjectURL(blob);
                    setSafeUrl(objectUrl);
                } else {
                    console.error("File không phải là ảnh:", blob.type);
                    setSafeUrl(""); // Hoặc URL ảnh placeholder
                }
            } catch (error) {
                console.error("Lỗi khi xử lý ảnh:", error);
                setSafeUrl(""); // Fallback nếu lỗi
            }
        };

        fixImageUrl();

        // Dọn dẹp khi component unmount
        return () => {
            if (safeUrl) URL.revokeObjectURL(safeUrl);
        };
    }, [originalUrl]);

    return safeUrl || originalUrl; // Fallback về URL gốc nếu không xử lý được
};
