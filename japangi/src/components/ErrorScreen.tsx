import { css } from "@emotion/react";
import { BigButton } from "./BigButton";

interface ErrorScreenProps {
  onRetry: () => void;
}

export function ErrorScreen({ onRetry }: ErrorScreenProps): React.ReactElement {
  return (
    <div
      css={css`
        min-height: 100dvh;
        padding: 32px 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 12px;
        text-align: center;
      `}
    >
      <span
        css={css`
          font-size: var(--font-body);
          font-weight: 700;
          color: #191f28;
        `}
      >
        데이터를 불러올 수 없어요
      </span>
      <span
        css={css`
          font-size: var(--font-body);
          color: #888;
        `}
      >
        잠시 후 다시 시도해주세요.
      </span>
      <div
        css={css`
          width: 100%;
          max-width: 320px;
          margin-top: 8px;
        `}
      >
        <BigButton onClick={onRetry}>다시 시도</BigButton>
      </div>
    </div>
  );
}
