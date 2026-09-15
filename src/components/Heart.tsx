export default function Heart() {
  return (
    <div className="bg-heart">
      <svg
        className="heart-svg"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M50 88
             C 20 68, 6 50, 6 32
             C 6 18, 17 8, 30 8
             C 40 8, 47 14, 50 22
             C 53 14, 60 8, 70 8
             C 83 8, 94 18, 94 32
             C 94 50, 80 68, 50 88 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>

      <div className="ecg-wrap">
        <svg
          className="ecg-svg"
          viewBox="0 0 800 60"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            className="ecg-path"
            d="M0 30 L80 30 L100 30 L110 18 L120 42 L130 30 L160 30 L240 30 L260 30 L270 22 L280 38 L290 30 L340 30 L420 30 L440 30 L450 15 L460 45 L470 30 L520 30 L600 30 L620 30 L630 20 L640 40 L650 30 L720 30 L800 30"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}