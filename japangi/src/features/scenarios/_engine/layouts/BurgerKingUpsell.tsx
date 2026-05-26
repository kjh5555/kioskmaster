import { css, keyframes } from "@emotion/react";

import { idlePulse, type CustomLayoutProps } from "./types";

const shakeKf = keyframes`
  0%   { transform: translateX(0); }
  20%  { transform: translateX(-8px); }
  40%  { transform: translateX(8px); }
  60%  { transform: translateX(-5px); }
  80%  { transform: translateX(5px); }
  100% { transform: translateX(0); }
`;

function shakeWhen(rejected: string | null, id: string) {
  return (
    rejected === id &&
    css`
      animation: ${shakeKf} 350ms ease;
    `
  );
}

const WHOPPER_SET_IMG =
  "https://mob-prd.burgerking.co.kr/images/menu/web/main/2025/01/06/ff0da2b6-ec36-4f37-ad92-c39eeb0eeec3.png";

export function BurgerKingUpsell({
  step,
  rejectedChoiceId,
  idleHintActive,
  onChoice,
}: CustomLayoutProps): React.ReactElement {
  return (
    <div
      css={css`
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0, 0, 0, 0.35);
        padding: 16px;
        min-height: calc(100dvh - 80px);
      `}
    >
      <div
        css={css`
          background: #ffffff;
          border-radius: 18px;
          width: 100%;
          max-width: 420px;
          padding: 28px 22px 22px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 18px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
        `}
      >
        {/* Title */}
        <div
          css={css`
            text-align: center;
            font-size: 19px;
            font-weight: 800;
            color: #2a1408;
            line-height: 1.5;
          `}
        >
          2,000원만 추가하면
          <br />
          더 풍성하게 세트로
          <br />
          즐기실 수 있어요!
          <br />
          업그레이드 하시겠습니까?
        </div>

        {/* Set image */}
        <img
          src={WHOPPER_SET_IMG}
          alt="와퍼 세트"
          style={{
            width: 200,
            height: 160,
            objectFit: "contain",
            marginTop: 4,
          }}
        />

        {/* Caption */}
        <div
          css={css`
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 4px;
          `}
        >
          <span
            css={css`
              font-size: 18px;
              font-weight: 800;
              color: #2a1408;
            `}
          >
            와퍼 세트
          </span>
          <span
            css={css`
              font-size: 13px;
              color: #8b95a1;
            `}
          >
            와퍼+프렌치프라이(R)+콜라(R)
          </span>
        </div>

        {/* Bottom action row */}
        <div
          css={css`
            display: grid;
            grid-template-columns: minmax(0, 1fr) minmax(0, 1.4fr);
            gap: 12px;
            width: 100%;
            margin-top: 6px;
          `}
        >
          <button
            type="button"
            onClick={() => onChoice("cancel-keep-single")}
            css={[
              css`
                height: 56px;
                background: #4a2412;
                color: #ffffff;
                border: none;
                border-radius: 999px;
                font-size: 16px;
                font-weight: 800;
                cursor: pointer;
                &:active {
                  background: #2a1408;
                }
              `,
              shakeWhen(rejectedChoiceId, "cancel-keep-single"),
              idlePulse(
                idleHintActive,
                step.correctChoiceId === "cancel-keep-single",
              ),
            ]}
          >
            취소
          </button>
          <button
            type="button"
            onClick={() => onChoice("upgrade-to-set")}
            css={[
              css`
                height: 56px;
                background: #d62300;
                color: #ffffff;
                border: none;
                border-radius: 999px;
                font-size: 16px;
                font-weight: 800;
                cursor: pointer;
                &:active {
                  background: #a91a00;
                }
              `,
              shakeWhen(rejectedChoiceId, "upgrade-to-set"),
              idlePulse(idleHintActive, step.correctChoiceId === "upgrade-to-set"),
            ]}
          >
            업그레이드 하기
          </button>
        </div>
      </div>
    </div>
  );
}
