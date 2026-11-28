import React from "react";

type FlagProps = {
    className?: string;
};

/** Small US flag icon (13 stripes + star field). */
export function UsFlag({ className = "" }: FlagProps) {
    const stars: Array<[number, number]> = [];
    for (let row = 0; row < 4; row += 1) {
        for (let col = 0; col < 5; col += 1) {
            stars.push([1.3 + col * 1.45, 1 + row * 1.6]);
        }
    }

    return (
        <svg
            viewBox="0 0 20 13"
            className={className}
            aria-hidden
            focusable="false"
            preserveAspectRatio="none"
        >
            <rect width="20" height="13" fill="#ffffff" />
            {[0, 2, 4, 6, 8, 10, 12].map((y) => (
                <rect key={y} y={y} width="20" height="1" fill="#b22234" />
            ))}
            <rect width="8.6" height="7" fill="#3c3b6e" />
            {stars.map(([cx, cy], index) => (
                <circle key={index} cx={cx} cy={cy} r="0.42" fill="#ffffff" />
            ))}
        </svg>
    );
}

/** Small India flag icon (saffron / white / green with chakra). */
export function IndiaFlag({ className = "" }: FlagProps) {
    return (
        <svg
            viewBox="0 0 20 13"
            className={className}
            aria-hidden
            focusable="false"
            preserveAspectRatio="none"
        >
            <rect width="20" height="13" fill="#ffffff" />
            <rect width="20" height="4.34" fill="#ff9933" />
            <rect y="8.66" width="20" height="4.34" fill="#138808" />
            <circle cx="10" cy="6.5" r="1.85" fill="none" stroke="#000080" strokeWidth="0.5" />
            <circle cx="10" cy="6.5" r="0.35" fill="#000080" />
            {Array.from({ length: 12 }).map((_, index) => {
                const angle = (index * Math.PI) / 6;
                return (
                    <line
                        key={index}
                        x1={10 + Math.cos(angle) * 0.35}
                        y1={6.5 + Math.sin(angle) * 0.35}
                        x2={10 + Math.cos(angle) * 1.7}
                        y2={6.5 + Math.sin(angle) * 1.7}
                        stroke="#000080"
                        strokeWidth="0.28"
                    />
                );
            })}
        </svg>
    );
}
