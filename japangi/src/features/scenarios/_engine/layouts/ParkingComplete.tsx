import { css, keyframes } from "@emotion/react";
import { useEffect } from "react";

import { type CustomLayoutProps } from "./types";

const gateOpen = keyframes`
  0%   { transform: rotate(0deg); }
  100% { transform: rotate(-75deg); }
`;
const carPass = keyframes`
  0%   { transform: translateX(-110%); opacity: 0; }
  20%  { opacity: 1; }
  100% { transform: translateX(120%); opacity: 1; }
`;

const PLATE = "12가 3456";

// 주차 등록 완료 — 출차 시 게이트 자동 오픈 안내.
// mount 후 3.5초 자동으로 시나리오 종료.
export function ParkingComplete({
  step,
  onChoice,
}: CustomLayoutProps): React.ReactElement {
  const done = step.choices.find((c) => c.id === "done") ?? step.choices[0]!;

  useEffect(() => {
    const t = setTimeout(() => onChoice(done.id), 3500);
    return () => clearTimeout(t);
  }, [done.id, onChoice]);

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
        background: #ffffff;
        font-family: system-ui, -apple-system, sans-serif;
        overflow: hidden;
        padding: 22px 20px;
      `}
    >
      {/* 상단 안내 */}
      <div
        css={css`
          text-align: center;
          padding: 14px 0 16px;
          font-size: 17px;
          font-weight: 800;
          color: #1a1a1a;
          line-height: 1.6;
        `}
      >
        <span style={{ color: "#0f7b3a" }}>주차 등록</span>이 완료
        됐습니다.
        <br />
        이용해 주셔서 감사합니다.
      </div>

      {/* 차량번호 + 게이트 시각 */}
      <div
        css={css`
          background: #f4f6f9;
          border-radius: 14px;
          padding: 16px 14px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          box-shadow: inset 0 0 0 1px #e4e4e4;
        `}
      >
        {/* 차량 번호판 */}
        <div
          css={css`
            padding: 8px 16px;
            background: #ffffff;
            border: 3px solid #1a1a1a;
            border-radius: 10px;
            font-size: 22px;
            font-weight: 900;
            color: #1a1a1a;
            letter-spacing: 0.06em;
            font-variant-numeric: tabular-nums;
          `}
        >
          {PLATE}
        </div>

        {/* 게이트 + 자동차 그림 */}
        <div
          css={css`
            position: relative;
            width: 100%;
            height: 90px;
            background: linear-gradient(180deg, #d1dee9 0%, #e8edf2 100%);
            border-radius: 10px;
            overflow: hidden;
          `}
        >
          {/* 차선 */}
          <div
            css={css`
              position: absolute;
              top: 64px;
              left: 0;
              right: 0;
              height: 4px;
              background: repeating-linear-gradient(
                90deg,
                #ffffff 0,
                #ffffff 14px,
                transparent 14px,
                transparent 28px
              );
              opacity: 0.7;
            `}
          />
          {/* 게이트 폴 (왼쪽 기둥) */}
          <div
            css={css`
              position: absolute;
              top: 20px;
              left: 22%;
              width: 8px;
              height: 50px;
              background: #5a7a92;
              border-radius: 2px;
            `}
          />
          {/* 게이트 바 (열림 애니메이션) */}
          <div
            css={css`
              position: absolute;
              top: 22px;
              left: calc(22% + 4px);
              width: 68px;
              height: 6px;
              background: repeating-linear-gradient(
                90deg,
                #d62300 0,
                #d62300 10px,
                #ffffff 10px,
                #ffffff 20px
              );
              border-radius: 3px;
              transform-origin: left center;
              animation: ${gateOpen} 1200ms ease-out 200ms forwards;
            `}
          />
          {/* 자동차 (왼쪽→오른쪽 지나감) */}
          <div
            css={css`
              position: absolute;
              top: 38px;
              left: 0;
              animation: ${carPass} 2600ms ease-in-out 1100ms forwards;
            `}
          >
            <div
              css={css`
                position: relative;
                width: 70px;
                height: 32px;
              `}
            >
              {/* 차체 */}
              <div
                css={css`
                  position: absolute;
                  bottom: 0;
                  left: 0;
                  width: 70px;
                  height: 18px;
                  background: linear-gradient(
                    180deg,
                    #4ea8d9 0%,
                    #2a6fa6 100%
                  );
                  border-radius: 4px 4px 6px 6px;
                  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
                `}
              />
              {/* 윗부분 (창문) */}
              <div
                css={css`
                  position: absolute;
                  bottom: 14px;
                  left: 12px;
                  width: 42px;
                  height: 14px;
                  background: linear-gradient(
                    180deg,
                    #1a3d5c 0%,
                    #2a6fa6 100%
                  );
                  border-radius: 6px 6px 2px 2px;
                `}
              />
              {/* 바퀴 */}
              <div
                css={css`
                  position: absolute;
                  bottom: -3px;
                  left: 10px;
                  width: 10px;
                  height: 10px;
                  background: #1a1a1a;
                  border-radius: 50%;
                `}
              />
              <div
                css={css`
                  position: absolute;
                  bottom: -3px;
                  right: 10px;
                  width: 10px;
                  height: 10px;
                  background: #1a1a1a;
                  border-radius: 50%;
                `}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 하단 안내 */}
      <div
        css={css`
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 4px;
          padding: 18px 8px;
        `}
      >
        <div
          css={css`
            font-size: 15px;
            font-weight: 800;
            color: #1a1a1a;
            text-align: center;
            line-height: 1.5;
          `}
        >
          🚙 출차 시 게이트가 자동으로 열립니다
        </div>
        <div
          css={css`
            font-size: 12px;
            color: #5a7a92;
            text-align: center;
            margin-top: 2px;
          `}
        >
          진료 환자 할인이 적용되었어요
        </div>
        <div
          css={css`
            font-size: 11px;
            color: #5a7a92;
            text-align: center;
            margin-top: 8px;
          `}
        >
          잠시 후 처음 화면으로 돌아갑니다
        </div>
      </div>
    </div>
  );
}
