export const NSPLogo = ({
  color = "currentColor",
  width = 120,
  height = 44,
  className = "",
  title = "NSP logo",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 526 541"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={title}
      className={className}
    >
      <title>{title}</title>

      <g fill={color} fillRule="evenodd">
        <path d="M 5 195 L 0 252 L 21 328 L 62 391 L 123 439 L 213 465 L 218 407 L 206 359 L 151 289 L 76 259 L 80 290 L 127 311 L 166 351 L 183 389 L 187 429 L 116 397 L 80 363 L 51 317 L 33 222 L 80 222 L 131 236 L 183 268 L 218 306 L 253 391 L 255 540 L 284 539 L 282 468 L 308 394 L 347 346 L 386 318 L 442 297 L 495 294 L 488 362 L 457 426 L 408 474 L 351 502 L 351 469 L 369 425 L 403 388 L 449 364 L 456 336 L 402 351 L 347 401 L 320 463 L 323 539 L 380 525 L 438 491 L 483 444 L 511 393 L 525 340 L 522 264 L 446 264 L 380 285 L 328 320 L 282 374 L 244 288 L 176 224 L 93 192 Z" />
        <path d="M 60 146 L 63 153 L 90 154 L 124 98 L 157 68 L 190 49 L 249 34 L 301 37 L 358 59 L 402 95 L 434 144 L 447 196 L 376 213 L 303 253 L 248 192 L 174 146 L 218 111 L 277 102 L 333 124 L 356 146 L 373 174 L 401 167 L 392 142 L 359 104 L 325 83 L 282 71 L 234 73 L 183 94 L 147 127 L 129 163 L 174 181 L 223 213 L 263 253 L 294 299 L 379 246 L 421 232 L 481 222 L 478 181 L 467 141 L 432 81 L 375 32 L 301 5 L 269 0 L 228 5 L 154 32 L 95 83 Z" />
      </g>
    </svg>
  );
};
