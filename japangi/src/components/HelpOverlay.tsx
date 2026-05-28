import { css, keyframes } from "@emotion/react";
import { useState } from "react";

interface HelpOverlayProps {
  helpText: string;
}

const slideUp = keyframes`
  0%   { transform: translateY(100%); }
  100% { transform: translateY(0); }
`;

export function HelpOverlay({
  helpText,
}: HelpOverlayProps): React.ReactElement {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="도움말 열기"
        css={css`
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background-color: #3182f6;
          color: #ffffff;
          font-size: var(--font-button);
          font-weight: 700;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          position: fixed;
          bottom: calc(env(safe-area-inset-bottom, 0px) + 24px);
          right: 16px;
          z-index: 90;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
          font-family: inherit;
          :active {
            filter: brightness(0.92);
          }
        `}
      >
        ?
      </button>

      {open && (
        <div
          onClick={() => setOpen(false)}
          css={css`
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.45);
            z-index: 9000;
            display: flex;
            align-items: flex-end;
            justify-content: center;
          `}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            css={css`
              width: 100%;
              max-width: 480px;
              background: #ffffff;
              border-radius: 18px 18px 0 0;
              padding: 20px 22px
                calc(env(safe-area-inset-bottom, 0px) + 22px);
              animation: ${slideUp} 240ms ease-out;
              display: flex;
              flex-direction: column;
              gap: 14px;
              max-height: 70dvh;
              overflow-y: auto;
            `}
          >
            <div
              css={css`
                width: 40px;
                height: 4px;
                background: #d1d5da;
                border-radius: 2px;
                margin: 0 auto;
              `}
            />
            <div
              css={css`
                font-size: 18px;
                font-weight: 900;
                color: #191919;
              `}
            >
              도움말
            </div>
            <div
              css={css`
                font-size: var(--font-body);
                line-height: 1.6;
                color: #4e5968;
                white-space: pre-wrap;
              `}
            >
              {helpText}
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              css={css`
                margin-top: 4px;
                padding: 14px;
                background: #3182f6;
                color: #ffffff;
                border: none;
                border-radius: 12px;
                font-size: var(--font-button);
                font-weight: 900;
                cursor: pointer;
                font-family: inherit;
                -webkit-tap-highlight-color: transparent;
                :active {
                  filter: brightness(0.92);
                }
              `}
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </>
  );
}
