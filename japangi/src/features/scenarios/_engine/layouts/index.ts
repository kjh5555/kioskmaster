import { BurgerKingCardInsert } from "./BurgerKingCardInsert";
import { BurgerKingCartAdd } from "./BurgerKingCartAdd";
import { BurgerKingComboPopup } from "./BurgerKingComboPopup";
import { BurgerKingDineMode } from "./BurgerKingDineMode";
import { BurgerKingMembership } from "./BurgerKingMembership";
import { BurgerKingMembershipAccrual } from "./BurgerKingMembershipAccrual";
import { BurgerKingMenu } from "./BurgerKingMenu";
import { BurgerKingOrderConfirm } from "./BurgerKingOrderConfirm";
import { BurgerKingPayMethod } from "./BurgerKingPayMethod";
import { BurgerKingReceiptPopup } from "./BurgerKingReceiptPopup";
import { BurgerKingSideUpsell } from "./BurgerKingSideUpsell";
import { BurgerKingStart } from "./BurgerKingStart";
import { BurgerKingUpsell } from "./BurgerKingUpsell";
import { McdonaldsCategory } from "./McdonaldsCategory";
import { McdonaldsDineMode } from "./McdonaldsDineMode";
import { McdonaldsSetSize } from "./McdonaldsSetSize";
import { McdonaldsSetSingle } from "./McdonaldsSetSingle";
import { McdonaldsDrinkSelect } from "./McdonaldsDrinkSelect";
import { McdonaldsOrderConfirm } from "./McdonaldsOrderConfirm";
import { McdonaldsOrderConfirmSingle } from "./McdonaldsOrderConfirmSingle";
import { McdonaldsSideSelect } from "./McdonaldsSideSelect";
import { McdonaldsStart } from "./McdonaldsStart";
import { McdonaldsUpsell } from "./McdonaldsUpsell";
import { McdonaldsOrderReview } from "./McdonaldsOrderReview";
import { McdonaldsTableService } from "./McdonaldsTableService";
import { McdonaldsPayMethod } from "./McdonaldsPayMethod";
import { McdonaldsPayProcessing } from "./McdonaldsPayProcessing";
import type { CustomLayoutComponent } from "./types";

export const CUSTOM_LAYOUTS: Record<string, CustomLayoutComponent> = {
  "mcdonalds-start": McdonaldsStart,
  "burgerking-start": BurgerKingStart,
  "burgerking-membership": BurgerKingMembership,
  "burgerking-menu": BurgerKingMenu,
  "burgerking-combo-popup": BurgerKingComboPopup,
  "burgerking-upsell": BurgerKingUpsell,
  "burgerking-cart-add": BurgerKingCartAdd,
  "burgerking-side-upsell": BurgerKingSideUpsell,
  "burgerking-dine-mode": BurgerKingDineMode,
  "burgerking-order-confirm": BurgerKingOrderConfirm,
  "burgerking-receipt-popup": BurgerKingReceiptPopup,
  "burgerking-pay-method": BurgerKingPayMethod,
  "burgerking-card-insert": BurgerKingCardInsert,
  "burgerking-membership-accrual": BurgerKingMembershipAccrual,
  "mcdonalds-category": McdonaldsCategory,
  "mcdonalds-dine-mode": McdonaldsDineMode,
  "mcdonalds-set-single": McdonaldsSetSingle,
  "mcdonalds-set-size": McdonaldsSetSize,
  "mcdonalds-side-select": McdonaldsSideSelect,
  "mcdonalds-drink-select": McdonaldsDrinkSelect,
  "mcdonalds-order-confirm": McdonaldsOrderConfirm,
  "mcdonalds-order-confirm-single": McdonaldsOrderConfirmSingle,
  "mcdonalds-upsell": McdonaldsUpsell,
  "mcdonalds-order-review": McdonaldsOrderReview,
  "mcdonalds-table-service": McdonaldsTableService,
  "mcdonalds-pay-method": McdonaldsPayMethod,
  "mcdonalds-pay-processing": McdonaldsPayProcessing,
};

export function getCustomLayout(id: string): CustomLayoutComponent | undefined {
  return CUSTOM_LAYOUTS[id];
}
