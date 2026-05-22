import { css } from "@emotion/react";

export function LoadingScreen(): React.ReactElement {
  return (
    <div
      css={css`
        min-height: 100dvh;
        display: flex;
        align-items: center;
        justify-content: center;
      `}
    >
      <span
        css={css`
          font-size: var(--font-body);
          color: #888;
        `}
      >
        잠시만 기다려주세요…
      </span>
    </div>
  );
}
