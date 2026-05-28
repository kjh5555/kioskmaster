import { css } from "@emotion/react";
import { adaptive } from "@toss/tds-colors";
import { Top } from "@toss/tds-mobile";
import { useState } from "react";
import { useParams } from "react-router-dom";

import { BackButton } from "../../components/BackButton";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import {
  useCategories,
  useCategory,
  useParentFavorites,
} from "../../hooks/useKioskQueries";
import { api, type ApiFavorite } from "../../lib/api";
import { queryClient } from "../../lib/queryClient";

export function GuardianCuratePage(): React.ReactElement {
  const { parentExternalId = "" } = useParams<{ parentExternalId: string }>();
  const { externalId } = useCurrentUser();
  const { data: categories = [] } = useCategories();
  const { data: favorites = [], refetch } = useParentFavorites(parentExternalId);
  const [busy, setBusy] = useState<string | null>(null);

  function isFavorite(brand: string, list: ApiFavorite[]): ApiFavorite | undefined {
    return list.find((f) => f.brand_slug === brand);
  }

  async function toggleFavorite(
    categorySlug: string,
    brand: { slug: string; name: string },
  ) {
    const existing = isFavorite(brand.slug, favorites);
    setBusy(brand.slug);
    try {
      if (existing) {
        await api.deleteFavorite(existing.id, externalId);
      } else {
        await api.setFavorite({
          child_external_id: externalId,
          parent_external_id: parentExternalId,
          brand_slug: brand.slug,
          category_slug: categorySlug,
          priority: favorites.length, // append to end
        });
      }
      await queryClient.invalidateQueries({
        queryKey: ["parent-favorites", parentExternalId],
      });
      await refetch();
    } catch (e) {
      console.error(e);
    } finally {
      setBusy(null);
    }
  }

  async function setPrimary(fav: ApiFavorite) {
    setBusy(fav.brand_slug);
    try {
      // Move chosen favorite to priority 0; bump others down.
      const reordered = [fav, ...favorites.filter((f) => f.id !== fav.id)];
      for (let i = 0; i < reordered.length; i += 1) {
        const f = reordered[i];
        await api.setFavorite({
          child_external_id: externalId,
          parent_external_id: parentExternalId,
          brand_slug: f.brand_slug,
          category_slug: f.category_slug,
          priority: i,
          note: f.note,
        });
      }
      await queryClient.invalidateQueries({
        queryKey: ["parent-favorites", parentExternalId],
      });
      await refetch();
    } finally {
      setBusy(null);
    }
  }

  return (
    <div
      css={css`
        height: 100dvh;
        max-height: 100dvh;
        padding-top: env(safe-area-inset-top, 0px);
        padding-bottom: calc(env(safe-area-inset-bottom, 0px) + 16px);
        display: flex;
        flex-direction: column;
        background: ${adaptive.background};
        overflow: hidden;
      `}
    >
      <div css={css`padding: 0 4px;`}>
        <BackButton to={`/guardian/parent/${parentExternalId}`} />
      </div>

      <Top
        upperGap={0}
        title={<Top.TitleParagraph>부모님 즐겨찾기</Top.TitleParagraph>}
        subtitleBottom={
          <Top.SubtitleParagraph
            css={css`color: ${adaptive.grey700};`}
          >
            부모님 홈 화면에 우선으로 보일 키오스크를 골라주세요.
          </Top.SubtitleParagraph>
        }
      />

      <div
        css={css`
          flex: 1;
          min-height: 0;
          padding: 0 clamp(16px, 4vw, 20px);
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 12px;
        `}
      >
        {favorites.length > 0 && (
          <div
            css={css`
              padding: 12px 14px;
              background: #fff9db;
              border: 1.5px solid #ffd43b;
              border-radius: 12px;
              font-size: 13px;
              font-weight: 700;
              color: #5e4500;
              line-height: 1.4;
            `}
          >
            ⭐ 별표를 눌러 1순위로 지정하면 부모님 홈에 가장 크게 보여요.
          </div>
        )}

        {categories.map((cat) => (
          <div
            key={cat.slug}
            css={css`
              display: flex;
              flex-direction: column;
              gap: 6px;
            `}
          >
            <div
              css={css`
                padding: 8px 4px 4px;
                font-size: 13px;
                font-weight: 900;
                color: ${adaptive.grey700};
              `}
            >
              {cat.emoji} {cat.title}
            </div>
            {/* We need brand list per category. Categories endpoint returns
                brand_count but not brand list — use category detail. */}
            <CategoryBrands
              categorySlug={cat.slug}
              parentExternalId={parentExternalId}
              favorites={favorites}
              busy={busy}
              onToggle={(brand) => toggleFavorite(cat.slug, brand)}
              onPrimary={setPrimary}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function CategoryBrands({
  categorySlug,
  favorites,
  busy,
  onToggle,
  onPrimary,
}: {
  categorySlug: string;
  parentExternalId: string;
  favorites: ApiFavorite[];
  busy: string | null;
  onToggle: (brand: { slug: string; name: string }) => void;
  onPrimary: (fav: ApiFavorite) => void;
}) {
  const { data: detail } = useCategory(categorySlug);
  if (!detail) return null;
  return (
    <>
      {detail.brands.map((b) => {
        const fav = favorites.find((f) => f.brand_slug === b.slug);
        const isPrimary = fav && fav.priority === 0;
        return (
          <div
            key={b.slug}
            css={css`
              display: flex;
              align-items: center;
              gap: 12px;
              padding: 10px 12px;
              background: #ffffff;
              border: 1.5px solid
                ${fav ? adaptive.blue200 : adaptive.grey200};
              border-radius: 12px;
            `}
          >
            <span style={{ fontSize: 28 }}>{b.emoji}</span>
            <span
              css={css`
                flex: 1;
                font-size: var(--font-body);
                font-weight: 800;
                color: ${adaptive.grey900};
              `}
            >
              {b.name}
            </span>
            {fav && (
              <button
                type="button"
                disabled={busy === b.slug}
                onClick={() => onPrimary(fav)}
                aria-label="1순위로 지정"
                css={iconBtn(isPrimary)}
              >
                ⭐
              </button>
            )}
            <button
              type="button"
              disabled={busy === b.slug}
              onClick={() => onToggle({ slug: b.slug, name: b.name })}
              css={css`
                padding: 6px 12px;
                border-radius: 999px;
                font-size: 12px;
                font-weight: 800;
                font-family: inherit;
                cursor: pointer;
                border: 1.5px solid
                  ${fav ? "#e4002b" : adaptive.blue500};
                background: ${fav ? "#ffffff" : adaptive.blue500};
                color: ${fav ? "#e4002b" : "#ffffff"};
                opacity: ${busy === b.slug ? 0.5 : 1};
                -webkit-tap-highlight-color: transparent;
                :active {
                  filter: brightness(0.92);
                }
              `}
            >
              {fav ? "제거" : "추가"}
            </button>
          </div>
        );
      })}
    </>
  );
}

function iconBtn(active: boolean | undefined) {
  return css`
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 1.5px solid ${active ? "#ffd43b" : adaptive.grey300};
    background: ${active ? "#fff9db" : "#ffffff"};
    font-size: 16px;
    cursor: pointer;
    font-family: inherit;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    filter: ${active ? "none" : "grayscale(1) opacity(0.5)"};
    -webkit-tap-highlight-color: transparent;
    :active {
      transform: scale(0.95);
    }
  `;
}
